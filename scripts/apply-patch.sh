#!/usr/bin/env bash
# apply-patch.sh — apply the patch dropped in the repo root, whatever it got named.
#
# The GitHub web UI mangles uploaded filenames (dots and hyphens are stripped
# inconsistently), so a hard-coded `git apply <name>` fails about half the time
# and the build silently stays on the previous revision. This globs instead,
# refuses to guess when it is ambiguous, and always leaves the tree clean.
set -euo pipefail

mapfile -t patches < <(ls -1 ./*.patch 2>/dev/null || true)
if [ ${#patches[@]} -eq 0 ]; then echo "No .patch file in repo root."; exit 1; fi

# Duplicate uploads are byte-identical; pick one and report if they differ.
if [ ${#patches[@]} -gt 1 ]; then
  sums=$(sha256sum "${patches[@]}" | awk '{print $1}' | sort -u | wc -l)
  if [ "$sums" -ne 1 ]; then
    printf 'Multiple DIFFERENT patches present:\n'; printf '  %s\n' "${patches[@]}"
    echo "Delete the ones you don't want, then re-run."; exit 1
  fi
fi
patch="${patches[0]}"
echo "Applying: $patch"

git apply --check --binary "$patch"
git apply --binary "$patch"

tracked=$(git ls-files '*.patch' || true)
[ -n "$tracked" ] && git rm --cached -q $tracked
rm -f ./*.patch

echo "Applied and cleaned. Now run: npx tsc --noEmit && npm run build"

#!/usr/bin/env bash
set -uo pipefail
BASE="${1:-http://localhost:3099}"
fail=0
ok() { printf "  \033[32mPASS\033[0m %s\n" "$1"; }
bad() { printf "  \033[31mFAIL\033[0m %s\n" "$1"; fail=1; }
for p in / /about /books /cluster /contact /imprint /privacy /topics; do
  c=$(curl -sSL -o /dev/null -w "%{http_code}" "$BASE$p")
  [ "$c" = 200 ] && ok "200 $p (resolved)" || bad "$c $p"
done
[ "$fail" -eq 0 ] && echo "✓ ALL CONTRACTS HELD" || echo "✗ FAILURES"
exit "$fail"

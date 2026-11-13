import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const assets = [
  'public/images/personal/01-personal-engineering-workspace.jpg',
  'public/images/personal/02-podcast-recording-setup.jpg',
  'public/images/personal/03-ecowoods-hardwood-craftsmanship.jpg',
  'public/images/personal/04-broader-engineering-ambitions.jpg',
  'public/images/personal/05-writing-explainers.jpg',
  'public/images/personal/06-plastilonas-side-engineering.jpg',
  'public/images/personal/07-toronto-frankfurt-dual-life.jpg',
  'public/images/personal/08-selected-projects.jpg',
  'public/images/personal/09-human-aspirations-engineer.jpg',
  'public/images/personal/10-contact-connection.jpg',
];

const startOfFrame = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
  0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function dimensions(buffer, file) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error(file + ': invalid JPEG signature');
  }

  let offset = 2;
  while (offset < buffer.length - 4) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) break;
    if (
      marker === 0xd8 || marker === 0x01 ||
      (marker >= 0xd0 && marker <= 0xd7)
    ) continue;

    const segmentLength = buffer.readUInt16BE(offset);
    if (startOfFrame.has(marker)) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3),
      };
    }
    offset += segmentLength;
  }

  throw new Error(file + ': JPEG dimensions not found');
}

for (const asset of assets) {
  const path = resolve(process.cwd(), asset);
  const size = statSync(path).size;
  if (size < 20_000) throw new Error(asset + ': image is unexpectedly small');

  const { width, height } = dimensions(readFileSync(path), asset);
  const ratio = width / height;
  if (width < 1100 || height < 750 || ratio < 1.4 || ratio > 1.6) {
    throw new Error(
      asset + ': expected a landscape source of at least 1100x750; got ' +
      width + 'x' + height
    );
  }

  console.log('OK ' + asset + ' — ' + width + 'x' + height);
}

console.log('Verified ' + assets.length + ' personal visual assets.');

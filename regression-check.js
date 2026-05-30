const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

function getFunctionBody(name) {
  const marker = `function ${name}(`;
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`${name} not found`);
  const bodyStart = html.indexOf('{', start);
  let depth = 0;
  for (let i = bodyStart; i < html.length; i += 1) {
    if (html[i] === '{') depth += 1;
    if (html[i] === '}') depth -= 1;
    if (depth === 0) return html.slice(bodyStart + 1, i);
  }
  throw new Error(`${name} body not closed`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const showAllPlaces = getFunctionBody('showAllPlaces');

assert(
  !/selectedDistrict\s*=/.test(showAllPlaces),
  'showAllPlaces must keep the selected district filter.'
);
assert(
  !/selectedDong\s*=/.test(showAllPlaces),
  'showAllPlaces must keep the selected dong filter.'
);
assert(
  /applyCurrentFilters\(\)/.test(showAllPlaces),
  'showAllPlaces must return to the current filtered marker set.'
);
assert(
  readme.includes('선택한 선거구/동은 유지'),
  'README must document that 전체 보기 keeps district/dong filters.'
);

console.log('regression checks ok');

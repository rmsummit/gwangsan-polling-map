const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

function getFunctionBody(name) {
  const marker = `function ${name}(`;
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`${name} not found`);
  const signatureEnd = html.indexOf(') {', start);
  const bodyStart = signatureEnd === -1 ? html.indexOf('{', start) : signatureEnd + 2;
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
const openPlace = getFunctionBody('openPlace');
const showHoverLabel = getFunctionBody('showHoverLabel');
const setActiveItem = getFunctionBody('setActiveItem');
const refreshPollingMarkerIcons = getFunctionBody('refreshPollingMarkerIcons');
const refreshCircleStyles = getFunctionBody('refreshCircleStyles');
const getPollingPlaceStampIcon = getFunctionBody('getPollingPlaceStampIcon');
const getCircleStyle = getFunctionBody('getCircleStyle');
const getPlaceDisplayName = getFunctionBody('getPlaceDisplayName');

assert(
  /selectedFilterContext/.test(openPlace),
  'openPlace must remember the active district/dong context before showing one place.'
);
assert(
  /selectedDistrict\s*=\s*selectedFilterContext\.district/.test(showAllPlaces),
  'showAllPlaces must restore the district filter that opened the selected place.'
);
assert(
  /selectedDong\s*=\s*selectedFilterContext\.dong/.test(showAllPlaces),
  'showAllPlaces must restore the dong filter that opened the selected place.'
);
assert(
  /applyCurrentFilters\(\)/.test(showAllPlaces),
  'showAllPlaces must return to the current filtered marker set.'
);
assert(
  /previousSelectedIndex/.test(showAllPlaces) && /직전 확인/.test(showAllPlaces),
  'showAllPlaces must keep the last selected polling place visible in the toolbar.'
);
assert(
  /refreshPollingMarkerIcons\(\)/.test(setActiveItem) && /refreshCircleStyles\(\)/.test(setActiveItem),
  'Changing the active place must refresh map marker and circle emphasis.'
);
assert(
  /getPollingPlaceStampIcon\(idx === selectedIndex\)/.test(refreshPollingMarkerIcons),
  'The previously selected marker must use a highlighted icon.'
);
assert(
  /getCircleStyle\(idx === selectedIndex\)/.test(refreshCircleStyles),
  'The previously selected circle must use highlighted circle styling.'
);
assert(
  /border:3px solid #facc15/.test(getPollingPlaceStampIcon),
  'Highlighted marker icon must include a visible yellow ring.'
);
assert(
  /extraWeight/.test(getCircleStyle) && /highlight \? 120 : 80/.test(getCircleStyle),
  'Highlighted 100m circle must be visually stronger than normal circles.'
);
assert(
  /isMobileLayout\(\)/.test(showHoverLabel) && /hoverInfo\.open/.test(showHoverLabel),
  'Hover labels must open on desktop only.'
);
assert(
  html.includes("marker, 'mouseover'") && html.includes("marker, 'mouseout'"),
  'Polling place markers must wire desktop hover label events.'
);
assert(
  html.includes('@media(orientation:landscape) and (pointer:coarse)') && html.includes('#layout{display:block;height:100%}'),
  'Mobile landscape mode must keep the map full-screen and overlay the menu.'
);
assert(
  html.includes('(orientation: landscape) and (pointer: coarse) and (max-width: 1000px)'),
  'Mobile JS layout detection must include phone landscape orientation.'
);
assert(
  readme.includes('선택한 선거구/동은 유지'),
  'README must document that 전체 보기 keeps district/dong filters.'
);
assert(
  /제\$1투표소/.test(getPlaceDisplayName),
  'getPlaceDisplayName must expand 제n투 to 제n투표소.'
);
assert(
  html.includes('getPlaceDisplayName(p)'),
  'Displayed polling place names must use getPlaceDisplayName.'
);
assert(
  html.includes('const coordinateOverrides ='),
  'Coordinate override table must exist for precise marker corrections.'
);
assert(
  html.includes('function getPlacePosition(p)'),
  'Map operations must resolve marker coordinates through getPlacePosition.'
);

console.log('regression checks ok');

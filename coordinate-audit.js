const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const places = JSON.parse(html.match(/const places = (\[[\s\S]*?\]);\nconst coordinateOverrides/)[1]);

function riskLevel(place) {
  if (/초등학교|중학교|고등학교|학교/.test(place.building)) return 'school';
  if (/아파트|체육관|수련관|센터|행정복지센터|휴먼시아|부영|라인|두산|호반|중흥|주공/.test(place.building)) {
    return 'large-site';
  }
  return 'lower';
}

function csv(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

const rows = [
  ['no', 'risk', 'name', 'building', 'address', 'lat', 'lon', 'naver_url', 'review_note'],
  ...places.map((place, index) => [
    index + 1,
    riskLevel(place),
    place.name,
    place.building,
    place.address,
    place.lat,
    place.lon,
    place.url,
    ''
  ])
];

fs.writeFileSync('coordinate-audit.csv', rows.map(row => row.map(csv).join(',')).join('\n'));
console.log('coordinate-audit.csv written');

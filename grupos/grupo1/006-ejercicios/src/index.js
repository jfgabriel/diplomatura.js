const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
  { name: 'Mt. Aconcagua', height: 6962, place: 'Argentina' },
];

function createRow(row, pos) {
  const tag = pos === 0 ? 'th' : 'td';
  return Object.values(row).reduce(
    (column, element) => (column += `<${tag}>${element}</${tag}>`),
    ''
  );
}

function selectLang(lang) {
  switch (lang) {
    case 'es':
      return { name: 'Nombre', height: 'Altura', place: 'Lugar' };
    case 'jp':
      return { name: '名前', height: '高さ', place: '場所' };
    default:
      return { name: 'Name', height: 'Height', place: 'Place' };
  }
}

function createMountainsTable(e) {
  const info = [selectLang(e.target.id), ...MOUNTAINS];
  const processedData = info.reduce(
    (rows, mountain, pos) => (rows += `<tr>${createRow(mountain, pos)}</tr>`),
    ''
  );
  document.getElementById(
    'tabla'
  ).innerHTML = `<table border=1>${processedData}</table>`;
}

function appConstructor() {
  return `<button id="en">Generate now!</button><button id="es">¡Generar Ahora!</button><button id="jp">作成！</button>`;
}

const appBody = appConstructor();

document.getElementById('app').innerHTML = appBody;
Array.from(document.querySelectorAll('button')).forEach((button) =>
  button.addEventListener('click', createMountainsTable)
);

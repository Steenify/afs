const jsonUnion = require('json-union').default;

jsonUnion('./public/locales/en/*.json', {
  deepMerge: true,
  outfile: './public/locales/en.json',
})
  .then((json) => console.log(json))
  .catch((error) => console.error(error));

jsonUnion('./public/locales/vi/*.json', {
  deepMerge: true,
  outfile: './public/locales/vi.json',
})
  .then((json) => console.log(json))
  .catch((error) => console.error(error));

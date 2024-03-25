export const parsePropNames = (data: any) => {
  const strData = JSON.stringify(data)
    .replaceAll('nameUK', 'name')
    .replaceAll('nameEN', 'name')
    .replaceAll('nameRU', 'name');
  const parsedData = JSON.parse(strData);

  return parsedData;
};

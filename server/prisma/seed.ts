import csv from 'csv-parser';
import fs from 'fs';
import { addCensus } from '../src/controllers/census.controller';
import { addDocuments } from '../src/controllers/documents.controller';
import { addLanguageGroups } from '../src/controllers/language-groups.controller';
import { addLanguages } from '../src/controllers/languages.controller';
import { addRegions } from '../src/controllers/regions.controller';

const convertValues = ({ header, index, value }) =>
  [
    'id',
    'languageGroupId',
    'documentId',
    'parentId',
    'languageId',
    'regionId',
    'males',
    'females',
  ].includes(header)
    ? Number(value)
    : value;

const csvOptions = {
  separator: ';',
  mapValues: convertValues,
};

const loadDataFromFile = async (fileName: string) => {
  const readable = fs.createReadStream(`prisma/data/${fileName}`, 'utf8').pipe(csv(csvOptions));

  let data: any = [];
  for await (const chunk of readable) {
    data.push(chunk);
  }
  return data;
};

async function loadDataToDB() {
  console.log('Start seeding...');

  const documents = await loadDataFromFile('documents.csv');
  // console.log(documents);
  await addDocuments(documents);

  const regions = await loadDataFromFile('region.csv');
  // console.log(regions);
  await addRegions(regions);

  const languageGroups = await loadDataFromFile('language_group.csv');
  // console.log(languageGroups);
  await addLanguageGroups(languageGroups);

  const languages = await loadDataFromFile('language.csv');
  // console.log(languages);
  await addLanguages(languages);

  const census = await loadDataFromFile('census.csv');
  // console.log(census);
  await addCensus(census);

  console.log('Finished seeding...');
}

loadDataToDB().catch(console.error);

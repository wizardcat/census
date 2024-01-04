import { flatten } from 'flat';

export const getPropertyChains = (obj: any, parentKey = ''): string[] => {
  const targetObject = parentKey ? obj[parentKey] : obj;
  const props = Object.keys(flatten(targetObject)).map((key) => `${parentKey}.${key}`);

  return props;
};

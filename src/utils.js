export const upperFirst = (string) => {
  return typeof string === 'string' && string.length > 0
    ? string[0].toUpperCase() + string.slice(1)
    : string || '';
};
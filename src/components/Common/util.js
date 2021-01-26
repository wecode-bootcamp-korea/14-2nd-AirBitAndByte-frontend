import _ from 'lodash';

export const toQueryStr = (query) => {
  let setQuery = '';

  Object.keys(query).forEach((key) => {
    if (typeof query[key] === 'object') {
      query[key].forEach((filter) => {
        setQuery && (setQuery += '&');
        setQuery += `${_.snakeCase(key)}=${filter}`;
      });
    } else {
      setQuery && (setQuery += '&');
      setQuery += `${_.snakeCase(key)}=${query[key]}`;
    }
  });

  return setQuery;
};

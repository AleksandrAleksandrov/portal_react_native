export const createQuery = (params) => {
  let query = '';
  params.forEach((objectKey, index) => {
    query += 'type=' + params[index] + '&';
  });
  return query;
};

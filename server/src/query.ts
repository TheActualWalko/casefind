import {isArray} from 'lodash';

export const many = (queryText, parameters, transform = (x) => x) => (db, debug=false) => {
  if (debug) {
    console.log(queryText, parameters);
  }
  return new Promise((resolve, reject) => {
    db.query(queryText, parameters, (err, result, fields)=>{
      if (debug) {
        console.log(err, result, fields);
      }
      if (err) {
        reject(err);
      } else {
        if (isArray(result)) {
          resolve(result.map((x) => transform(x)));
        } else {
          // non-array results seem to usually be messages from mysql
          resolve(result);
        }
      }
    })
  });
};

export const one = (queryText, parameters, transform = (x) => x) => (db, debug=false) => {
  return many(queryText, parameters, transform)(db, debug).then(results => results[0]);
};

export const chain = (...queries) => (db, debug=false) => {
  if (queries.length > 0) {
    return queries[0](db, debug)
      .then(() => chain.apply(null, queries.slice(1))(db, debug))
  } else {
    return Promise.resolve();
  }
}
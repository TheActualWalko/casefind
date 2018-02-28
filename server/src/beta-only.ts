import { getBetaUser } from './queries';

export default (code, db) => new Promise((resolve, reject) => {
  if (!code) {
    reject();
  } else {
    getBetaUser(code)(db)
      .then((results) => {
        if (results.length > 0) {
          resolve();
        } else {
          reject();
        }
      })
      .catch((e) => {
        console.error(e);
        reject();
      });
  }
});
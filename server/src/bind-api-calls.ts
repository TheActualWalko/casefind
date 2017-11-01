import * as iplocation from 'iplocation';

import * as queries from './queries';


const sendJSON = (res) => (result) => res.send('<!DOCTYPE html><html><head></head><body><pre>'+JSON.stringify(result, null, 2)+'</pre></body></html>');
const sendError = (res) => (error) => res.status(500).send(error);

export default (IS_DEV, app, db) => {
  
  app.get('/api/search/:query', (req, res) => {
    queries.search(req.params.query)(db)
      .then(sendJSON(res));
  });

  // app.get('/subject/:subjectID/students', (req, res)=>{
  //   queries
  //     .getStudentsForSubject(req.clientDomain, req.params.subjectID)(db)
  //     .then(sendJSON(res));
  // });

  app.post('/track', (req, res)=>{
    const {action, data} = req.body;
    iplocation(req.ip, (err, ipLocationResponse) => {
      if (err) {
        throw err;
      } else {
        const {latitude, longitude} = ipLocationResponse;
        queries
          .track(IS_DEV, req.ip, latitude, longitude, action, data)(db)
          .then(() => res.send('success'));
      }
    });
  });
}
import * as iplocation from 'iplocation';

import * as queries from './queries';


const sendJSON = (res) => (result) => res.json(result);
const sendError = (res) => (error) => res.status(500).send(error);

export default (IS_DEV, app, db) => {
  
  app.get('/api/search/:query', (req, res) => {
    queries.search(req.params.query)(db)
      .then(sendJSON(res));
  });

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
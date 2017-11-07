import * as iplocation from 'iplocation';

import * as queries from './queries';


const sendJSON = (res) => (result) => res.json(result);
const sendError = (res) => (error) => res.status(500).send(error);

export default (IS_DEV, app, db) => {
  app.get('/api/search/:query', (req, res) => {
    queries.search(req.params.query, JSON.parse(req.query.types))(db)
      .then((result) => {
        const casesById = {};
        result.forEach((r) => {
          if (!casesById[r.caseId]) {
            casesById[r.caseId] = {
              id: r.caseId,
              name: r.name,
              year: r.year,
              notes: []
            }
          }
          casesById[r.caseId].notes.push({
            type: r.type,
            content: r.content
          });
        });
        return Object
          .keys(casesById).map(id => casesById[id])
          .sort((a, b) => {
            if (a.name.toLowerCase().indexOf(req.params.query.toLowerCase()) === 0) { return -1 };
            if (b.name.toLowerCase().indexOf(req.params.query.toLowerCase()) === 0) { return 1 };
            return b.year - a.year;
          });
      })
      .then(sendJSON(res))
      .catch((e) => console.error(e))
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
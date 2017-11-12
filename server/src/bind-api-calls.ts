import * as iplocation from 'iplocation';

import * as queries from './queries';


const sendJSON = (res) => (result) => res.json(result);
const sendError = (res) => (error) => res.status(500).send(error);
const groupNotesByCase = (queryResult, preview = false) => {
  const casesById = {};
  const contentKey = preview ? 'preview' : 'content';
  queryResult.forEach((r) => {
    if (!casesById[r.caseId]) {
      casesById[r.caseId] = {
        id: r.caseId,
        name: r.name,
        year: r.year,
        notes: []
      }
    }
    casesById[r.caseId].notes.push({
      id: r.id,
      type: r.type,
      [contentKey]: r[contentKey],
    });
  });
  return Object.keys(casesById).map(id => casesById[id]);
}

export default (IS_DEV, app, db) => {
  app.get('/api/search/:query', (req, res) => {
    queries.search(req.params.query, JSON.parse(req.query.types))(db)
      .then((results) => groupNotesByCase(results, true))
      .then((cases) => cases.sort((a, b) => {
        if (a.name.toLowerCase().indexOf(req.params.query.toLowerCase()) === 0) { return -1 };
        if (b.name.toLowerCase().indexOf(req.params.query.toLowerCase()) === 0) { return 1 };
        return b.year - a.year;
      }))
      .then(sendJSON(res))
      .catch((e) => console.error(e))
  });

  app.get('/api/case/:id', (req, res) => {
    queries.getCase(req.params.id)(db)
      .then(groupNotesByCase)
      .then(c => c[0])
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
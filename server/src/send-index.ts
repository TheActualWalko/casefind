import * as fs from 'fs';
import * as path from 'path';
import * as reactDomServer from 'react-dom/server';
import * as React from 'react';
import app from '../../public/src/root';
import createMemoryHistory from 'history/createMemoryHistory';

export default (IS_DEV, db) => (req, res) => {
  Promise.all([
    Promise.resolve('Request for initial data goes here!')
  ]).then((results: [any]) => {
    const statics = {
      placeholder: results[0],
    };

    const appRender = reactDomServer.renderToString(
      React.createElement(
        app, 
        {
          statics, 
          history: createMemoryHistory({
            initialEntries: [req.route.path]
          })
        }
      )
    );

    res.send(
`<!DOCTYPE html>
<html lang='en-UK'>
  <head>
    <title>Casefind</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id="react-container">${appRender}</div>
    <div class="background"></div>
    <script>
      const statics = ${JSON.stringify(statics)};
    </script>
    <script src="dist/vendor.bundle.js"></script>
    <script src="dist/bundle.js"></script>
  </body>
</html>`
    );
  });
};
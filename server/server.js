const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const eventDetailsData = require('../server/data/eventDetails/json');

server.get('/.netlify/functions/get_events/', (req, res, next) => {
  res.status(200).send(eventDetailsData.getEventDetails);
});

server.listen(3000, () => {
  console.log('JSON Server listening on port 3000.');
});

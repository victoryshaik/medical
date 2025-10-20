const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const patientsRouter = require('./routes/patients');
const testsRouter = require('./routes/tests');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/patients', patientsRouter);
app.use('/tests', testsRouter);

app.get('/', (req, res) => res.json({status: 'ok', service: 'medlab-sample'}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: 'internal_server_error'});
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;

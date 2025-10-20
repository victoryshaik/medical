const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res, next) => {
  db.all('SELECT * FROM tests', (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

router.post('/', (req, res, next) => {
  const { patient_id, test_name, result, date } = req.body;
  if (!patient_id || !test_name) return res.status(400).json({error: 'patient_and_test_required'});
  db.run('INSERT INTO tests (patient_id,test_name,result,date) VALUES (?,?,?,?)',
    [patient_id, test_name, result || null, date || new Date().toISOString()],
    function(err) {
      if (err) return next(err);
      db.get('SELECT * FROM tests WHERE id = ?', [this.lastID], (e, row) => {
        if (e) return next(e);
        res.status(201).json(row);
      });
    });
});

module.exports = router;

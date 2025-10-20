const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res, next) => {
  db.all('SELECT * FROM patients', (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

router.post('/', (req, res, next) => {
  const { name, age, gender, phone } = req.body;
  if (!name) return res.status(400).json({error: 'name_required'});
  db.run('INSERT INTO patients (name,age,gender,phone) VALUES (?,?,?,?)',
    [name, age || null, gender || null, phone || null],
    function(err) {
      if (err) return next(err);
      db.get('SELECT * FROM patients WHERE id = ?', [this.lastID], (e, row) => {
        if (e) return next(e);
        res.status(201).json(row);
      });
    });
});

router.get('/:id', (req, res, next) => {
  db.get('SELECT * FROM patients WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({error: 'not_found'});
    res.json(row);
  });
});

module.exports = router;

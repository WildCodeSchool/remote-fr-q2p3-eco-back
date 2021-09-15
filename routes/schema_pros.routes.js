const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM schema_pros', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving schema_pros from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM schema_pros WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving schema_pros from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('schema_pros not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { picture_path} = req.body;
  connection.query(
    'INSERT INTO schema_pros (picture_path) VALUES (?)',
    [picture_path],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the picture');
      } else {
        const id = result.insertId;
        const createdSchema = { id, picture_path };
        res.status(201).json(createdSchema);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const schemaprosId = req.params.id;
  const db = connection.promise();
  let existingSchemaPros = null;
  db.query('SELECT * FROM schema_pros WHERE id = ?', [schemaprosId])
    .then(([results]) => {
      existingSchemaPros = results[0];
      if (!existingSchemaPros) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE schema_pros SET ? WHERE id = ?', [req.body, schemaprosId]);
    })
    .then(() => {
      res.status(200).json({ ...existingSchemaPros, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`schema_pros with id ${schemaprosId} not found.`);
      else res.status(500).send('Error updating a schema_pros');
    });
});


router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM schema_pros WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an picture_path');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Picture deleted!');
        else res.status(404).send('Picture not found.');
      }
    }
  );
});

module.exports = router;
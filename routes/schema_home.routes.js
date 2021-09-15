const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM schema_home', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving schema_home from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const schemaHId = req.params.id;
  connection.query(
    'SELECT * FROM schema_home WHERE id = ?',
    [schemaHId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving schema_home from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('schema_home not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { picture_path} = req.body;
  connection.query(
    'INSERT INTO schema_home (picture_path) VALUES (?)',
    [picture_path],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the picture');
      } else {
        const id = result.insertId;
        const createdSchemaHome = { id, picture_path };
        res.status(201).json(createdSchemaHome);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const schemahomeId = req.params.id;
  const db = connection.promise();
  let existingSchemaHome = null;
  db.query('SELECT * FROM schema_home WHERE id = ?', [schemahomeId])
    .then(([results]) => {
      existingSchemaHome = results[0];
      if (!existingSchemaHome) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE schema_home SET ? WHERE id = ?', [req.body, schemahomeId]);
    })
    .then(() => {
      res.status(200).json({ ...existingSchemaHome, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`schema_home with id ${schemahomeId} not found.`);
      else res.status(500).send('Error updating a schema_home');
    });
});


router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM schema_home WHERE id = ?',
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
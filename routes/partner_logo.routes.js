const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM partner_logo', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving partner_logo from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const logoId = req.params.id;
  connection.query(
    'SELECT * FROM partner_logo WHERE id = ?',
    [logoId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving partner_logo from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('partner_logo not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { picture_path} = req.body;
  connection.query(
    'INSERT INTO partner_logo (picture_path) VALUES (?)',
    [picture_path],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the picture');
      } else {
        const id = result.insertId;
        const createdLogo = { id, picture_path };
        res.status(201).json(createdLogo);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const LogoId = req.params.id;
  const db = connection.promise();
  let existingLogo = null;
  db.query('SELECT * FROM partner_logo WHERE id = ?', [LogoId])
    .then(([results]) => {
      existingLogo = results[0];
      if (!existingLogo) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE partner_logo SET ? WHERE id = ?', [req.body, LogoId]);
    })
    .then(() => {
      res.status(200).json({ ...existingLogo, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`partner_logo with id ${LogoId} not found.`);
      else res.status(500).send('Error updating a partner_logo');
    });
});


router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM partner_logo WHERE id = ?',
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
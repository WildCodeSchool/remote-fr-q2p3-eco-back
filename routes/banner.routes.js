const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM banner', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving banner from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const bannerId = req.params.id;
  connection.query(
    'SELECT picture_path FROM banner WHERE id = ?',
    [bannerId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving banner from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Banner not found');
      }
    }
  );
});



router.put('/:id', (req, res) => {
  const bannerId = req.params.id;
  const db = connection.promise();
  let existingBanner = null;
  db.query('SELECT * FROM banner WHERE id = ?', [bannerId])
    .then(([results]) => {
      existingBanner = results[0];
      if (!bannerId) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE banner SET ? WHERE id = ?', [req.body, bannerId]);
    })
    .then(() => {
      res.status(200).json({ ...bannerId, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`banner with id ${bannerId} not found.`);
      else res.status(500).send('Error updating a banner');
    });
});





module.exports = router;
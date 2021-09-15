const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM partners', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving partners from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM partners WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving partners from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('partners not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { civility, company, firstname, lastname, email, phone, siret_number, tva_number, description, payment_address, city_payment, post_code_payment, delivery_adress, post_code_delivery, city_delivery, picture_path, role, password } = req.body;
  connection.query('INSERT INTO partners (civility, company, firstname, lastname, email, phone, siret_number, tva_number, description, payment_address, city_payment, post_code_payment, delivery_adress, post_code_delivery, city_delivery, picture_path, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [civility, company, firstname, lastname, email, phone, siret_number, tva_number, description, payment_address, city_payment, post_code_payment, delivery_adress, post_code_delivery, city_delivery, picture_path, role, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the partner');
      } else {
        const id = result.insertId;
        const createdPartner = { id, civility, company, firstname, lastname, email, phone, siret_number, tva_number, description, payment_address, city_payment, post_code_payment, delivery_adress, post_code_delivery, city_delivery, picture_path, role, password };
        res.status(201).json(createdPartner);
      }
    }
  );
});


router.put('/:id', (req, res) => {
  const partnerId = req.params.id;
  const db = connection.promise();
  let existingPartner = null;
  db.query('SELECT * FROM partners WHERE id = ?', [partnerId])
    .then(([results]) => {
      existingPartner = results[0];
      if (!existingPartner) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE partners SET ? WHERE id = ?', [req.body, partnerId]);
    })
    .then(() => {
      res.status(200).json({ ...existingPartner, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Partners with id ${partnerId} not found.`);
      else res.status(500).send('Error updating a partner');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM partners WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an partner');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 partner deleted!');
        else res.status(404).send('partner not found.');
      }
    }
  );
});

module.exports = router;
const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM team', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving team from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const teamId = req.params.id;
  connection.query(
    'SELECT * FROM team WHERE id = ?',
    [teamId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving team from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('team not found');
      }
    }
  );
});

router.post('/', (req, res) => {

  const { firstname, lastname, picture_path, description, status, network } = req.body;
  connection.query(
    'INSERT INTO team (firstname, lastname, picture_path, description, status, network) VALUES (?, ?, ?, ?, ?, ?)',
    [firstname, lastname, picture_path, description, status, network],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the team');
      } else {
        const id = result.insertId;
        const createdUser = { id, firstname, lastname, picture_path, description, status, network };
        res.status(201).json(createdUser);
      }
    }
  );
});



router.put('/:id', (req, res) => {
  const teamId = req.params.id;
  const db = connection.promise();
  let existingTeam = null;
  db.query('SELECT * FROM team WHERE id = ?', [teamId])
    .then(([results]) => {
      existingTeam = results[0];
      if (!existingTeam) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE team SET ? WHERE id = ?', [req.body, teamId]);
    })
    .then(() => {
      res.status(200).json({ ...existingTeam, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`team with id ${teamId} not found.`);
      else res.status(500).send('Error updating a team');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM team WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an team');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 team deleted!');
        else res.status(404).send('team not found.');
      }
    }
  );
});

module.exports = router;
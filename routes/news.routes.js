const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM news', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving news from database');
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const newsId = req.params.id;
  connection.query(
    'SELECT * FROM news WHERE id = ?',
    [newsId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving news from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('news not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { title, content, picture_path } = req.body;
  connection.query(
    'INSERT INTO news (title, content, picture_path) VALUES (?, ?, ?)',
    [title, content, picture_path],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the news');
      } else {
        const id = result.insertId;
        const createdNews = { id, title, content, picture_path };
        res.status(201).json(createdNews);
      }
    }
  );
});



router.put('/:id', (req, res) => {
  const newsId = req.params.id;
  const db = connection.promise();
  let existingnews = null;
  db.query('SELECT * FROM news WHERE id = ?', [newsId])
    .then(([results]) => {
      existingnews = results[0];
      if (!existingnews) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE news SET ? WHERE id = ?', [req.body, newsId]);
    })
    .then(() => {
      res.status(200).json({ ...existingnews, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`news with id ${newsId} not found.`);
      else res.status(500).send('Error updating a news');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM news WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an news');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 news deleted!');
        else res.status(404).send('news not found.');
      }
    }
  );
});

module.exports = router;
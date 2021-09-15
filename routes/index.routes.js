const router = require('express').Router();
const usersRouter = require('./users.routes');
const partnersRouter = require('./partners.routes');
const teamRouter = require('./team.routes');
const schprosRouter = require('./schema_pros.routes');

router.use('/users', usersRouter);
router.use('/partners', partnersRouter);
router.use('/team', teamRouter);
router.use('/schemapros', schprosRouter);

module.exports = router;
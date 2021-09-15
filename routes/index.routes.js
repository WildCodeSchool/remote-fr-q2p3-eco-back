const router = require('express').Router();
const usersRouter = require('./users.routes');
const partnersRouter = require('./partners.routes');
// const teamRouter = require('./team.routes');

router.use('/users', usersRouter);
router.use('/partners', partnersRouter);
// router.use('/team', teamRouter);



module.exports = router;
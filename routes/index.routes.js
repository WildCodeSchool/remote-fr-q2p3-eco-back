const router = require('express').Router();
const usersRouter = require('./users.routes');
const partnersRouter = require('./partners.routes');
const teamRouter = require('./team.routes');
const schprosRouter = require('./schema_pros.routes');
const schemahomeRouter = require('./schema_home.routes');
const partnerlogoRouter = require('./partner_logo.routes');


router.use('/users', usersRouter);
router.use('/partners', partnersRouter);
router.use('/team', teamRouter);
router.use('/schema_pros', schprosRouter);
router.use('/schema_home', schemahomeRouter);
router.use('/partner_logo', partnerlogoRouter);


module.exports = router;
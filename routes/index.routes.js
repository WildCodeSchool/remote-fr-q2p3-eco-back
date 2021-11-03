const router = require('express').Router();
const usersRouter = require('./users.routes');
const partnersRouter = require('./partners.routes');
const teamRouter = require('./team.routes');
const bannerRouter = require('./banner.routes');
const schprosRouter = require('./schema_pros.routes');
const schemahomeRouter = require('./schema_home.routes');
const partnerlogoRouter = require('./partner_logo.routes');
const newsRouter = require('./news.routes');


router.use('/users', usersRouter);
router.use('/partners', partnersRouter);
router.use('/team', teamRouter);
router.use('/banner', bannerRouter);
router.use('/schema_pros', schprosRouter);
router.use('/schema_home', schemahomeRouter);
router.use('/partner_logo', partnerlogoRouter);
router.use('/news', newsRouter);


module.exports = router;
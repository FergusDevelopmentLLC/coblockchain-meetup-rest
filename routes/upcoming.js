const router = require('express-promise-router')();
const UpcomingController = require('../controllers/upcoming');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(UpcomingController.getUpcommingMeetups);

module.exports = router;

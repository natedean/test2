var router = require('koa-router')();

//router.get('/', require('./home'));
router.get('/test', require('./test'));
router.get('/question', require('./question'));

module.exports = router;
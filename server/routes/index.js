var router = require('koa-router')();

//router.get('/', require('./home'));
router.get('/test', require('./test'));

module.exports = router;
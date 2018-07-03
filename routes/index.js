const router = require('koa-router')();
const koaBody = require('koa-body');


router.get('/', async (ctx) => {
  await ctx.render('index');
});

router.post('/',async (ctx)=>{
  // console.log(ctx.request.files);
  console.log(ctx.uploadpath);
  ctx.body = JSON.stringify(ctx.request.files);
});

module.exports = router;

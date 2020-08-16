const Koa = require('koa');
const path = require('path');
const app = new Koa();
let router = require('koa-router')(); /*引入是实例化路由** 推荐*/
const static = require('koa-static');

app.use(static(
    path.join(__dirname,  './static')
))

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

router.get('/', async (ctx) => {
  ctx.body = "首页";
})

router.get('/get/:type', async (ctx) => {
  let type = ctx.params.type;
  if (type === 'json') {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      message: 'OK',
      data: {
        type: type,
      }
    };
  } else if (type === 'xml') {
    ctx.response.type = 'xml';
    ctx.body = `
    <data>
      <node1>1</node1>
      <node2>2</node2>
      <node3>@*%$#!~+-=()|:;?^.,''""/_【】{}《》；‘’，。：“”￥！——-</node3>
    </data>
    `;
  }
})

router.get('/time', async (ctx, next) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      ctx.status = 504;
      ctx.body = {
        code: 504,
        message: 'Fail',
        data: {}
      };
      resolve();
    }, 3000);
  })
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`服务启动的端口为${port}`);
});
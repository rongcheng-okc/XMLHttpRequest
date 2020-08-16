const Koa = require('koa');
const path = require('path');
const app = new Koa();
let router = require('koa-router')(); /*引入是实例化路由** 推荐*/
const static = require('koa-static');

app.use(static(
    path.join(__dirname,  './static')
))

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

router.get('/level1', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    code: 200,
    message: 'Success',
    data: {}
  };
})

router.get('/api/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let time = parseInt(ctx.query.time, 10);
  if (id % 2 === 0) {
    await new Promise((resolve) => {
      setTimeout(() => {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          message: 'OK',
          data: {
            id: id,
          }
        };
        resolve();
      }, time)
    })
  } else {
    await new Promise((resolve) => {
      setTimeout(() => {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: 'Fail',
          data: {
            id: id,
          }
        };
        resolve();
      }, time);
    })
  }
  next();
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

const port = 3001;
app.listen(port, () => {
  console.log(`服务启动的端口为${port}`);
});
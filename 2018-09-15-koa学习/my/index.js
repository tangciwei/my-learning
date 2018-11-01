const log = console.log;
const logj = function (obj) {
    log(JSON.stringify(obj));
};
// --------

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    let aaa = await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 响应
app.use(ctx => {
    logj(ctx);
    ctx.body = 'Hello Koa';
});

app.listen(3000);

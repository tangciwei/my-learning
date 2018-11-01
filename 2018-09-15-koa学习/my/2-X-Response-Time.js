const log = console.log;
const logj = function (obj) {
    log(JSON.stringify(obj));
};
// -------------------
const Koa = require('koa');
const app = new Koa();
// -------------------head

async function responseTime(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;

    ctx.set('X-Response-Time', `${ms}ms`);
}

app.use(responseTime);
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(3000);

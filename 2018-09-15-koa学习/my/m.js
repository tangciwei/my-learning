const log = console.log;
const logj = function (obj) {
    log(JSON.stringify(obj));
};
// -------------------
const Koa = require('../koa-src/lib/application');
const app = new Koa();
// -------------------head

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(3000);

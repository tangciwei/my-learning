const log = console.log;
const logj = function (obj) {
    log(JSON.stringify(obj));
};
// -------------------
const Koa = require('koa');
const app = new Koa();
// -------------------head

function logger(format) {
    format = format || ':method ":url"';

    return async function (ctx, next) {
        const str = format
            .replace(':method', ctx.method)
            .replace(':url', ctx.url);

        console.log(str);

        await next();
    };
}

app.use(logger());
app.use(ctx => {
    log(app.proxy)
    ctx.body = 'Hello Koa';
});
app.listen(3000);
// app.use(logger(':method :url'));

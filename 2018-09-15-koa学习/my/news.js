const log = console.log;
const logj = function(obj) {
    log(JSON.stringify(obj));
};
// -------------------
const Koa = require('koa');
const app = new Koa();
// -------------------head

const main = async function(ctx, next) {
    ctx.response.type = 'json';
    ctx.response.body = {
        list: [
            { id: 1, title: 'this is news 1', url: '/news/1' },
            { id: 2, title: 'this is news 2', url: '/news/2' }
        ]
    }
};

app.use(main);



// app.use(ctx => {
//     ctx.body = 'Hello Koa';
// });

app.listen(3000);
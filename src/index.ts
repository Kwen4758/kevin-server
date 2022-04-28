import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { fetchMovie } from './database';
import ENV from './env';

const router = new Router();

router.get('/', async (ctx, next) => {
  const movie = await fetchMovie();
  ctx.body = movie;
});

router.get('/potato', (ctx, next) => {
  ctx.body = ENV;
});

router.get('/return/:word', (ctx, next) => {
  ctx.body = ctx.params;
});

router.post('/post', (ctx, next) => {
  ctx.body = ctx.request.body;
});

router.put('/vector/normalize', (ctx, next) => {
  const vector: number[] = ctx.request.body.vector;
  const magnitude = Math.sqrt(
    vector.reduce((prev, cur) => {
      return prev + Math.pow(cur, 2);
    }, 0)
  );
  const normalizedVector = vector.map((num) => num / magnitude);
  ctx.body = normalizedVector;
});

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(ENV.server.port);
console.log(`app listening on port ${ENV.server.port}...`);

import Fastify, { FastifyInstance } from 'fastify';

const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.get('/', (req, rep) => {
  rep.send({ hello: 'world'});
});

fastify.listen({
  port: 3000,
  host: '0.0.0.0'
}, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
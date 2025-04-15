import Fastify, { FastifyInstance } from 'fastify';
import formPlugin from './forms/forms.plugin.js';

const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.get('/', (req, rep) => {
  rep.send({ hello: 'world'});
});

fastify.register(formPlugin)

fastify.listen({
  port: 3000,
  host: '0.0.0.0'
}, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
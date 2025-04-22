import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import formPlugin from './forms/forms.plugin.js';

const PORT = process.env.FORM_HTTP_PORT || 3000;
const HOST = process.env.FORM_HTTP_HOST || '0.0.0.0';

const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
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
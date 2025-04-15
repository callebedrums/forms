import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";

async function routes (fastify: FastifyInstance ) {
  const formData = (fastify as any).formData as FormData;

  fastify.get('/forms', async (request, reply) => {
    return await formData.list();
  });
}

export { routes };
export default routes;

import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";

async function routes (fastify: FastifyInstance, options: {
  formOptions: {
    formData: FormData
  }
}) {
  const formData = options.formOptions.formData

  fastify.get('/', async (request, reply) => {
    return await formData.list();
  });
}

export { routes };
export default routes;

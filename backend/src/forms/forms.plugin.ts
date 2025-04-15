import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";
import getFormDataInstance from "./forms-data.factory.js";
import routes from "./forms.routes.js";

export async function formPlugin(fastify: FastifyInstance) {
  const formData: FormData = await getFormDataInstance();

  fastify.register(routes, {
    prefix: '/forms',
    formOptions: { formData }
  });
}

export default formPlugin;
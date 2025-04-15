import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";
import getFormDataInstance from "./forms-data.factory.js";
import routes from "./forms.routes.js";

export async function formPlugin(fastify: FastifyInstance) {
  const _formData: FormData = await getFormDataInstance();
  
  console.log(_formData);
  fastify.decorate('formData', _formData);

  fastify.register(routes);
}

export default formPlugin;
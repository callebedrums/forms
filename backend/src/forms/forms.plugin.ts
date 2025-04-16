import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";
import { getFormDataInstance, getFormAnswerDataInstance } from "./forms-data.factory.js";
import routes from "./forms.routes.js";
import { FormAnswerData } from "./form-answer.data.js";

export async function formPlugin(fastify: FastifyInstance) {
  const formData: FormData = await getFormDataInstance();
  const formAnswerData: FormAnswerData = await getFormAnswerDataInstance();

  fastify.register(routes, {
    prefix: '/forms',
    formOptions: { formData, formAnswerData }
  });
}

export default formPlugin;
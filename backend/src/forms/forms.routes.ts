import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";
import { Form, FormAnswer } from '../types/form.js';
import { FormAnswerNoId, FormAnswerWithId, FormNoId, FormWithId } from "./forms.routes.schemas.js";
import { FormAnswerData } from "./form-answer.data.js";

async function routes (fastify: FastifyInstance, options: {
  formOptions: {
    formData: FormData,
    formAnswerData: FormAnswerData
  }
}) {
  const { formData, formAnswerData } = options.formOptions;

  /**
   * List all forms for the authenticated user
   */
  fastify.get('/', async function(request, reply) {
    return await formData.list();
  });

  /**
   * Add new form to the authenticated user
   */
  fastify.post('/', {
    schema: { body: FormNoId }
  }, async function (request, reply) {
    return await formData.add(request.body as Form);
  });

  /**
   * retrieve form data for the authenticated user or public forms from other users
   */
  fastify.get('/:id', async function (request, reply) {
    const form = await formData.get((request.params as any).id);
    if (form) return form;

    reply.code(404);
    return await reply.send({ error: 'Form not found' });
  });

  /**
   * Update form
   */
  fastify.put('/:id', {
    schema: { body: FormWithId }
  }, async function (request, reply) {
    const id: string = (request.params as any).id;
    let form: Form = request.body as Form;

    if (id !== form.id) {
      reply.code(400);
      return await reply.send({ error: 'url id parameter does not match payload form id' });
    }

    
    try {
      form = await formData.update(form);
    } catch (err) {
      reply.code(404);
      return await reply.send({ error: 'form not found' });
    }

    return form;
  });

  /**
   * Delete form
   */
  fastify.delete('/:id', async function (request, replay) {
    const id: string = (request.params as any).id;
    return await formData.remove(id);
  });

  /**
   * List all answers for a given form
   */
  fastify.get('/:formId/answers', async function (request, reply) {
    const formId: string = (request.params as any).formId;
    return await formAnswerData.list(formId);
  });

  /**
   * Add new Answer to a form
   */
  fastify.post('/:formId/answers', {
    schema: { body: FormAnswerNoId }
  }, async function (request, reply) {
    const formId: string = (request.params as any).formId;
    const answer: FormAnswer = request.body as FormAnswer;

    if (formId !== answer.formId) {
      reply.code(400);
      return await reply.send({ error: 'url id parameter does not match payload form id' });
    }

    const form = await formData.get(formId);
    if (!form) {
      reply.code(404);
      return await reply.send({ error: 'form not found' });
    }

    return formAnswerData.add(answer);
  });

  /**
   * Update an existing answer
   */
  fastify.put('/:formId/answers/:id', {
    schema: { body: FormAnswerWithId }
  }, async function (request, reply) {
    const formId: string = (request.params as any).formId;
    const id: string = (request.params as any).id;
    let answer: FormAnswer = request.body as FormAnswer;

    if (formId !== answer.formId || id !== answer.id) {
      reply.code(400);
      return await reply.send({ error: 'url id parameter does not match payload id' });
    }

    const form = await formData.get(formId);
    if (!form) {
      reply.code(404);
      return await reply.send({ error: 'form not found' });
    }

    try {
      answer = await formAnswerData.update(answer);
    } catch (err) {
      reply.code(404);
      return await reply.send({ error: 'answer not found' });
    }

    return answer;
  });
}

export { routes };
export default routes;

import { FastifyInstance } from "fastify";
import { FormData } from "./form.data.js";
import { Form } from '../types/form.js';

const FormNoId = {
  type: 'object',
  required: ['name', 'fields'],
  additionalProperties: false,
  properties: {
    name: { type: 'string'},
    description: { type: 'string' },
    fields: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['name', 'label', 'type'],
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
          type: { enum: ['text', 'textarea'] },
          required: { type: 'boolean' },
          placeholder: { type: 'string'}
        }
      }
    }
  }
};

const FormWithId = JSON.parse(JSON.stringify(FormNoId));
FormWithId.required.push('id');
FormWithId.properties.id = { type: 'string'};

async function routes (fastify: FastifyInstance, options: {
  formOptions: {
    formData: FormData
  }
}) {
  const formData = options.formOptions.formData

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
    schema: {
      body: FormNoId
    }
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
    schema: {
      body: FormWithId
    }
  }, async function (request, reply) {
    const id: string = (request.params as any).id;
    const form: Form = request.body as Form;
    if (id !== form.id) {
      reply.code(400);
      return await reply.send({ error: 'url id parameter does not match payload form id' });
    }

    return await formData.update(form);
  });

  /**
   * Delete form
   */
  fastify.delete('/:id', async function (request, replay) {
    const id: string = (request.params as any).id;
    return await formData.remove(id);
  });
}

export { routes };
export default routes;

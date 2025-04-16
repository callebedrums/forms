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

const FormAnswerNoId = {
  type: 'object',
  required: ['formId', 'answers'],
  additionalProperties: false,
  properties: {
    formId: { type: 'string' },
    answers: {
      type: 'array',
      uniqueItems: true,
      minItems: 1,
      items: {
        type: 'object',
        required: ['name', 'value'],
        properties: {
          name: { type: 'string' },
          value: {
            type: ['string', 'boolean', 'array'],
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};

const FormAnswerWithId = JSON.parse(JSON.stringify(FormAnswerNoId));
FormAnswerWithId.required.push('id');
FormAnswerWithId.properties.id = { type: 'string'};

export { FormNoId, FormWithId, FormAnswerNoId, FormAnswerWithId };
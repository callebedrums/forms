import { v4 as uuidv4 } from 'uuid';
export class FormAnswerDataMemory {
    answers = [
        {
            id: 'a1',
            formId: '1',
            answers: [
                {
                    name: 'field_1',
                    value: 'Field 1 answer 1'
                },
                {
                    name: 'field_2',
                    value: 'Field 2 answer 1'
                }
            ]
        },
        {
            id: 'a2',
            formId: '1',
            answers: [
                {
                    name: 'field_1',
                    value: 'Field 1 answer 2'
                },
                {
                    name: 'field_2',
                    value: 'Field 2 answer 2'
                }
            ]
        }
    ];
    async add(answer) {
        answer = JSON.parse(JSON.stringify(answer));
        answer.id = uuidv4();
        this.answers.push(answer);
        return answer;
    }
    async update(answer) {
        const index = this.answers.findIndex(a => a.id === answer.id);
        if (index < 0)
            throw Error('FormAnswer not found');
        this.answers[index] = answer;
        return answer;
    }
    async list(formId) {
        return this.answers.filter(answer => answer.formId === formId);
    }
}
//# sourceMappingURL=form-answer.data.memory.js.map
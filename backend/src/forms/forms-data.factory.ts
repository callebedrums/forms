import { FormAnswerData } from './form-answer.data.js';
import { FormAnswerDataMemory } from './form-answer.data.memory.js';
import { FormData } from './form.data.js';
import { FormDataMemory } from "./form.data.memory.js";

export async function getFormDataInstance(): Promise<FormData> {
  /**
   * Check environments variables.
   * Build proper FormData implementation.
   */

  return new FormDataMemory();
}

export async function getFormAnswerDataInstance(): Promise<FormAnswerData> {
  return new FormAnswerDataMemory();
}

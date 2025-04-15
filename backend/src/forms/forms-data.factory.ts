import { FormData } from './form.data.js';
import { FormDataMemory } from "./form.data.memory.js";

export async function getFormDataInstance(): Promise<FormData> {
  /**
   * Check environments variables.
   * Build proper FormData implementation.
   */

  return new FormDataMemory();
}

export default getFormDataInstance;
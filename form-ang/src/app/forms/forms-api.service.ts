import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FORMS_API } from '../env.config';
import { firstValueFrom } from 'rxjs';
import { Form } from '../types/form';
import { FormsService } from './forms-service.class';



@Injectable({
  providedIn: 'root'
})
export class FormsApiService extends FormsService {

  private http = inject(HttpClient);

  private api: string = inject(FORMS_API);

  constructor() { super() }

  async list(): Promise<Array<Form>> {
    return firstValueFrom(this.http.get<Array<Form>>(this.api));
  }

  async get(id: string): Promise<Form | undefined> {
    return firstValueFrom(this.http.get<Form>(`${this.api}/${id}`));
  }

  async save(form: Form): Promise<Form> {    
    if (!form.id) return await this.post(form);
    return await this.update(form);
  }
  
  async deleteForm(form: Form): Promise<void> {
    if (!form.id) return;

    await firstValueFrom(this.http.delete(`${this.api}/${form.id}`));
  }

  private async post(form: Form): Promise<Form> {
    form = { ...form };
    delete form.id;

    return firstValueFrom(this.http.post<Form>(`${this.api}`, form));
  }

  private async update(form: Form): Promise<Form> {
    return firstValueFrom(this.http.put<Form>(`${this.api}/${form.id}`, form));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsService, FormsServiceToken } from '../../forms-service.class';
import { Form } from '../../../types/form';

@Component({
  selector: 'app-forms-list',
  imports: [RouterLink],
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss'
})
export class FormsListComponent implements OnInit {
  private formsService: FormsService = inject(FormsServiceToken);

  forms: Array<Form> = [];

  ngOnInit(): void {
    this.formsService.list().then(forms => {
      this.forms = forms;
    });
  }

  async deleteForm(form: Form) {
    await this.formsService.deleteForm(form);

    this.forms = this.forms.filter(f => f.id !== form.id);
  }
}

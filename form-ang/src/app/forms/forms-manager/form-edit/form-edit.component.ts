import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsService, FormsServiceToken } from '../../forms-service.class';
import { Field, Form } from '../../../types/form';

@Component({
  selector: 'app-forms-edit',
  imports: [],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss'
})
export class FormEditComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);

  private formsService: FormsService = inject(FormsServiceToken);

  // original, kept unmutable
  form: Form = { name: '', fields: []};

  // copy to be edited
  editForm: Form = { name: '', fields: []};
  fields: Array<Field> = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {

      const id = param.get('id') || '';
      if (id !== 'new') {
        this.formsService.get(id).then(form => {
          this.form = form || { name: '', fields: []};
        })
      } else {
        this.form = { name: '', fields: []};
      }
      
    })
  }

  public reset() {
    this.editForm = { ...this.form };
    this.fields = JSON.parse(JSON.stringify(this.form.fields));
  }
}

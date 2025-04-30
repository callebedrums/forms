import { Routes } from '@angular/router';
import { FormsManagerComponent } from './forms/forms-manager/forms-manager/forms-manager.component';
import { FormsListComponent } from './forms/forms-manager/forms-list/forms-list.component';
import { FormEditComponent } from './forms/forms-manager/form-edit/form-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: FormsManagerComponent,
    children: [
      {
        path: '',
        component: FormsListComponent
      },
      {
        path: ':id/edit',
        component: FormEditComponent
      }
    ]
  }
];

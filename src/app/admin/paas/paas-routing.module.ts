import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessOneComponent } from './business-one/business-one.component';
import { GenericComponent } from './generic/generic.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'business-one/:id',
    component: BusinessOneComponent
  },
  {
    path: 'generic/:id',
    component: GenericComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaasRoutingModule { }

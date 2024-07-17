import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LottieComponent } from 'ngx-lottie';
import { BusinessOneComponent } from './business-one/business-one.component';
import { GenericComponent } from './generic/generic.component';
import { ListComponent } from './list/list.component';
import { PaasRoutingModule } from './paas-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    BusinessOneComponent,
    GenericComponent
  ],
  imports: [
    CommonModule,
    PaasRoutingModule,
    LottieComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaasModule { }

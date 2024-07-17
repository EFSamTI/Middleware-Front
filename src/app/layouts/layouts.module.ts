import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HeaderComponent } from './header/header.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LanguageService } from '../core/services/language';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    TopbarComponent,
    HeaderComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SimplebarAngularModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [LanguageService]
})
export class LayoutsModule { }

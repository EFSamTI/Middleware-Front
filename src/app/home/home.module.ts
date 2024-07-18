import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    TranslateModule
  ]
})
export class HomeModule { }

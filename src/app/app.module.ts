import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideUserIdleConfig } from 'angular-user-idle';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const initializeKeycloak = (keycloak: KeycloakService) => async () =>
  keycloak.init({
    config: {
      url: environment.keycloak.authority,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      // onLoad: 'login-required',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false,
      redirectUri: environment.keycloak.redirectUri,
    },
    // enableBearerInterceptor: true,
    // bearerPrefix: 'Bearer'
  });

// export const KeycloakBearerInterceptorProvider: Provider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: KeycloakBearerInterceptor,
//   multi: true
// };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'sp',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    KeycloakAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    // KeycloakBearerInterceptorProvider,
    provideUserIdleConfig({
      idle: environment.idleConfig.idle,
      ping: environment.idleConfig.ping,
      timeout: environment.idleConfig.timeout,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

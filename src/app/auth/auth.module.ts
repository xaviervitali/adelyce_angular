import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TokenInterceptor } from './token.interceptor';
import { LoginComponent } from './login/login.component';

@NgModule({
  // declarations: [RegisterComponent, LoginComponent],
  imports: [SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}

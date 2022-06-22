import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';

const routes: Routes = [  { path: '', component: LoginComponent }, {path:"bucketList", component: BucketListComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

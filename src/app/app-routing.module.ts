import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Component/auth/auth.component';
import { HomeComponent } from './Component/home/home.component';

import { authGuard } from './Guard/auth.guard';

import { QuestionComponent } from './Component/question/question.component';
import { QuestionDetailComponent } from './Component/question-detail/question-detail.component';
import { CreateQuestionComponent } from './Component/create-question/create-question.component';
import { CategoryComponent } from './Component/category/category.component';
import { UpdateCategoryComponent } from './Component/update-category/update-category.component';
import { CreateUserComponent } from './Component/create-user/create-user.component';
import { UserComponent } from './Component/user/user.component';
import { DetailComponent } from './Component/detail/detail.component';
import { adminGuard } from './Guard/admin.guard';
import { userGuard } from './Guard/user.guard';
import { InfoUserComponent } from './Component/info-user/info-user.component';
import { EditInfoComponent } from './Component/edit-info/edit-info.component';
const routes: Routes = [
  {path:'', redirectTo:"login", pathMatch:'full'},
  {path:'login', component:AuthComponent},

  {path:'home', component:HomeComponent,canActivate:[authGuard,userGuard]},
  {path:'info-user', component:InfoUserComponent,canActivate:[authGuard]},
  {path:'question', component:QuestionComponent,canActivate:[authGuard,adminGuard]},
  {path:'question/detail/:id', component:QuestionDetailComponent,canActivate:[authGuard,adminGuard]},
  {path:'question/create', component:CreateQuestionComponent,canActivate:[authGuard,adminGuard]},
  {path:'category', component:CategoryComponent,canActivate:[authGuard,adminGuard]},
  {path:'category/detail/:id', component:UpdateCategoryComponent,canActivate:[authGuard,adminGuard]},
  {path:'user/create', component:CreateUserComponent,canActivate:[authGuard,adminGuard]},
  {path:'user', component:UserComponent,canActivate:[authGuard,adminGuard]},
  {path:'user/detail/:id', component:DetailComponent,canActivate:[authGuard]},
  {path:'user/edit-info/:id', component:EditInfoComponent,canActivate:[authGuard,adminGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

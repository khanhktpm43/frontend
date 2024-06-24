import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{AngularFireModule} from "@angular/fire/compat";
import{AngularFireStorageModule}from "@angular/fire/compat/storage";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/enviroments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Service/auth-interceptor';
import { AuthComponent } from './Component/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Component/home/home.component';


import { authGuard } from './Guard/auth.guard';
import { adminGuard } from './Guard/admin.guard';
import { QuestionComponent } from './Component/question/question.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './Pipe/search-filter.pipe';
import { QuestionDetailComponent } from './Component/question-detail/question-detail.component';
import { CreateQuestionComponent } from './Component/create-question/create-question.component';
import { CategoryComponent } from './Component/category/category.component';
import { UpdateCategoryComponent } from './Component/update-category/update-category.component';
import { CreateUserComponent } from './Component/create-user/create-user.component';
import { UserComponent } from './Component/user/user.component';
import { CountdownFormatPipe } from './Pipe/countdown-format.pipe';
import { DetailComponent } from './Component/detail/detail.component';
import { InfoUserComponent } from './Component/info-user/info-user.component';
import { EditInfoComponent } from './Component/edit-info/edit-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
 
    QuestionComponent,
    SearchFilterPipe,
    QuestionDetailComponent,
    CreateQuestionComponent,
    CategoryComponent,
    UpdateCategoryComponent,
    CreateUserComponent,
    UserComponent,
    CountdownFormatPipe,
    DetailComponent,
    InfoUserComponent,
    EditInfoComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    CookieService,authGuard, adminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

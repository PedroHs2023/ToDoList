import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { TaskListComponent } from './task-list/task-list.component';
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}

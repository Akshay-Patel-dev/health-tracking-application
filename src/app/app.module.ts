import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  // ...
  imports: [
    BrowserModule,
    // ... other imports
    BrowserAnimationsModule // OR NoopAnimationsModule
  ],
  // ...
})
export class AppModule { }

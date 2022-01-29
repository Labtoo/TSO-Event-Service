import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ResourcesFieldsComponent } from './resources-fields/resources-fields.component';
import { StaticContentComponent } from './static-content/static-content.component';
import { ResourceFiledsListComponent } from './resource-fileds-list/resource-fileds-list.component';
import { AdventuresListComponent } from './adventures-list/adventures-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ResourcesFieldsComponent,
    StaticContentComponent,
    CurrentTimeComponent,
    ResourceFiledsListComponent,
    AdventuresListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Material
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

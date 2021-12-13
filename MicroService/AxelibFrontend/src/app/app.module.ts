import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';
import { AppRoutingModule } from './app-routing.module';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListComponent } from './event-list/event-list.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { ConcoursComponent } from './concours/concours.component';

@NgModule({
  declarations: [
    AppComponent,
    FournisseurComponent,
    UserComponent,
    EventComponent,
    BookComponent,
    EventListComponent,
    CreateEventComponent,
    UpdateEventComponent,
    EventDetailsComponent,
    CreateBookComponent,
    ConcoursComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

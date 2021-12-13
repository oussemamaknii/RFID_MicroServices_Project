import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { BookComponent } from './book/book.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListComponent } from './event-list/event-list.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { ConcoursComponent } from './concours/concours.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'concours', component: ConcoursComponent },
  { path: 'fournisseurs', component: FournisseurComponent },
  { path: 'books', component: BookComponent },
  { path: 'create-book', component: CreateBookComponent },
  { path: 'events', component: EventListComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'update-event/:id', component: UpdateEventComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

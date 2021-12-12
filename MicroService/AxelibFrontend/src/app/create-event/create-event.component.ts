import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  event: Event = new Event();
  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {}

  saveEvent() {
    this.eventService.createEvent(this.event).subscribe(
      (data) => {
        console.log(data);
        this.goToEventList();
      },
      (error) => console.log(error)
    );
  }

  goToEventList() {
    this.router.navigate(['/events']);
  }

  onSubmit() {
    console.log(this.event);
    this.saveEvent();
  }
}

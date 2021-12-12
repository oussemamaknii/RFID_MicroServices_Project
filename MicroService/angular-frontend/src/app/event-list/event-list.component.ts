import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();
  }

  private getEvents() {
    this.eventService.getEventList().subscribe((data) => {
      this.events = data;
    });
  }

  eventDetails(id: number) {
    this.router.navigate(['event-details', id]);
  }

  updateEvent(id: number) {
    this.router.navigate(['update-event', id]);
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe((data) => {
      console.log(data);
      this.getEvents();
    });
  }
}

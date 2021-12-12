import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { EventService } from '../event/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent implements OnInit {
  id!: number;
  event: Event = new Event();
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.eventService.getEventById(this.id).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.eventService.updateEvent(this.id, this.event).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/events']);
  }
}

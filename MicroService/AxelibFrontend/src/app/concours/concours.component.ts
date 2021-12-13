import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Concours } from './Concours';
import { ConcoursService } from './concours.service';

@Component({
  selector: 'app-concours',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.css'],
})
export class ConcoursComponent implements OnInit {
  public concours!: Concours[];
  public editConcours!: Concours;
  public deleteConcours!: Concours;
  title: any = 'Axelib';
  public use!: Concours;

  constructor(private ConcoursService: ConcoursService) {}

  ngOnInit(): void {
    this.getConcours();
  }

  public getConcours(): void {
    this.ConcoursService.getConcours().subscribe(
      (response: Concours[]) => {
        this.concours = response;
      },
      (error: HttpErrorResponse) => {}
    );
  }

  public onAddConcours(addForm: NgForm): void {
    document.getElementById('add-Concours-form')!.click();
    this.ConcoursService.addConcours(addForm.value).subscribe(
      (response: Concours) => {
        this.getConcours();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchConcours(key: string): void {
    const results: Concours[] = [];
    for (const Concours of this.concours) {
      if (
        Concours.regles.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        Concours.lieu.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(Concours);
      }
    }
    this.concours = results;
    if (results.length === 0 || !key) {
      this.getConcours();
    }
  }

  public onDeleteConcours(ConcoursId: string | undefined): void {
    console.log(this.concours);
    this.ConcoursService.deleteConcours(ConcoursId).subscribe(
      (response: any) => {
        this.getConcours();
      },
      (error: HttpErrorResponse) => {
        this.getConcours();
      }
    );
  }

  public onUpdateConcours(Concours: Concours): void {
    this.ConcoursService.updateConcours(Concours).subscribe(
      (response: Concours) => {
        this.getConcours();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(concours: Concours, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addConcoursModal');
    }
    if (mode === 'edit') {
      this.editConcours = concours;
      button.setAttribute('data-target', '#updateConcoursModal');
    }
    if (mode === 'delete') {
      this.deleteConcours = concours;
      button.setAttribute('data-target', '#deleteConcoursModal');
    }
    container!.appendChild(button);
    button.click();
  }
}

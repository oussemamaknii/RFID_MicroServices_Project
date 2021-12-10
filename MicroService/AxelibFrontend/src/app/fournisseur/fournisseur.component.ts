import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Fournisseur } from './Fournisseur';
import { FournisseurService } from './fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css'],
})
export class FournisseurComponent implements OnInit {
  public Fournisseurs!: Fournisseur[];
  public editFournisseur!: Fournisseur;
  public deleteFournisseur!: Fournisseur;
  public use!: Fournisseur;

  constructor(private FournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.getFournisseurs();
  }

  public getFournisseurs(): void {
    this.FournisseurService.getFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.Fournisseurs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFournisseur(addForm: NgForm): void {
    document.getElementById('add-Fournisseur-form')!.click();
    this.FournisseurService.addFournisseur(addForm.value).subscribe(
      (response: Fournisseur) => {
        this.getFournisseurs();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchFournisseurs(key: string): void {
    const results: Fournisseur[] = [];
    for (const Fournisseur of this.Fournisseurs) {
      if (
        Fournisseur.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        Fournisseur.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        Fournisseur.uid.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        Fournisseur.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(Fournisseur);
      }
    }
    this.Fournisseurs = results;
    if (results.length === 0 || !key) {
      this.getFournisseurs();
    }
  }

  public onDeleteFournisseur(FournisseurId: number | undefined): void {
    this.FournisseurService.deleteFournisseur(FournisseurId).subscribe(
      (response: any) => {
        this.getFournisseurs();
      },
      (error: HttpErrorResponse) => {
        this.getFournisseurs();
      }
    );
  }

  public onUpdateFournisseur(Fournisseur: Fournisseur): void {
    this.FournisseurService.updateFournisseur(Fournisseur).subscribe(
      (response: Fournisseur) => {
        this.getFournisseurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(Fournisseur: Fournisseur, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFournisseurModal');
    }
    if (mode === 'edit') {
      this.editFournisseur = Fournisseur;
      button.setAttribute('data-target', '#updateFournisseurModal');
    }
    if (mode === 'delete') {
      this.deleteFournisseur = Fournisseur;
      button.setAttribute('data-target', '#deleteFournisseurModal');
    }
    container!.appendChild(button);
    button.click();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from './User';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public users!: User[];
  public editUser!: User;
  public deleteUser!: User;
  title: any = 'Axelib';
  public use!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {}
    );
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')!.click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchUsers(key: string): void {
    const results: User[] = [];
    for (const user of this.users) {
      if (
        user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.uid.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

  public onDeleteUser(userId: number | undefined): void {
    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        this.getUsers();
      }
    );
  }

  public onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#adduserModal');
    }
    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#updateuserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteuserModal');
    }
    container!.appendChild(button);
    button.click();
  }
}

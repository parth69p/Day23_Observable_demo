import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Parent } from './parent/parent';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './login-interceptor-interceptor';
import { DataService } from './data-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Parent, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class App implements OnInit {
  protected readonly title = signal('Observable_demo');
  users: any[] = [];

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('') 
  });

  constructor(private userService: DataService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  onSubmit() {
    console.log('Form submitted:', this.userForm.value);
    
  if (this.userForm.valid) {
    this.userService.createUser(this.userForm.value).subscribe({
      next: (res) => {
        console.log('User created (API response):', res);
        // Since JSONPlaceholder won't save permanently, 
        // we manually add it to the list for demo purposes
        this.users.push(this.userForm.value);
        this.userForm.reset();
      },
      error: (err) => {
        console.error('Error creating user:', err);
      }
    });
  }
}

  }


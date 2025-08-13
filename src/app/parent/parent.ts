import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../data-service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-parent',
  imports: [CommonModule],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})

export class Parent implements OnInit {
  ngOnInit(): void{
    this.dataservice.getPost().subscribe((todos) => {
      this.posts = todos;
    });

//   this.dataservice.getUsers().subscribe((users) => {
//       this.users = users;
//     });
  }
  
  dataservice = inject(DataService);
  users: any[]=[];
  posts: any[] = [];
}

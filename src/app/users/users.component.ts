import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  searchVal: string = "";
  searchResult: boolean = false;
  getUserAPI: string = "http://jsonplaceholder.typicode.com/users";
  searchedUser = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get(this.getUserAPI)
    .subscribe(data => {
      this.users = data;
    });
  }

  search() {
    if(this.searchVal.length >= 3) {
      this.users.find((user)=> {
        let userName = user.name.toLowerCase();
        this.searchVal = this.searchVal.toLowerCase();
        if(userName.includes(this.searchVal)) {
          this.http.get(this.getUserAPI+'/'+user.id)
          .subscribe(data => {
            this.searchResult = !data ? true : false;
            this.users = [data];
          });
        }
      })
    } else {
      this.getUsers();
    }
  }

}

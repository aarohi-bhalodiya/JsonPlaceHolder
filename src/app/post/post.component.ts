import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: any = [];
  user: any = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        let id = params['id'];
        this.http.get('http://jsonplaceholder.typicode.com/users/'+id)
        .subscribe(data => {
          this.user = data;
        });
        this.http.get('http://jsonplaceholder.typicode.com/posts/'+id)
        .subscribe(data => {
          this.post = data;
        });
      }
    );
  
  }

}

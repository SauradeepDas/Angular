import { Component, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products = [];
  id:number;
  private headers=new Headers({'Content-Type':'application/json'});
  
  deleteProduct=function(id) {
    if(confirm("Are you sure?")){
      const url="http://localhost:5555/products/"+id;
      return this.http.delete(url,{headers:this.headers}).toPromise().then(()=>{
        this.fetchData();
      })
    }
  }

  fetchData = function() {
  this.http.get("http://localhost:5555/products").subscribe(
    (res: Response) => {
      this.products = res;
    }
  )
}

ngOnInit() {
  this.fetchData();
}
}
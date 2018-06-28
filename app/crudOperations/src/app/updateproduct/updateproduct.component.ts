import { Component, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute,Router} from "@angular/router";


@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  id:number;
  data:Object={};
  products;
  exists=false;
  productObj:object={};
  private headers=new Headers({'Content-Type':'application/json'});
  constructor(private router:Router,private route:ActivatedRoute,private http: HttpClient) { };
  
  updateProduct(product){
    this.productObj={
      "name":product.name,
      "color":product.color
    };
    const url="http://localhost:5555/products/"+this.id;
    this.http.put(url,this.productObj).subscribe(()=>{
      this.router.navigate(['/']);
    }    
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
    });
    
    this.http.get("http://localhost:5555/products").subscribe(
    (res: Response) => {
      this.products = res;
      for(var i=0;i<this.products.length;i++){
        if(parseInt(this.products[i].id)===this.id){
          this.exists=true;
          this.data=this.products[i];
          break;
        }else{
          this.exists=false;
        }
      }
    }
  )
  }
}

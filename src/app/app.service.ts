import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor (private http: Http) {
      
  }

  getBatmanData(){
      console.log('batman');
      return this.http.get('/assets/batmanRealty.json').map((res)=>res.json());
      
  }

  getSuperManData(){
      console.log('superman');
      return this.http.get('/assets/supermanRealty.json').map((res)=>res.json());
  }
 
}

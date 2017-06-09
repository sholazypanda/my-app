import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";

interface RealtyData {
  address: string;
  baths: string;
  beds: string;
  price: string;
  img: string;
  sqft: string;
  url: string;
  built?:string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  public response: Array<RealtyData>;
  validateResponse: Array<RealtyData>;
  sortingVal = "price";
  constructor(private appService: AppService) {}
  ngOnInit() {
    this.appService.getBatmanData().subscribe(data => {
      console.log(data);
      //this.response=data;

      this.appService.getSuperManData().subscribe(dataSecond => {
        this.response = new Array<RealtyData>();
        this.validateResponse = new Array<RealtyData>();
        for (let key of Object.keys(data)) {
          console.log(key);
          if (this.validateResponse[key]) {
            console.error("Skipping duplicate data, address already present");
          } else {
            let obj = <RealtyData>{};
            obj.address = key;
            let val = data[key];
            obj.baths = this.getValidVal(val.baths);
            obj.beds = this.getValidVal(val.beds);
            obj.price = this.getValidVal(val.cost);
            obj.img = this.getValidVal(val.img);
            obj.sqft = this.getValidVal(val.sq_ft);
            obj.url = this.getValidVal(val.url);
            this.response.push(obj);
            this.validateResponse[key] = obj;
          }
        }
        let data1=dataSecond.items;
         for (let key of Object.keys(data1)) {
          console.log(key);
          if (this.validateResponse[key]) {
            console.error("Second Data:Skipping duplicate data, address already present");
          } else {
            let obj = <RealtyData>{};
            
            let val = data1[key];
            obj.address = this.getValidVal(val.address);
            obj.baths = this.getValidVal(val.baths);
            obj.beds = this.getValidVal(val.beds);
            obj.price = this.getValidVal(val.price);
            obj.img = this.getValidVal(val.thumb);
            obj.sqft = this.getValidVal(val.sqft);
            obj.url = this.getValidVal(val.url);
             obj.built = this.getValidVal(val.built);
            this.response.push(obj);
            this.validateResponse[key] = obj;
          }
        }
        this.response = this.sortAscJson(this.response, this.sortingVal);
        //console.log(this.response.);
      });
    });
  }

  getValidVal(input) {
    if (input) {
      return input;
    } else {
      return "";
    }
  }
  // this.http.get('../batManRealty.json').map((res: Response) => res.json()).subscribe(res => this.result = res);

  draw(index) {
    let draw = index % 2 === 0 ? true : false;
    return draw;
  }

  isEnabled(input: string) {
    if (this.sortingVal === input) {
      return true;
    } else {
      return false;
    }
  }

  clicked($event) {
    console.log($event.target.id);
    this.sortingVal = $event.target.id;
    this.response = this.sortAscJson(this.response, this.sortingVal);
  }

  sortAscJson(result, arg) {
    result.sort(function(o1, o2) {
      if (o1[arg] > o2[arg]) {
        return 1;
      } else if (o1[arg] < o2[arg]) {
        return -1;
      } else {
        return 0;
      }
    });
    return result;
  }
}

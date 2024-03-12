import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrl: './test1.component.css'
})
export class Test1Component {

  public data:any =[];
  public test1: FormGroup;

  constructor(private http: HttpClient) {
    this.getData();
    this.test1 = new FormGroup({
      type : new FormControl(null),
      balance : new FormControl(null)
    });
  }

  public getData() {
    this.http.get('http://localhost:3200/accounts').subscribe((reponse: any) => {
    this.data = reponse;
    })
  }
  
  public addData() {
    this.http.post('http://localhost:3200/accounts',this.test1.value).subscribe((response: any) => {
      this.getData();
    })
    this.test1.reset({});
  }

  public deleteData(value: number){
    this.http.delete('http://localhost:3200/accounts/'+value).subscribe((response: any) => {
      this.getData();
    })
  }

  public sortingData() {
    this.data.sort((x: any,y: any) => {((x.balance > y.balance)? 1 : (x.balance < y.balance)?-1 : 0)});
  }

}

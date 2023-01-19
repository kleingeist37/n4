import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SelectModel } from '../shared/interfaces/select-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  //durch api call ersetzen
  private selectValues = [
    {name : "Monkey", value: "0"},
    {name : "Dog", value: "1"},
    {name : "Cat", value: "2"},
    {name : "Horse", value: "3"},
    {name : "Pig", value: "4"},

  ];

  public selectValues$ = new BehaviorSubject<SelectModel[]>(this.selectValues); 


  // public emitSelection(selectedValues : string[]){
  //   console.log("Fancy Api Call");
  // }
}

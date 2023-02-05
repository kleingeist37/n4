import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from './services/supplier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'n4';

  customOptions: any;

  asyncOptions = this.supplierService.getAnimals();

  constructor(private supplierService: SupplierService){

  }

  showOptions (){
    console.log(this.customOptions);
  }
  ngOnInit(): void {
    this.supplierService.getAnimals().subscribe(data => 
      this.customOptions = data)
  }

  
  
  
}

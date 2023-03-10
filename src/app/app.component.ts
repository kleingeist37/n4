import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { SupplierService } from './services/supplier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'n4';

  customOptions: any;


  public activeClass = 'active';

  public debugArray: {value: string, link: string,  params?: {id: string}}[] = [
    {value: 'main1', link: 'main1',},
    {value: 'main2', link: 'main2',},
    {value: '1', link: 'main2', params: {id: '1'},},
    {value: '2', link: 'main2', params: {id: '2'},},
    {value: '3', link: 'main2', params: {id: '3'},},
    {value: '4', link: 'main2', params: {id: '4'},},
    {value: '5', link: 'main2', params: {id: '5'},},
  ]

  asyncOptions = this.supplierService.getAnimals();

  constructor(private supplierService: SupplierService, private router: Router){

  }

  showOptions (){
    console.log(this.customOptions);
  }
  ngOnInit(): void {
    this.supplierService.getAnimals().subscribe(data => 
      this.customOptions = data)
  }

  public gotoSite(id: string) {

    const params = {
      queryParams: { id: id },
      routerLinkActive: 'active'
    };

    this.router.navigate(['/main2'], params);
  }

  
  
  
}

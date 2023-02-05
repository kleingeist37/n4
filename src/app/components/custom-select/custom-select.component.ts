import { M } from '@angular/cdk/keycodes';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { isObservable, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit,OnDestroy {

  @Input('input') options : any;

  @Input('asyncInput') asyncOptions!: Observable<any>;
  @Input('asyncTargetProp') targetProperty : string = "";   //string analyzer?? 
  @Input('splitString') splitString: string = "";

  @Input('multiSelect') allowMultiSelect : boolean = false;

  private sub!: Subscription;

  private selectedOptions : string[] = [];


  private hasAnalyzed = false;

  constructor() { }
  ngOnDestroy(): void {
    if(this.sub != undefined)
      this.sub.unsubscribe();

  }

  ngOnInit(): void {
    if(isObservable(this.asyncOptions)){
      this.sub = this.asyncOptions.subscribe((data : any) =>{

        if(this.targetProperty.length > 0){
          //analyze object here
          //if string -> convert object wie in first draft ...
          //for debugPurposes      

          this.options = data; //[this.targetProperty];
          //then add data ...
        }
        else{
          this.observableHandler(data);
        }
         
      })
    }else {
      if(this.targetProperty.length > 0){
        this.options = this.options; //[this.targetProperty];
      }
    }
  }

  //change observable stuff to analyze splitstring
  private analyzeString(){
    // this.options = this.options[0]; //debug
    console.log(this.options);
    let splitted = this.splitString.split('.');

    if(splitted.length <= 1){
      console.log("no deepString found");
      return;
    }


    this.targetProperty = splitted[splitted.length - 1];
    console.log("target: " + this.targetProperty);
    splitted.splice(splitted.length - 1, 1);
    console.log(splitted);
    let newValue = this.options[0];
    for(let i = 0; i < splitted.length; i++){   
      console.log(i);  
      console.log(newValue);
      newValue = this.propertyRaid(newValue, splitted[i]);
    }
   
     this.options = newValue;
     console.log(this.options);
    this.hasAnalyzed = true;
  }

  private propertyRaid(obj: any, property: string) : any {
    console.log(property + " " + obj[property]);
    return obj[property];
  }

  public selected(option : any){
    // if(!this.allowMultiSelect && this.selectedOptions.includes(option)){
    //   this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
    // }
    // else {
    //   this.selectedOptions.push(option);
    // }
    if(!this.hasAnalyzed)
      this.analyzeString();
    //console.log(this.selectedOptions);
  }
  

  private observableHandler(data : any){
    this.options = data;
    //analyze and test
    
  }

}



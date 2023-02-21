import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.scss']
})
export class Main2Component implements OnInit {


  public id : string = "";

  private sub!: Subscription
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.queryParams.subscribe(x => {
      this.id = x['id'];
    })
  }

}

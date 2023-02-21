import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main1Component } from './components/main1/main1.component';
import { Main2Component } from './components/main2/main2.component';

const routes: Routes = [
  {
    path: "main1",
    component: Main1Component
  },
  {
    path: "main2",
    component: Main2Component
  },
  {
    path: "main2/:id",
    component: Main2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

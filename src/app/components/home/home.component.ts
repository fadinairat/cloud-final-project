import { Component, OnInit } from '@angular/core';


export class extData {
    constructor(public data: [string]){}
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  constructor(){
  }

  ngOnInit(): void {
     
  }    

}

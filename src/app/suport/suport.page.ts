import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-suport',
  templateUrl: './suport.page.html',
  styleUrls: ['./suport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SuportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

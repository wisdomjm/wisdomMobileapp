import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref, Router } from '@angular/router';

@Component({
  selector: 'app-showcurse',
  templateUrl: './showcurse.page.html',
  styleUrls: ['./showcurse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref]
})
export class ShowcursePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

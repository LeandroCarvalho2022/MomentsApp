import { Component } from '@angular/core';

import { RouterModule, Routes, Router  } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private router:Router){}
}

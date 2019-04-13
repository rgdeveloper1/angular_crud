import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoadingIndicatior = false;
  constructor(private router: Router) {
    this.router.events.subscribe(
      (routerEvent) => {
        if (routerEvent instanceof NavigationStart) {
          this.showLoadingIndicatior = true;
        } if (routerEvent instanceof NavigationEnd) {
          this.showLoadingIndicatior = false;
        }
      }
    );
  }
}

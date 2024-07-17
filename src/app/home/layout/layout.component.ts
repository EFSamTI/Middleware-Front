import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', 'login');
    document.documentElement.setAttribute('data-layout', 'horizontal');
    // document.documentElement.setAttribute('data-sidebar', 'dark');
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.documentElement.setAttribute('data-layout-width', 'fluid');
    // document.documentElement.setAttribute('data-sidebar-image', 'none');
    // document.documentElement.setAttribute('data-sidebar-size', 'lg');
    document.documentElement.setAttribute('data-layout-position', 'fixed');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-topbar', 'light');
    // document.documentElement.setAttribute('data-preloader', 'disable');
    // document.body.classList.remove('vertical-sidebar-enable');

    this.router.events.subscribe((event: any) => {
      if (document.documentElement.getAttribute('data-preloader') == 'enable') {
        if (event instanceof NavigationEnd) {
          // Update the attribute state based on the current route or any other conditions
          if (event.url !== '/disabled-route') {
            document.documentElement.setAttribute('data-preloader', 'enable');
            setTimeout(() => {
              document.documentElement.setAttribute('data-preloader', 'disable');
            }, 1000);
          } else {
            document.documentElement.setAttribute('data-preloader', 'disable');
          }
        }
      } else {
        document.documentElement.setAttribute('data-preloader', 'disable');
      }
    });

    window.addEventListener('resize', function () {
      if (document.documentElement.clientWidth <= 767) {
        document.documentElement.setAttribute('data-sidebar-size', '');
        document.querySelector('.hamburger-icon')?.classList.add('open')
      } else if (document.documentElement.clientWidth <= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
        document.querySelector('.hamburger-icon')?.classList.add('open')
      } else if (document.documentElement.clientWidth >= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
        document.querySelector('.hamburger-icon')?.classList.remove('open')
      }
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  // windowScroll() {
  //   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
  //     (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
  //     document.getElementById('page-topbar')?.classList.add('topbar-shadow')
  //   } else {
  //     (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
  //     document.getElementById('page-topbar')?.classList.remove('topbar-shadow')
  //   }
  // }
}

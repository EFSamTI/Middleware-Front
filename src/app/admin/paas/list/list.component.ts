import { Component } from '@angular/core';
import { AnimationLoader, AnimationOptions, provideLottieOptions } from 'ngx-lottie';
import { catchError } from 'rxjs';
import { RestAPIService } from 'src/app/core/services/rest.api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web')
    }),
    AnimationLoader
  ]
})
export class ListComponent {
  genericList?: any[];
  businessOneList?: any[];
  animationOptions: AnimationOptions = {
    path: '/assets/animations/CardSkeleton.json'
  };

  constructor(
    // private router: Router,
    private rest: RestAPIService) { }

  ngOnInit(): void {
    this.rest.retrieveGenericList()
      .pipe(catchError(this.rest.handleError))
      .subscribe(x => {
        this.genericList = x;
      });

    this.rest.retrieveBusinessOneList()
      .pipe(catchError(this.rest.handleError))
      .subscribe(x => {
        this.businessOneList = x;
      });
  }

  get options() {
    return { horizontalOrder: true };
  }

  // createBusinessOne() {
  //   this.router.navigate(['business-one']);
  // }

}

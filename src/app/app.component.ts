import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserIdleService } from 'angular-user-idle';
import { AuthenticationService } from './core/services/authentication';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'middleware-admin';
  destroyRef = inject(DestroyRef);

  constructor(
    private authenticationService: AuthenticationService,
    private idleService: UserIdleService
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.idleService.startWatching();
      this.idleService
        .onTimerStart()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();

      this.idleService
        .onTimeout()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.authenticationService.logout();
          this.idleService.resetTimer();
        });
    }
  }
}

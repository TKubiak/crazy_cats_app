import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { ROUTING_PARAMS } from 'src/app/consts/routing-params';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return of(this.authService.isAuthenticated()).pipe(
      tap((hasAccess: boolean) => {
        if (!hasAccess) {
          this.router.navigate([ROUTING_PARAMS.SIGN_IN.url]).then();
        }
      })
    );
  }
}

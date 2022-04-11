import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { RoutingParams, ROUTING_PARAMS } from '@app/consts/routing-params';
import { AuthService, User } from '../_service/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public user: User = {} as User;

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  public signIn(): void {
    this.authService.signIn()
  }
}

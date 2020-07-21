import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserAuthorized, UserAuthorized } from 'app/shared/model/user-authorized.model';
import { UserAuthorizedService } from './user-authorized.service';
import { UserAuthorizedComponent } from './user-authorized.component';
import { UserAuthorizedDetailComponent } from './user-authorized-detail.component';
import { UserAuthorizedUpdateComponent } from './user-authorized-update.component';

@Injectable({ providedIn: 'root' })
export class UserAuthorizedResolve implements Resolve<IUserAuthorized> {
  constructor(private service: UserAuthorizedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserAuthorized> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userAuthorized: HttpResponse<UserAuthorized>) => {
          if (userAuthorized.body) {
            return of(userAuthorized.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserAuthorized());
  }
}

export const userAuthorizedRoute: Routes = [
  {
    path: '',
    component: UserAuthorizedComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.userAuthorized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserAuthorizedDetailComponent,
    resolve: {
      userAuthorized: UserAuthorizedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.userAuthorized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserAuthorizedUpdateComponent,
    resolve: {
      userAuthorized: UserAuthorizedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.userAuthorized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserAuthorizedUpdateComponent,
    resolve: {
      userAuthorized: UserAuthorizedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.userAuthorized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

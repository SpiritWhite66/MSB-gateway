import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAlias, Alias } from 'app/shared/model/alias.model';
import { AliasService } from './alias.service';
import { AliasComponent } from './alias.component';
import { AliasDetailComponent } from './alias-detail.component';
import { AliasUpdateComponent } from './alias-update.component';

@Injectable({ providedIn: 'root' })
export class AliasResolve implements Resolve<IAlias> {
  constructor(private service: AliasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlias> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((alias: HttpResponse<Alias>) => {
          if (alias.body) {
            return of(alias.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Alias());
  }
}

export const aliasRoute: Routes = [
  {
    path: '',
    component: AliasComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.alias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AliasDetailComponent,
    resolve: {
      alias: AliasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.alias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AliasUpdateComponent,
    resolve: {
      alias: AliasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.alias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AliasUpdateComponent,
    resolve: {
      alias: AliasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.alias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

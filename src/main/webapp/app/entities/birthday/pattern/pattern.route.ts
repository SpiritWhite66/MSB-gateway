import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPattern, Pattern } from 'app/shared/model/birthday/pattern.model';
import { PatternService } from './pattern.service';
import { PatternComponent } from './pattern.component';
import { PatternDetailComponent } from './pattern-detail.component';
import { PatternUpdateComponent } from './pattern-update.component';

@Injectable({ providedIn: 'root' })
export class PatternResolve implements Resolve<IPattern> {
  constructor(private service: PatternService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPattern> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pattern: HttpResponse<Pattern>) => {
          if (pattern.body) {
            return of(pattern.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pattern());
  }
}

export const patternRoute: Routes = [
  {
    path: '',
    component: PatternComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.birthdayPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PatternDetailComponent,
    resolve: {
      pattern: PatternResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.birthdayPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PatternUpdateComponent,
    resolve: {
      pattern: PatternResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.birthdayPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PatternUpdateComponent,
    resolve: {
      pattern: PatternResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.birthdayPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

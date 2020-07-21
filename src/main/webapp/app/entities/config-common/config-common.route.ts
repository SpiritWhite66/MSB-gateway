import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConfigCommon, ConfigCommon } from 'app/shared/model/config-common.model';
import { ConfigCommonService } from './config-common.service';
import { ConfigCommonComponent } from './config-common.component';
import { ConfigCommonDetailComponent } from './config-common-detail.component';
import { ConfigCommonUpdateComponent } from './config-common-update.component';

@Injectable({ providedIn: 'root' })
export class ConfigCommonResolve implements Resolve<IConfigCommon> {
  constructor(private service: ConfigCommonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConfigCommon> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((configCommon: HttpResponse<ConfigCommon>) => {
          if (configCommon.body) {
            return of(configCommon.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConfigCommon());
  }
}

export const configCommonRoute: Routes = [
  {
    path: '',
    component: ConfigCommonComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.configCommon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConfigCommonDetailComponent,
    resolve: {
      configCommon: ConfigCommonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.configCommon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConfigCommonUpdateComponent,
    resolve: {
      configCommon: ConfigCommonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.configCommon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConfigCommonUpdateComponent,
    resolve: {
      configCommon: ConfigCommonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.configCommon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChannelLinked, ChannelLinked } from 'app/shared/model/channel-linked.model';
import { ChannelLinkedService } from './channel-linked.service';
import { ChannelLinkedComponent } from './channel-linked.component';
import { ChannelLinkedDetailComponent } from './channel-linked-detail.component';
import { ChannelLinkedUpdateComponent } from './channel-linked-update.component';

@Injectable({ providedIn: 'root' })
export class ChannelLinkedResolve implements Resolve<IChannelLinked> {
  constructor(private service: ChannelLinkedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChannelLinked> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((channelLinked: HttpResponse<ChannelLinked>) => {
          if (channelLinked.body) {
            return of(channelLinked.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChannelLinked());
  }
}

export const channelLinkedRoute: Routes = [
  {
    path: '',
    component: ChannelLinkedComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.channelLinked.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChannelLinkedDetailComponent,
    resolve: {
      channelLinked: ChannelLinkedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.channelLinked.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChannelLinkedUpdateComponent,
    resolve: {
      channelLinked: ChannelLinkedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.channelLinked.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChannelLinkedUpdateComponent,
    resolve: {
      channelLinked: ChannelLinkedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.channelLinked.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

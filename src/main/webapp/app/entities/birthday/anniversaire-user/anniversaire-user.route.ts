import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { Anniversaire, IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AnniversaireComponent } from './anniversaire-user.component';
import { AnniversaireService } from './anniversaire-user.service';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';

@Injectable({ providedIn: 'root' })
export class AnniversaireUserResolve implements Resolve<IAnniversaire> {
  constructor(private service: AnniversaireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnniversaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((anniversaire: HttpResponse<Anniversaire>) => {
          if (anniversaire.body) {
            return of(anniversaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Anniversaire());
  }
}

@Injectable({ providedIn: 'root' })
export class AnniversairesUserByDiscordResolve implements Resolve<IAnniversaire[]> {
  constructor(private service: AnniversaireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnniversaire[]> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.findByIdGuildServer(id).pipe(
        flatMap((liste: HttpResponse<IAnniversaire[]>) => {
          if (liste.body) {
            return of(liste.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of([]);
  }
}

export const anniversaireUserRoute: Routes = [
  {
    path: 'discord/:id',
    component: AnniversaireComponent,
    resolve: {
      anniversaire: AnniversairesUserByDiscordResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.birthdayAnniversaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

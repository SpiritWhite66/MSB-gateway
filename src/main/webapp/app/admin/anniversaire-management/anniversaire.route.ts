import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAnniversaire, Anniversaire } from 'app/shared/model/birthday/anniversaire.model';
import { AnniversaireService } from './anniversaire.service';
import { AnniversaireComponent } from './anniversaire.component';
import { AnniversaireDetailComponent } from './anniversaire-detail.component';
import { AnniversaireUpdateComponent } from './anniversaire-update.component';

@Injectable({ providedIn: 'root' })
export class AnniversaireResolve implements Resolve<IAnniversaire> {
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
export class AnniversairesByDiscordResolve implements Resolve<IAnniversaire[]> {
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

export const anniversaireRoute: Routes = [
  {
    path: '',
    component: AnniversaireComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.birthdayAnniversaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnniversaireDetailComponent,
    resolve: {
      anniversaire: AnniversaireResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.birthdayAnniversaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'discord/:id',
    component: AnniversaireComponent,
    resolve: {
      anniversaire: AnniversairesByDiscordResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.birthdayAnniversaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnniversaireUpdateComponent,
    resolve: {
      anniversaire: AnniversaireResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.birthdayAnniversaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnniversaireUpdateComponent,
    resolve: {
      anniversaire: AnniversaireResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.birthdayAnniversaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

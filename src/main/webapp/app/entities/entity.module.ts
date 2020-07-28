import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'anniversaire',
        loadChildren: () => import('./birthday/anniversaire/anniversaire.module').then(m => m.BirthdayAnniversaireModule),
      },
      {
        path: 'scheduler',
        loadChildren: () => import('./birthday/scheduler/scheduler.module').then(m => m.BirthdaySchedulerModule),
      },
      {
        path: 'pattern',
        loadChildren: () => import('./birthday/pattern/pattern.module').then(m => m.BirthdayPatternModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}

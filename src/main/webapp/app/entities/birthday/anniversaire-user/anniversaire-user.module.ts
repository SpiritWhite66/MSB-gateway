import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnniversaireComponent } from './anniversaire-user.component';
import { AnniversaireUserDeleteDialogComponent } from './anniversaire-user-delete-dialog.component';
import { AnniversaireSchedulerComponent } from './anniversaire-scheduler.component';
import { anniversaireUserRoute } from './anniversaire-user.route';
import { GatewaySharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(anniversaireUserRoute)],
  declarations: [AnniversaireComponent, AnniversaireUserDeleteDialogComponent, AnniversaireSchedulerComponent],
  entryComponents: [AnniversaireUserDeleteDialogComponent],
})
export class BirthdayAnniversaireUserModule {}

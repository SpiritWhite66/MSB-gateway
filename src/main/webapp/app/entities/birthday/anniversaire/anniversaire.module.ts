import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AnniversaireComponent } from './anniversaire.component';
import { AnniversaireDetailComponent } from './anniversaire-detail.component';
import { AnniversaireUpdateComponent } from './anniversaire-update.component';
import { AnniversaireDeleteDialogComponent } from './anniversaire-delete-dialog.component';
import { anniversaireRoute } from './anniversaire.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(anniversaireRoute)],
  declarations: [AnniversaireComponent, AnniversaireDetailComponent, AnniversaireUpdateComponent, AnniversaireDeleteDialogComponent],
  entryComponents: [AnniversaireDeleteDialogComponent],
})
export class BirthdayAnniversaireModule {}

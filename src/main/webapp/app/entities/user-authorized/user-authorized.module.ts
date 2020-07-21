import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { UserAuthorizedComponent } from './user-authorized.component';
import { UserAuthorizedDetailComponent } from './user-authorized-detail.component';
import { UserAuthorizedUpdateComponent } from './user-authorized-update.component';
import { UserAuthorizedDeleteDialogComponent } from './user-authorized-delete-dialog.component';
import { userAuthorizedRoute } from './user-authorized.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(userAuthorizedRoute)],
  declarations: [
    UserAuthorizedComponent,
    UserAuthorizedDetailComponent,
    UserAuthorizedUpdateComponent,
    UserAuthorizedDeleteDialogComponent,
  ],
  entryComponents: [UserAuthorizedDeleteDialogComponent],
})
export class GatewayUserAuthorizedModule {}

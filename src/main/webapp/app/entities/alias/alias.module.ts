import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AliasComponent } from './alias.component';
import { AliasDetailComponent } from './alias-detail.component';
import { AliasUpdateComponent } from './alias-update.component';
import { AliasDeleteDialogComponent } from './alias-delete-dialog.component';
import { aliasRoute } from './alias.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(aliasRoute)],
  declarations: [AliasComponent, AliasDetailComponent, AliasUpdateComponent, AliasDeleteDialogComponent],
  entryComponents: [AliasDeleteDialogComponent],
})
export class GatewayAliasModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ConfigCommonComponent } from './config-common.component';
import { ConfigCommonDetailComponent } from './config-common-detail.component';
import { ConfigCommonUpdateComponent } from './config-common-update.component';
import { ConfigCommonDeleteDialogComponent } from './config-common-delete-dialog.component';
import { configCommonRoute } from './config-common.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(configCommonRoute)],
  declarations: [ConfigCommonComponent, ConfigCommonDetailComponent, ConfigCommonUpdateComponent, ConfigCommonDeleteDialogComponent],
  entryComponents: [ConfigCommonDeleteDialogComponent],
})
export class GatewayConfigCommonModule {}

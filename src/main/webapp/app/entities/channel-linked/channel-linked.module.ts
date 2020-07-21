import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ChannelLinkedComponent } from './channel-linked.component';
import { ChannelLinkedDetailComponent } from './channel-linked-detail.component';
import { ChannelLinkedUpdateComponent } from './channel-linked-update.component';
import { ChannelLinkedDeleteDialogComponent } from './channel-linked-delete-dialog.component';
import { channelLinkedRoute } from './channel-linked.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(channelLinkedRoute)],
  declarations: [ChannelLinkedComponent, ChannelLinkedDetailComponent, ChannelLinkedUpdateComponent, ChannelLinkedDeleteDialogComponent],
  entryComponents: [ChannelLinkedDeleteDialogComponent],
})
export class GatewayChannelLinkedModule {}

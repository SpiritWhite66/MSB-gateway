import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SchedulerComponent } from './scheduler.component';
import { SchedulerDetailComponent } from './scheduler-detail.component';
import { SchedulerUpdateComponent } from './scheduler-update.component';
import { SchedulerDeleteDialogComponent } from './scheduler-delete-dialog.component';
import { schedulerRoute } from './scheduler.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(schedulerRoute)],
  declarations: [SchedulerComponent, SchedulerDetailComponent, SchedulerUpdateComponent, SchedulerDeleteDialogComponent],
  entryComponents: [SchedulerDeleteDialogComponent],
})
export class BirthdaySchedulerModule {}

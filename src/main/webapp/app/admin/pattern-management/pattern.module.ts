import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PatternComponent } from './pattern.component';
import { PatternDetailComponent } from './pattern-detail.component';
import { PatternUpdateComponent } from './pattern-update.component';
import { PatternDeleteDialogComponent } from './pattern-delete-dialog.component';
import { patternRoute } from './pattern.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(patternRoute)],
  declarations: [PatternComponent, PatternDetailComponent, PatternUpdateComponent, PatternDeleteDialogComponent],
  entryComponents: [PatternDeleteDialogComponent],
})
export class BirthdayPatternModule {}

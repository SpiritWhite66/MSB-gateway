import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'config-common',
        loadChildren: () => import('./config-common/config-common.module').then(m => m.GatewayConfigCommonModule),
      },
      {
        path: 'channel-linked',
        loadChildren: () => import('./channel-linked/channel-linked.module').then(m => m.GatewayChannelLinkedModule),
      },
      {
        path: 'user-authorized',
        loadChildren: () => import('./user-authorized/user-authorized.module').then(m => m.GatewayUserAuthorizedModule),
      },
      {
        path: 'alias',
        loadChildren: () => import('./alias/alias.module').then(m => m.GatewayAliasModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.GatewayRoleModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}

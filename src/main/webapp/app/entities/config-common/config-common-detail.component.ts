import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConfigCommon } from 'app/shared/model/config-common.model';

@Component({
  selector: 'jhi-config-common-detail',
  templateUrl: './config-common-detail.component.html',
})
export class ConfigCommonDetailComponent implements OnInit {
  configCommon: IConfigCommon | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ configCommon }) => (this.configCommon = configCommon));
  }

  previousState(): void {
    window.history.back();
  }
}

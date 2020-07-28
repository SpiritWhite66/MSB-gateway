import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';

@Component({
  selector: 'jhi-anniversaire-detail',
  templateUrl: './anniversaire-detail.component.html',
})
export class AnniversaireDetailComponent implements OnInit {
  anniversaire: IAnniversaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anniversaire }) => (this.anniversaire = anniversaire));
  }

  previousState(): void {
    window.history.back();
  }
}

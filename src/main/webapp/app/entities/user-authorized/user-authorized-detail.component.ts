import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAuthorized } from 'app/shared/model/user-authorized.model';

@Component({
  selector: 'jhi-user-authorized-detail',
  templateUrl: './user-authorized-detail.component.html',
})
export class UserAuthorizedDetailComponent implements OnInit {
  userAuthorized: IUserAuthorized | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAuthorized }) => (this.userAuthorized = userAuthorized));
  }

  previousState(): void {
    window.history.back();
  }
}

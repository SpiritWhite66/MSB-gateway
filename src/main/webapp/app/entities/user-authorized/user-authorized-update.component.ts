import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserAuthorized, UserAuthorized } from 'app/shared/model/user-authorized.model';
import { UserAuthorizedService } from './user-authorized.service';

@Component({
  selector: 'jhi-user-authorized-update',
  templateUrl: './user-authorized-update.component.html',
})
export class UserAuthorizedUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    user: [null, [Validators.required]],
    idDiscord: [null, [Validators.required]],
  });

  constructor(protected userAuthorizedService: UserAuthorizedService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAuthorized }) => {
      this.updateForm(userAuthorized);
    });
  }

  updateForm(userAuthorized: IUserAuthorized): void {
    this.editForm.patchValue({
      id: userAuthorized.id,
      user: userAuthorized.user,
      idDiscord: userAuthorized.idDiscord,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAuthorized = this.createFromForm();
    if (userAuthorized.id !== undefined) {
      this.subscribeToSaveResponse(this.userAuthorizedService.update(userAuthorized));
    } else {
      this.subscribeToSaveResponse(this.userAuthorizedService.create(userAuthorized));
    }
  }

  private createFromForm(): IUserAuthorized {
    return {
      ...new UserAuthorized(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      idDiscord: this.editForm.get(['idDiscord'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAuthorized>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

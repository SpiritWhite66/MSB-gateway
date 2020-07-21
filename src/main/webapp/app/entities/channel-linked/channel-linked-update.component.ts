import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChannelLinked, ChannelLinked } from 'app/shared/model/channel-linked.model';
import { ChannelLinkedService } from './channel-linked.service';

@Component({
  selector: 'jhi-channel-linked-update',
  templateUrl: './channel-linked-update.component.html',
})
export class ChannelLinkedUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    idChannel: [],
  });

  constructor(protected channelLinkedService: ChannelLinkedService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ channelLinked }) => {
      this.updateForm(channelLinked);
    });
  }

  updateForm(channelLinked: IChannelLinked): void {
    this.editForm.patchValue({
      id: channelLinked.id,
      name: channelLinked.name,
      idChannel: channelLinked.idChannel,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const channelLinked = this.createFromForm();
    if (channelLinked.id !== undefined) {
      this.subscribeToSaveResponse(this.channelLinkedService.update(channelLinked));
    } else {
      this.subscribeToSaveResponse(this.channelLinkedService.create(channelLinked));
    }
  }

  private createFromForm(): IChannelLinked {
    return {
      ...new ChannelLinked(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      idChannel: this.editForm.get(['idChannel'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChannelLinked>>): void {
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

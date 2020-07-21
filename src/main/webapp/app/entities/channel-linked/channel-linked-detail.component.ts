import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChannelLinked } from 'app/shared/model/channel-linked.model';

@Component({
  selector: 'jhi-channel-linked-detail',
  templateUrl: './channel-linked-detail.component.html',
})
export class ChannelLinkedDetailComponent implements OnInit {
  channelLinked: IChannelLinked | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ channelLinked }) => (this.channelLinked = channelLinked));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPattern } from 'app/shared/model/birthday/pattern.model';

@Component({
  selector: 'jhi-pattern-detail',
  templateUrl: './pattern-detail.component.html',
})
export class PatternDetailComponent implements OnInit {
  pattern: IPattern | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pattern }) => (this.pattern = pattern));
  }

  previousState(): void {
    window.history.back();
  }
}

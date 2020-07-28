import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PatternDetailComponent } from 'app/entities/birthday/pattern/pattern-detail.component';
import { Pattern } from 'app/shared/model/birthday/pattern.model';

describe('Component Tests', () => {
  describe('Pattern Management Detail Component', () => {
    let comp: PatternDetailComponent;
    let fixture: ComponentFixture<PatternDetailComponent>;
    const route = ({ data: of({ pattern: new Pattern(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PatternDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PatternDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PatternDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pattern on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pattern).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

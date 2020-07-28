import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PatternComponent } from 'app/entities/birthday/pattern/pattern.component';
import { PatternService } from 'app/entities/birthday/pattern/pattern.service';
import { Pattern } from 'app/shared/model/birthday/pattern.model';

describe('Component Tests', () => {
  describe('Pattern Management Component', () => {
    let comp: PatternComponent;
    let fixture: ComponentFixture<PatternComponent>;
    let service: PatternService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PatternComponent],
      })
        .overrideTemplate(PatternComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PatternComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatternService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pattern(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.patterns && comp.patterns[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

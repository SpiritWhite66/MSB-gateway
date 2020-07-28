import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { AnniversaireComponent } from 'app/entities/birthday/anniversaire/anniversaire.component';
import { AnniversaireService } from 'app/entities/birthday/anniversaire/anniversaire.service';
import { Anniversaire } from 'app/shared/model/birthday/anniversaire.model';

describe('Component Tests', () => {
  describe('Anniversaire Management Component', () => {
    let comp: AnniversaireComponent;
    let fixture: ComponentFixture<AnniversaireComponent>;
    let service: AnniversaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnniversaireComponent],
      })
        .overrideTemplate(AnniversaireComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnniversaireComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnniversaireService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Anniversaire(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.anniversaires && comp.anniversaires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnniversaireDetailComponent } from 'app/entities/birthday/anniversaire/anniversaire-detail.component';
import { Anniversaire } from 'app/shared/model/birthday/anniversaire.model';

describe('Component Tests', () => {
  describe('Anniversaire Management Detail Component', () => {
    let comp: AnniversaireDetailComponent;
    let fixture: ComponentFixture<AnniversaireDetailComponent>;
    const route = ({ data: of({ anniversaire: new Anniversaire(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnniversaireDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AnniversaireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnniversaireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load anniversaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.anniversaire).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

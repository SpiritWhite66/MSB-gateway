import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { AliasDetailComponent } from 'app/entities/alias/alias-detail.component';
import { Alias } from 'app/shared/model/alias.model';

describe('Component Tests', () => {
  describe('Alias Management Detail Component', () => {
    let comp: AliasDetailComponent;
    let fixture: ComponentFixture<AliasDetailComponent>;
    const route = ({ data: of({ alias: new Alias(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AliasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AliasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AliasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load alias on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alias).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

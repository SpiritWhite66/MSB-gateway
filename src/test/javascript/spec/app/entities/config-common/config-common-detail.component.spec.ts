import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ConfigCommonDetailComponent } from 'app/entities/config-common/config-common-detail.component';
import { ConfigCommon } from 'app/shared/model/config-common.model';

describe('Component Tests', () => {
  describe('ConfigCommon Management Detail Component', () => {
    let comp: ConfigCommonDetailComponent;
    let fixture: ComponentFixture<ConfigCommonDetailComponent>;
    const route = ({ data: of({ configCommon: new ConfigCommon(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ConfigCommonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ConfigCommonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConfigCommonDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load configCommon on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.configCommon).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

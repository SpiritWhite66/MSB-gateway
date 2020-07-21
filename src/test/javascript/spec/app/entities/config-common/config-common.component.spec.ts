import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ConfigCommonComponent } from 'app/entities/config-common/config-common.component';
import { ConfigCommonService } from 'app/entities/config-common/config-common.service';
import { ConfigCommon } from 'app/shared/model/config-common.model';

describe('Component Tests', () => {
  describe('ConfigCommon Management Component', () => {
    let comp: ConfigCommonComponent;
    let fixture: ComponentFixture<ConfigCommonComponent>;
    let service: ConfigCommonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ConfigCommonComponent],
      })
        .overrideTemplate(ConfigCommonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConfigCommonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConfigCommonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ConfigCommon(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.configCommons && comp.configCommons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

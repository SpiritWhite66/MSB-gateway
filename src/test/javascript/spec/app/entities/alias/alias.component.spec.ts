import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { AliasComponent } from 'app/entities/alias/alias.component';
import { AliasService } from 'app/entities/alias/alias.service';
import { Alias } from 'app/shared/model/alias.model';

describe('Component Tests', () => {
  describe('Alias Management Component', () => {
    let comp: AliasComponent;
    let fixture: ComponentFixture<AliasComponent>;
    let service: AliasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AliasComponent],
      })
        .overrideTemplate(AliasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AliasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AliasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Alias(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.aliases && comp.aliases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

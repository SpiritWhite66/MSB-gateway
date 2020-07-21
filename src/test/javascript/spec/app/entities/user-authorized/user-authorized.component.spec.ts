import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { UserAuthorizedComponent } from 'app/entities/user-authorized/user-authorized.component';
import { UserAuthorizedService } from 'app/entities/user-authorized/user-authorized.service';
import { UserAuthorized } from 'app/shared/model/user-authorized.model';

describe('Component Tests', () => {
  describe('UserAuthorized Management Component', () => {
    let comp: UserAuthorizedComponent;
    let fixture: ComponentFixture<UserAuthorizedComponent>;
    let service: UserAuthorizedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserAuthorizedComponent],
      })
        .overrideTemplate(UserAuthorizedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserAuthorizedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserAuthorizedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserAuthorized(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userAuthorizeds && comp.userAuthorizeds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

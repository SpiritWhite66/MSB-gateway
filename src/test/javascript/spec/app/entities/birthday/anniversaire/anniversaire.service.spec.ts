import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AnniversaireService } from 'app/entities/birthday/anniversaire/anniversaire.service';
import { IAnniversaire, Anniversaire } from 'app/shared/model/birthday/anniversaire.model';

describe('Service Tests', () => {
  describe('Anniversaire Service', () => {
    let injector: TestBed;
    let service: AnniversaireService;
    let httpMock: HttpTestingController;
    let elemDefault: IAnniversaire;
    let expectedResult: IAnniversaire | IAnniversaire[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AnniversaireService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Anniversaire(0, 'AAAAAAA', 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateAnniversaire: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Anniversaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateAnniversaire: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAnniversaire: currentDate,
          },
          returnedFromService
        );

        service.create(new Anniversaire()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Anniversaire', () => {
        const returnedFromService = Object.assign(
          {
            idUser: 'BBBBBB',
            idGuildServer: 'BBBBBB',
            dateAnniversaire: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAnniversaire: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Anniversaire', () => {
        const returnedFromService = Object.assign(
          {
            idUser: 'BBBBBB',
            idGuildServer: 'BBBBBB',
            dateAnniversaire: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAnniversaire: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Anniversaire', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

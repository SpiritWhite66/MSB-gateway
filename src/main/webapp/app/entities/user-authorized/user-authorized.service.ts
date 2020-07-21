import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserAuthorized } from 'app/shared/model/user-authorized.model';

type EntityResponseType = HttpResponse<IUserAuthorized>;
type EntityArrayResponseType = HttpResponse<IUserAuthorized[]>;

@Injectable({ providedIn: 'root' })
export class UserAuthorizedService {
  public resourceUrl = SERVER_API_URL + 'api/user-authorizeds';

  constructor(protected http: HttpClient) {}

  create(userAuthorized: IUserAuthorized): Observable<EntityResponseType> {
    return this.http.post<IUserAuthorized>(this.resourceUrl, userAuthorized, { observe: 'response' });
  }

  update(userAuthorized: IUserAuthorized): Observable<EntityResponseType> {
    return this.http.put<IUserAuthorized>(this.resourceUrl, userAuthorized, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserAuthorized>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserAuthorized[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

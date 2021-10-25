import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IDesktopAppearanceResponse, IsubmittedCommentResponse } from '../modals/desktopAppearance';
import { getEntityData, sample } from '../mocks/lambda';
import { environment } from '../../environments/environment';
import { filter, map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DesktopAppearanceService {

  constructor(private http: HttpClient, private _cookieService:CookieService) { }

  private createRequestOptions() {
    let headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    return headers;
  }

  public authorizationHeader() {
    var header = {
      headers: new HttpHeaders().set('useridentifier', this._cookieService.get('userIdentifier'))
    }
    return header;
  }

  //storing user identifier and pictureId to allow user to comment only once and store it in db on submission.
  public protectAndCheckSinglePicSingleUserSingleComment(pictureId:string, protect:boolean = false) {  
    console.log("Authentication Check:",this._cookieService.get('userIdentifier').substring(0,this._cookieService.get('userIdentifier').indexOf('-')));
    if (!(this._cookieService.check('userIdentifier') && this._cookieService.get('userIdentifier').substring(0,this._cookieService.get('userIdentifier').indexOf('-')) === pictureId)){
      if(protect)
        this._cookieService.set('userIdentifier', pictureId.concat("-", uuidv4()));
      return true;
    }
    return false;
  }
  

  public getDesktopAppearanceOptions(pictureId: Params): Observable<IDesktopAppearanceResponse> {
    //opencomment: In case testing is needed from mock response.
    //return of(getEntityData.Items);
    return this.http.get<IDesktopAppearanceResponse>(environment.source + environment.desktopAppearanceOptionsEndpoint + pictureId, { headers: this.createRequestOptions() }).pipe(
      map((results) => {
        return results;
      })
    )
  }

  public addPublicAppearanceComments(commentData, location, pictureId):Observable<IsubmittedCommentResponse> {
    this.protectAndCheckSinglePicSingleUserSingleComment(pictureId,true)
    return this.http.post(environment.source + environment.openCommentEndpoint, { commentText: commentData, location: location, pictureId: pictureId },this.authorizationHeader()).pipe(
      map((response:IsubmittedCommentResponse) => {
          return response;
      })
    );
  }
}

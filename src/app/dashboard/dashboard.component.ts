import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDesktopAppearanceResponse,IsubmittedCommentResponse} from '../modals/desktopAppearance';
import { DesktopAppearanceService } from '../services/DesktopAppearanceService.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute, private _DesktopAppearanceService: DesktopAppearanceService,private _snackBar: MatSnackBar) { }
  public imageSourceAddress = environment.source + environment.lookmateImages;
  public profileImageSourceAddress = environment.source + environment.lookmateProfileImages;
  public screenPictureInfoObject:IDesktopAppearanceResponse
  public PictureId = "";
  public importedPictureId = "";
  public pictureComment:string;
  public pictureLoading = true;
  public profilePicture = "../../assets/image/lookmate-default-user-profile-pic.png"
  ngOnInit() {
    /* In case we get id from params */
    //this._Activatedroute.params.
    /* In case we get id from query params */
    this._Activatedroute.queryParams.
      pipe(
        mergeMap(pictureId => this._DesktopAppearanceService.getDesktopAppearanceOptions(pictureId.id))
      ).subscribe(pictureInfo => {
        this.pictureLoading = false;
        this.screenPictureInfoObject = pictureInfo;
        if(this.screenPictureInfoObject.pictureDetails?.user?.lastProfilePicId){
          this.profilePicture = this.profileImageSourceAddress + this.screenPictureInfoObject.pictureDetails.user.lastProfilePicId;
        }
        this.importedPictureId = this.screenPictureInfoObject.pictureDetails.picture.substring(this.screenPictureInfoObject.pictureDetails.picture.indexOf('_') + 1, this.screenPictureInfoObject.pictureDetails.picture.length - 4);
      },
      (error) => {
        this.pictureLoading = false;
      });
  }

  public submitComment() {
    if (this.pictureComment.length >= 1 && this.pictureComment.length <= environment.commentMaxLength && this.screenPictureInfoObject && this.screenPictureInfoObject.pictureDetails.picture) { 
      this._DesktopAppearanceService.addPublicAppearanceComments(this.pictureComment.toString(), "Location", this.importedPictureId).subscribe(responseComment => {
        if (responseComment)
          this._snackBar.open(responseComment.message, 'close', {
            duration: 3000
          });
      });
    } else {
      this._snackBar.open("You need to enter comment.", 'close', {
        duration: 3000
      });
    }
  }
}
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//todo: make two different file for prod and local and configuration on docker as well with argument like --prod.
export const environment = {
  production: false,
  source :"http://localhost:3000/",
  //source : "http://103.86.176.210:3000/",
  lookmateImages:"Images/",
  lookmateProfileImages:"ProfileImages/",
  desktopAppearanceOptionsEndpoint:"getDesktopDetails/",
  openCommentEndpoint:"addOpenComment",
  commentMaxLength:200,
  x_api_key:"xANjcUckKgavTQV1DabtX1cSNJMTuexu4WwECAg1"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

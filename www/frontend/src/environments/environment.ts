// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: "http://localhost:5050",
  firebaseConfig: {
    apiKey: "AIzaSyB58wgqynuuw9O-6YKFWVzlka1HNTnPcMc",
    authDomain: "coffeespot-de49e.firebaseapp.com",
    databaseURL: "https://coffeespot-de49e.firebaseio.com",
    projectId: "coffeespot-de49e",
    storageBucket: "coffeespot-de49e.appspot.com",
    messagingSenderId: "463580137428",
    appId: "1:463580137428:web:4f006bed94cf6c1439f841"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

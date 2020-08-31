# [Material Dashboard Angular - Free Bootstrap Material Design Admin](https://www.creative-tim.com/product/material-dashboard-angular2)[![version][version-badge]][CHANGELOG]

![Product Gif](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/material-dashboard-angular.gif)

**[Material Dashboard Angular](https://www.creative-tim.com/product/material-dashboard-angular2/)** is a free Material Bootstrap Admin with a fresh, new design inspired by Google's Material Design. We are very excited to introduce our take on the material concepts through an easy to use and beautiful set of components. Material Dashboard was built over the popular Bootstrap framework and it comes with a couple of third-party plugins redesigned to fit in with the rest of the elements.

Material Dashboard makes use of light, surface and movement. The general layout resembles sheets of paper following multiple different layers, so that the depth and order is obvious. The navigation stays mainly on the left sidebar and the content is on the right inside the main panel.

This product came as a result of users asking for a material dashboard after we released our successful [Material Kit](http://www.creative-tim.com/product/material-kit). We developed it based on your feedback and it is a powerful bootstrap admin dashboard, which allows you to build products like admin panels, content managements systems and CRMs.

Material Dashboard comes with 5 color filter choices for both the sidebar and the card headers (blue, green, orange, red and purple) and an option to have a background image on the sidebar.

Material Dashboard uses a framework built by our friend [Federico - Bootstrap Material Design](http://fezvrasta.github.io/bootstrap-material-design/), who did an amazing job creating the backbone for the material effects, animations, ripples and transitions. Big thanks to his team for the effort and forward thinking they put into it.

Special thanks go to:
[Robert McIntosh](https://github.com/mouse0270/bootstrap-notify) for the notification system.
[Chartist](https://gionkunz.github.io/chartist-js/) for the wonderful charts.
We are very excited to share this dashboard with you and we look forward to hearing your feedback!



### create environments

const web = 
window.location.hostname === 'admin.chacaitoba.com' ? 
'https://admin.chacaitoba.com': 
window.location.hostname === 'mesonero.chacaitoba.com' ? 
'https://mesonero.chacaitoba.com':
window.location.hostname === 'menu.chacaitoba.com' ? 
'https://menu.chacaitoba.com':
'https://chacaitobaires.web.app';

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "",
    authDomain: "project.firebaseapp.com",
    databaseURL: "project.firebaseio.com",
    projectId: "chacaitobaires-dev-api",
    storageBucket: "project.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  },
  versionCheckURL :  web+'/version.json',
  web: web,
  updateMinutes: 5,
  apiUrl: 'https://us-central1-project.cloudfunctions.net/api',
};

### hosting 
firebase deploy --only hosting:chacaitoba
firebase deploy --only hosting:chacaitoba-dev

### build to dev
npm run build-fire-dev

### build to prod
npm run build-fire-prod
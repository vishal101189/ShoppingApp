-To Create New Project in Angular>ng new APPNAME
-To Install Bootstrap>GOto that app>npm install --save bootstrap
-To Generate component with CLI(Without UTC) > ng g c ComponentName --skipTests true
-Debugging using sourceMap> Console>Sources>main.bundle.js>hit breakpoint on ur method it will automatically redirect to ur ts file.
OR Directly find ts file in developer tools:
sourceMap>webpack>.>src>app>ur ts file

-To Generate Directive>ng g d DirectiveName
-To update any packageversion> Change version in package.version file then>npm update

--For optimization purpose, Deploying our angular app need to use AOT(ahead of time compilation) instead of using JIT compilation(using ng serve cmd):
>ng build --prod(it will create files of ur project in dist folder) as it also reducess the size of the file
To Deployment:
-Also need to set environment variables in environment.prod.ts and environment.ts>then run> ng build --prod and then deploy it as a static file hosting in any server like IIS
In IIs we need to add web.config in src folder and need to add in assets prop of angular cli to replace in dist folder for prod.
One more thins to add in IIS need to url-rewritting extension in windows.

-For PreBuilt Component refer this site-https://material.angular.io/
-For Angular Bootstrap- ngx-bootstrap
-For notification- ngx-tostr
-For Loader- ngx-progess-bar

-To update package> ng update(for specific proj use >ng update @angular/core @angular/cli)
UserName for Shopping App: 
Pwd:

Usefule Links: https://academind.com/learn/our-courses
------------------------------------------------

NGRX:
-To install ngrx> npm install --save @ngrx/store
-To install ngrx effects> npm install @ngrx/effects --save
-TO install redux dev tools extension>https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
and then install in project>npm install -dev @ngrx/store-devtools --save
and to install router store> npm install @ngrx/router-store --save
-Advance features of ngrx plz refer this site- https://ngrx.io/
For Advance Features and Eg>https://github.com/ngrx/platform/tree/master/projects/example-app/src/app
-https://ngrx.io/docs
 
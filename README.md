# Workflow description
Keynotes:
* All development in `master` branch
* using semver https://semver.org/ (`breaking-changes`.`feature`.`bugfix`)
* Update `Model/Constants.cs` "rootDocPath" to match your root `img` folder

**Work plan (approximate)**
* v0.1.0 - ASP.NET Core API: endpoint for fetching folder hierarchy structure
* v0.2.0 - React.JS: three frames view skeleton with responsive design
* v0.3.0 - React.JS: fetch folders hierarchy data in json from backend and build UI tree in sidebar **We are here**
* v0.4.0 - ASP.NET Core API: fetch batch of thumbnails for images in specific folder
* v0.5.0 - ASP.NET Core API: fetch specific image
* v0.6.0 - React.JS: top frame images list with thumbnails
* v0.7.0 - React.JS: bottom frame - full-size images

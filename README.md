# Space Coast EVA Website

This is the project for the [Space Coast EVA
website](https://www.spacecoasteva.com), which is hosted on Google's
Firebase static hosting service.  The site is managed via the
spacecoasteva@gmail.com Google account.

The site is mostly static, consisting of a single HTML file, a CSS stylesheet
and a Javascript file, plus an additional CSS stylesheet and pair of
Javascript files for the slideshow, which are provided by an external project.
There is also a small calendar page that just wraps a frame populated by a
Google Calendar view of the group's meetings and events.

The non-static elements of the site are populated by Javascript code, which
pulls in the schedule of upcoming meetings and events, from Google Calendar.

## Getting Started

For modifying the site, you'll need the [Firebase CLI
tools](https://firebase.google.com/docs/cli), which will allow you to locally
test modifications to the site and, when ready, deploy them for the world to
see.

### Critical links and commands

Use NVM to install NodeJS (and NPM along with it), then use NPM to install the
Firebase CLI.  Clone the repository for the website, switch into it, login to
Firebase, connect to the project and start your work.  Fire up the emulator to
test, maybe deploy to a preview channel, and finally deploy the live site.

* NVM: https://github.com/nvm-sh/nvm
  * _Follow instructions in README_
  * nvm install node
  * npm install -g firebase-tools
* git clone git@github.com:bibach/sceva-site.git
  * cd sceva-site
* firebase login
  * firebase projects:list
* firebase use staging
  * firebase emulators:start
  * firebase hosting:channel:deploy preview-id
  * firebase deploy

## TODO

* Create Github account under SCEVA account, move repo there.

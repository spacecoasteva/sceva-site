# Space Coast EVA Website

This is the project for the [Space Coast EVA
website](https://spacecoasteva.club), which is hosted on Google's
[Firebase](https://firebase.google.com/) static hosting service.  The site is
managed via the spacecoasteva@gmail.com Google account.

The site is mostly static, consisting of a single HTML file, a CSS stylesheet,
a Javascript file and a handful of images.  The non-static elements of the site
are populated by Javascript code, which pulls in the schedule of meetings and
events from Google Calendar.  All of this content is managed in a
[repository hosted on GitHub](https://github.com/bibach/sceva-site).

An additional Javascript file, hosted on an external (CDN) site, allows users
to enter their email address to sign up for the club's email updates.  This
uses the [emailjs.com](https://emailjs.com) service to send an email to the
club's Gmail account, where it is automatically archived into a folder and
forwarded to the mailing list administrator.  This setup may be replaced,
in the future, with functionality provided by [MailChimp](https://mailchimp.com),
if the club decides to use that service.

## Getting Started

Managing a Firebase-hosted site generally requires use of the [Firebase CLI
tools](https://firebase.google.com/docs/cli), which allows local testing of
modifications to the site and, when ready, deploying them for the world to
see.  Details for how to get started and perform basic tasks are detailed in
the next section.

For ease of maintenance, however, the site's GitHub repository has been
configured with [GitHub Actions](https://docs.github.com/actions) that automate
updates to the Firebase site.  Changes to the site should be developed on a
branch.  A _pull request_ to merge the branch back to the "main" branch will
create a temporary _preview_ site - the link to which is provided in a comment
on the pull request.  When the changes have been verified, merging the branch
will deploy the changes to the live site.

### Critical Firebase CLI links and commands

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

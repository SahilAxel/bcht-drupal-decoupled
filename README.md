# Boston Childrens Hospital Trust

Drupal 10 setup for the Boston Childrens Hospital Trust website

## Tools & Prerequisites

The following tools are required for setting up the site. Ensure you are using the latest version or at least the minimum version mentioned below.

- [Docker](https://docs.docker.com/get-docker/) - v24.0.2
- [DDEV](https://ddev.readthedocs.io/en/stable/) - v1.22.7
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - v2.43.2
- [npm](https://www.npmjs.com/get-npm) - FE team to add the version
- [node](https://nodejs.org/en/download/) - FE team to add the version
- [gulp](https://github.com/axelerant-bluestate/ohchr/blob/devd9) - FE team to add the version

## Local Setup Instruction

1. Clone the repository from https://github.com/Specialist-Agencies/Blue-State-boston-childrens-hospital-trust
   `git clone git@github.com:Specialist-Agencies/Blue-State-boston-childrens-hospital-trust.git`

2. Confirm that you are on the main branch

```
git branch
git fetch --all
git checkout main
git pull origin main
```

3. Drupal setup - Start ddev

```
ddev composer install
ddev start
```

4. Import database

```
Import existing database dump file

Get the database dump file from the team member or server admin. Then run the below command to import the database

ddev import-db --file=<path-to-dump-file>
```

5. Update configuration

```
Add the following at the end on settings.ddev.php file. Get the auth_token from team member 
$config['lytics.settings']['apitoken'] = <auth_token>

Then run the below commands

ddev drush cim
ddev drush updb
ddev drush cr
```

5. Launch the Drupal site on browser
   `ddev launch`

6. Login as Drupal admin. Run below command & hit the one time URL in browser.
   `ddev drush uli`

## Gulp Compilation

1. cd into `web/themes/custom/bcht` and then Run the below command to compile the scss files
2. `npm install`
3. `gulp` (build)
4. `gulp watch` (to watch the changes)

## Git Workflow

1. In order to create a feature branch, pull the latest changes of the `main` branch and use the latest code of the `main` branch to create the feature branch:
```
$ git checkout main
$ git fetch origin
$ git rebase origin/main
```
2. Create the feature branch using the ticket number of the task ticket, e.g if the ticket ID is BCHT-1 then name the feature branch name as `BCHT-1` :
```
$ git checkout -b BCHT-1
```
Note: kindly avoid using the user story number for feature branch, unless we do not have any task ticket for the user story.
3. While adding or pushing a commit, make sure the git commit message is prefixed with the ticket key (e.g `BCHT-1:`) and includes details of the changes made:
```
$ git status
$ git add [files]
$ git commit -m "BCHT-1: Created the Generic Page details content type."
$ git push origin BCHT-1
```
4. Make sure to rebase your feature branch with latest code of the `main` branch always before raising the pull request.
5. Navigate to GitHub and open a pull request using the feature branch as origin (e.g `BCHT-1`) and ` main` as the target branch.
6. Fix the merge conflicts (if any), need to make sure there are no merge conflicts in the PR before final review.
7. Add the details of the changes made in the pull request, and attach the screenshots of the components/section worked upon in the PR.
8. Ensure doing the self review of the pull request to identify the common  mistakes and fix them first to avoid any re-open.
9. Add the proper Testings Steps into the `Testing Steps` fields of the Jira ticket worked upon, and then move the ticket into Code Review and assign it to the Team Lead for a review


## Resources

### Environment URLs

- DEV: https://dev-boston-childrens-hospital-trust.pantheonsite.io/
- TEST: https://test-boston-childrens-hospital-trust.pantheonsite.io/

### Working on pantheon envrionments

1.  To connect with pantheon and perform operations on site environments install terminus on you local system
2.  Install the terminus as mentioned in this [document](https://docs.pantheon.io/terminus/install).
3.  Create [machine token](https://docs.pantheon.io/terminus/instal) for authentication and to execute drush command setup [ssh authentication](https://docs.pantheon.io/ssh-keys)
4.  After terminus is installed and authentication step is completed you can execute drush commands on the different environment via the following syntax structure.
    `terminus drush <site>.<env> -- <drush-command>`

### DDEV references

- DDEV Installation: https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/
- DDEV Commands: https://ddev.readthedocs.io/en/stable/users/usage/cli/
- DDEV Troubleshooting: https://ddev.readthedocs.io/en/stable/users/usage/troubleshooting/
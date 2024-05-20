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

Get the database dump file from the team member or server admin. Then run the below commands

ddev import-db --file=<path-to-dump-file>
ddev drush cim
ddev drush updb
ddev drush cr
```

5. Launch the Drupal site on browser
   `ddev launch`

6. Login as Drupal admin. Run below command & hit the one time URL in browser.
   `ddev drush uli`

## Gulp Compilation

cd into `web/themes/custom/bcht` and run the below command to compile the scss files
`npm install`
`gulp` (build)
`gulp watch` (to watch the changes)
    ```

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

# Playwright scripts

This repository contains Playwright tests for the Rahul Shetty Academy demo app.

Files of interest:
- `tests/` - test specs
- `Pages/OrderPage.js` - page object for the main end-to-end flow (login, add to cart, checkout)

How to push this project to a remote Git repository (example commands):

1) Make sure Git is installed and configured locally. If not, download and install from https://git-scm.com/

2) Initialize (only if not already a git repo), stage and commit:

```powershell
cd 'C:\Users\User\Desktop\Playwright scripts'
git init
git add -A
git commit -m "chore(tests): initial commit of Playwright scripts"
```

3) Create a remote repository on GitHub/GitLab/Bitbucket and copy the remote URL, then add remote and push:

Using HTTPS (with personal access token if required):
```powershell
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Using SSH:
```powershell
git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin main
```

If your default branch is `master` or something else, replace `main` with the branch name.

Notes:
- If `git` isn't available on your machine, install it first and configure your user.name and user.email.
- For private remotes over HTTPS, you may need to use a Personal Access Token (PAT) instead of your password.

# remove-merged-branches

[![Node.js CI](https://github.com/svandriel/remove-merged-branches/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/svandriel/remove-merged-branches/actions/workflows/node.js.yml)

Command line tool removing all branches that have been merged to the current branch.

Supports dry runs and offline use.

It can be used to remove both _local_ and _remote_ branches.

## Usage

Install globally:

```
npm i -g remove-merged-branches
```

And then you just call:

```
rmb
```

...or if you prefer verbosity, enter `remove-merged-branches`

## Syntax

```
Usage: rmb [options]

Removes merged branches locally and remotely

Options:
  -V, --version          output the version number
  -b, --branch <branch>  Base branch to compare others to (default: "HEAD")
  -o, --offline          Runs without doing anything to remotes (default: false)
  --verbose              Shows more output (default: false)
  --dry-run              Performs a dry run instead of removing branches (default: false)
  -h, --help             output usage information
```

## What does it do?

First it clears out the local branches that have been removed on the remotes:

```bash
git fetch --prune
```

Then, it finds all **local** branches merged to the HEAD branch and removes them:

```bash
git branch --merged $(git rev-parse HEAD)
# Then calls 'git branch -d' on each merged branch
```

Then, it finds all **remote** branches merged to the HEAD branch and removes them:

```bash
git branch --remote --merged $(git rev-parse HEAD)
# Then call 'git push --no-verify --delete' on each origin and branch
```

Finally, it clears out the local branches that have been removed due to the previous action:

```bash
git fetch --prune
```

## Example output

```
INFO Pruning branches removed on remotes
INFO Removing local branch feature/add-badges-to-markdown, feature/add-more-time-logs, feature/change-ci, feature/refactor-ssh-exec-cmd, refactor/extract-remove-undefineds
INFO No remote merged branches to HEAD found
INFO Pruning branches removed on remotes
```

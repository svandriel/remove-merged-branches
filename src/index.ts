import chalk from 'chalk';
import { keys, map, merge, trim } from 'ramda';

import { groupBranchesByRemote } from './functions/group-branches-by-remote';
import { parseBranchLines } from './functions/parse-branch-lines';
import { removeBranchFromList } from './functions/remove-branch-from-list';
import { log } from './lib/log';
import { runGit } from './lib/run-git';

interface RemoveMergedBranchesOptions {
  offline: boolean;
  dryRun: boolean;
}
const DEFAULT_OPTIONS: RemoveMergedBranchesOptions = {
  offline: false,
  dryRun: false,
};

export async function removeMergedBranches(
  fromBranch: string = 'HEAD',
  options: Partial<RemoveMergedBranchesOptions> = {},
): Promise<void> {
  const opts = merge(DEFAULT_OPTIONS, options);
  const { offline, dryRun } = opts;

  if (!dryRun && !offline) {
    log.info(`Pruning branches removed on remotes`);
    await runGit('fetch', '--prune');
  }

  const { stdout: gitHash } = await runGit('rev-parse', fromBranch);
  const trimmedGitHash = trim(gitHash);
  log.verbose(
    `Branch ${chalk.cyan(fromBranch)} resolves to hash ${chalk.green(
      trimmedGitHash,
    )}`,
  );

  const { stdout: branches } = await runGit(
    'branch',
    '--merged',
    trimmedGitHash,
  );
  const branchLines = parseBranchLines(branches);

  if (branchLines.length === 0) {
    log.info(`No local merged branches to ${fromBranch} found`);
  } else {
    const removalFn = dryRun ? removeLocalBranchesDryRun : removeLocalBranches;
    await removalFn(branchLines);
  }
  if (offline) {
    log.info(`Skipping remote branch removal in offline mode`);
  } else {
    const { stdout: remoteBranches } = await runGit(
      'branch',
      '--remote',
      '--merged',
      trimmedGitHash,
    );

    const allRemoteBranches = parseBranchLines(remoteBranches);
    const remoteBranchLines = removeBranchFromList(
      fromBranch,
      allRemoteBranches,
    );

    const branchesGroupedByRemote = groupBranchesByRemote(remoteBranchLines);
    if (keys(branchesGroupedByRemote).length === 0) {
      log.info(`No remote merged branches to ${fromBranch} found`);
    } else {
      const removalFn = dryRun
        ? removeRemoteBranchesDryRun
        : removeRemoteBranches;
      await Promise.all(map(removalFn, branchesGroupedByRemote));
    }
    if (dryRun) {
      log.info(`Would prune branches removed on remotes`);
    } else {
      log.info(`Pruning branches removed on remotes`);
      await runGit('fetch', '--prune');
    }
  }
}

async function removeLocalBranches(branchNames: string[]): Promise<void> {
  log.info(`Removing local branch ${chalk.cyan(branchNames.join(', '))}`);
  await runGit('branch', '-d', ...branchNames);
}

// eslint-disable-next-line @typescript-eslint/require-await
async function removeLocalBranchesDryRun(branchNames: string[]): Promise<void> {
  log.info(`Would remove local branches ${chalk.cyan(branchNames.join(', '))}`);
}

async function removeRemoteBranches([remote, branchNames]: [
  string,
  string[],
]): Promise<void> {
  log.info(
    `Removing from remote ${chalk.green(remote)}: ${chalk.cyan(
      branchNames.join(', '),
    )}`,
  );
  await runGit('push', '--no-verify', '--delete', remote, ...branchNames);
}

// eslint-disable-next-line @typescript-eslint/require-await
async function removeRemoteBranchesDryRun([remote, branchNames]: [
  string,
  string[],
]): Promise<void> {
  log.info(
    `Would remove from remote ${chalk.green(remote)}: ${chalk.cyan(
      branchNames.join(', '),
    )}`,
  );
}

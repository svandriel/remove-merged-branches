#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import { trim } from 'ramda';

import { removeMergedBranches } from '..';
import { log } from '../lib/log';
import { LogLevel } from '../types/log';
import { RunProcessError } from '../types/run-process';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const pkg: { version: string } = require('../../package.json');

program
  .version(pkg.version)
  .description('Removes merged branches locally and remotely')
  .option('-b, --branch <branch>', 'Base branch to compare others to', 'HEAD')
  .option('-o, --offline', 'Runs without doing anything to remotes', false)
  .option('--verbose', 'Shows more output', false)
  .option('--dry-run', 'Performs a dry run instead of removing branches', false)
  .parse(process.argv);

const { offline, branch, dryRun, verbose } = program.opts<{
  offline: boolean;
  branch: string;
  dryRun: boolean;
  verbose: boolean;
}>();
if (verbose) {
  log.setLevel(LogLevel.VERBOSE);
}

removeMergedBranches(branch, {
  offline,
  dryRun,
}).catch(err => {
  if (err instanceof Error) {
    log.error(err.message);
    if (err instanceof RunProcessError) {
      if (err.stdout) {
        log.info(chalk.gray(trim(err.stdout)));
      }
      if (err.stderr) {
        log.info(chalk.gray(trim(err.stderr)));
      }
    }
    process.exit(1);
  }
});

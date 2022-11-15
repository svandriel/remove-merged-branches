#!/usr/bin/env node
import chalk from 'chalk';
import program from 'commander';
import { trim } from 'ramda';

import { removeMergedBranches } from '../';
import { log } from '../lib/log';
import { LogLevel } from '../types/log';

// tslint:disable-next-line: no-var-requires
const pkg = require('../../package.json');

program
    .version(pkg.version)
    .description('Removes merged branches locally and remotely')
    .option('-b, --branch <branch>', 'Base branch to compare others to', 'HEAD')
    .option('-o, --offline', 'Runs without doing anything to remotes', false)
    .option('--verbose', 'Shows more output', false)
    .option('--dry-run', 'Performs a dry run instead of removing branches', false)
    .parse(process.argv);

const { offline, branch, dryRun, verbose } = program;
if (verbose) {
    log.setLevel(LogLevel.VERBOSE);
}

removeMergedBranches(branch, {
    offline,
    dryRun
}).catch(err => {
    log.error(err.message);
    if (err.stdout) {
        log.info(chalk.gray(trim(err.stdout)));
    }
    if (err.stderr) {
        log.info(chalk.gray(trim(err.stderr)));
    }
    process.exit(1);
});

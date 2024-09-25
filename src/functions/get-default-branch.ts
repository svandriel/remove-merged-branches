import { runGit } from '../lib/run-git';

export async function getDefaultBranch(): Promise<string> {
  const output = await runGit('remote', 'show', 'origin');
  const lines = output.stdout.split('\n').map(line => line.trim());
  const headBranchLine = lines.find(line => line.startsWith('HEAD branch:'));
  if (!headBranchLine) {
    throw new Error(
      "Could determine default branch, git remote show origin did not include 'HEAD branch'",
    );
  }
  const match = /HEAD branch: (.+)\b/.exec(headBranchLine);
  if (match) {
    return match[1] as string;
  }
  throw new Error(
    `Could not determine default branch git output: ${headBranchLine}`,
  );
}

export interface RunProcessOutput {
  stdout: string;
  stderr: string;
  code: number;
}

export class RunProcessError extends Error implements RunProcessOutput {
  stdout: string;

  stderr: string;

  code: number;

  constructor(message: string, output: RunProcessOutput) {
    super(message);
    this.stdout = output.stdout;
    this.stderr = output.stderr;
    this.code = output.code;
  }
}

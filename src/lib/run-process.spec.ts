import { runProcess } from './run-process';

test('run process that exits properly', async () => {
    const result = await runProcess('node', ['-e', 'console.log("hi");console.error("fail")']);
    expect(result).toEqual({
        code: 0,
        stderr: 'fail\n',
        stdout: 'hi\n'
    });
});

test('run process that exits with error', async () => {
    try {
        await runProcess('node', ['-e', 'console.log("hi");console.error("fail");process.exit(1)']);
        fail('Expected an error');
    } catch (err) {
        expect(err).toMatchInlineSnapshot(
            `[Error: Process terminated with code 1: node -e console.log("hi");console.error("fail");process.exit(1)]`
        );
    }
});

test('run process with ENOENT', async () => {
    try {
        await runProcess('thisdoesnotexist', []);
        fail('Expected an error');
    } catch (err) {
        expect(err).toMatchInlineSnapshot(`[Error: spawn thisdoesnotexist ENOENT]`);
    }
});

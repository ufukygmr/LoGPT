import { spawn } from 'child_process';

const pythonScript = '../x.py'; //TODO: Handle this path

export const runPythonScript = (args: string[]) => {
  return new Promise((resolve, reject) => {
    // Spawn a new Python process
    const pythonProcess = spawn('python', [pythonScript, ...args]);

    let stdoutData = '';

    // Capture the output of the Python script
    pythonProcess.stdout.on('data', data => {
      stdoutData += data.toString();
    });

    // Capture errors, if any
    pythonProcess.stderr.on('data', data => {
      reject(`Error from Python script: ${data.toString()}`);
    });

    // Handle process exit
    pythonProcess.on('close', code => {
      if (code === 0) {
        resolve(stdoutData);
      } else {
        reject(`Python script exited with non-zero code: ${code}`);
      }
    });
  });
};

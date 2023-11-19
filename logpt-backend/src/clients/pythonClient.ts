import { spawn } from 'child_process';

const pythonScript = '/Users/bhdurak/Desktop/hackaTUM/LoGPT/text-similarity/measure_similarity.py'; //TODO: Handle this path

export const runPythonScript = (args: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Spawn a new Python process
    const pythonProcess = spawn('python3', [pythonScript, ...args]);
    console.log(args);
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

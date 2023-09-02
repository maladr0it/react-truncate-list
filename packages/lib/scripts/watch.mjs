// Small util to watch the filesystem

import { exec } from "child_process";
import fs from "fs/promises";

// Runs a task, or queues it to run next if one is already in progress
const createTaskQueue = () => {
  let isRunning = false;
  let queuedTask = null;

  const doTasks = async (fn) => {
    isRunning = true;

    let task = fn;
    while (task) {
      await task();
      task = queuedTask;
      queuedTask = null;
    }

    isRunning = false;
  };

  const run = (fn) => {
    if (!isRunning) {
      doTasks(fn);
    } else {
      queuedTask = fn;
    }
  };

  return { run };
};

const watchDir = process.argv[2];
const command = process.argv[3];

const onChange = () => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error, stdout, stderr);
      } else if (stdout.trim()) {
        console.log(stdout);
      }
      resolve();
    });
  });
};

const watcher = fs.watch(watchDir, { recursive: true });
const taskQueue = createTaskQueue();

taskQueue.run(onChange); // run initially on script start

for await (const _event of watcher) {
  taskQueue.run(onChange);
}

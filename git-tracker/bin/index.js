#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("node:path");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const sourcePath = process.cwd();
const directoryList = [];
const getDirectories = (_path) => {
  return fs
    .readdirSync(_path, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((directory) => directory.name);
};

const isGitRepo = (_directory) => {
  let flag = true;
  try {
    fs.accessSync(path.join(_directory, "/.git"), fs.constants.F_OK);
  } catch (error) {
    flag = false;
  }
  return flag;
};

// async function doGit(_directory, _command) {
    // const { stdout, stderr } = await exec(`cd ${_directory} && ${_command} && cd ..`);
    // console.log(stdout)
    // if (stdout) return stdout;
    // return stderr;
// };

const doGit = (_directory, _command) => {
    return new Promise((resolve, reject) => {
        const { stdout, stderr } = exec(`cd ${_directory} && ${_command} && cd ..`);
        if (stdout) resolve(stdout);
        reject(stderr);
    })
};

getDirectories(sourcePath).forEach((directory) => {
  if (isGitRepo(directory)) {
    doGit(directory, "git status")
    .then((currentStatus) => {
        directoryList.push({ Directory: directory, Status: currentStatus });
    })
  }
});

console.table(directoryList);
//doGit('xcro_odp', 'git pull');

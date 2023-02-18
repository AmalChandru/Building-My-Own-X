#!/usr/bin/env node
"use strict";
const fs = require('fs');
const path = require('node:path');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

function doGit(_directory, _command) {
  const { stdout, stderr } = exec(`cd ${_directory} && ${_command} && cd ..`);
  if(stdout) return stdout;
  return stderr
}

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
    fs.accessSync(path.join(_directory, '/.git'), fs.constants.F_OK);
  } catch (error) {
    flag = false;
  }
  return flag;
};

getDirectories(sourcePath).forEach((directory) => {
  if (isGitRepo(directory)) {
    const currentStatus = doGit(directory, 'git status');
    directoryList.push({ Directory: directory, Status: currentStatus });
  }
});

console.table(directoryList);
//doGit('xcro_odp', 'git pull');
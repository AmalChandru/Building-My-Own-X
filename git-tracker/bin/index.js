#!/usr/bin/env node
'use strict';
const fs = require('fs');
const { spawnSync } = require('child_process');

const sourcePath = process.cwd();
const directoryList = [];
const getDirectories = (_path) => {
    return fs.readdirSync(_path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(directory => directory.name);
};

const isGitRepo = (_directory) => {
    const isGitRepo = spawnSync('git rev-parse --is-inside-work-tree', {encoding: 'utf8'});
    console.log(isGitRepo);
    return isGitRepo;
};

getDirectories(sourcePath).forEach((directory) => {
    //execSync(`cd ${directory}`, {encoding: 'utf8'});
    spawnSync(`cd ${directory}`, {encoding: 'utf8'});
    if (isGitRepo(directory)) directoryList.push({Directory: directory, Status: isGitRepo(directory)})
    //spawnSync(['/bin/sh', 'script.sh']);
    //console.log(isGitRepo(directory));
    spawnSync('cd ..', {encoding: 'utf8'});
});

console.table(directoryList)
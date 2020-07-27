"use strict";
const vscode = require("vscode");
const process = require("child_process");
const { stdout } = require("process");
var cwd = vscode.workspace.rootPath;

function stageFile(path) {
    let cmd = `git add -f "${path}"`;
    process.exec(cmd, {
        cwd: cwd
    }, (error, stdout, stderr) => {
        console.dir(error);
        if (error)
            vscode.window.showErrorMessage("Failed stage the files");
        else
            vscode.window.showInformationMessage("Stage files successful ");
    });
}

function archiveUnstageChanges() {
    let cwd = vscode.workspace.rootPath;
    let cmd = `git diff --name-only -a | xargs zip unstage_changes.zip`;
    process.exec(cmd, {
        cwd: cwd
    }, (error, stdout, stderr) => {
        console.dir(error);
        if (error)
            vscode.window.showErrorMessage("Failed create archive files");
        else
            vscode.window.showInformationMessage("Archive unstage files successful");
    });
}

function archiveLastCommit() {
    let cmd = `git archive -o latest_commit.zip HEAD`;
    let cwd = vscode.workspace.rootPath;
    process.exec(cmd, {
        cwd: cwd
    }, (error, stdout, stderr) => {
        console.dir(error);
        if (error)
            vscode.window.showErrorMessage("Failed create archive files");
        else
            vscode.window.showInformationMessage("Archive last commit successful");
    });
}

function archiveCurrentChanges() {
    let cwd = vscode.workspace.rootPath;
    let cmd = "git diff --name-only HEAD | xargs -d'\\n' git archive -o current_changes.zip HEAD";
    process.exec(cmd, {
        cwd: cwd
    }, (error, stdout, stderr) => {
        console.dir(error);
        if (error)
            vscode.window.showErrorMessage("Failed create archive files");
        else
            vscode.window.showInformationMessage("Archive current changes successful");
    });
}

function archiveCommitChanges() {
    var items = [];
    const { spawn } = require('child_process');
    var i = 0;
    var logger = function() {
        const s = spawn("git", [
            "log",
            `--pretty=tformat:"%h/%ad"`
        ], { cwd: cwd });
        s.stdout.on('data', (data) => {
            var data = String.fromCharCode.apply(null, new Uint16Array(data));
            console.log(i + "=>" + data);
            var lst = data.split("\n");
            for (let index = 0; index < lst.length - 1; index++) {
                let item = lst[index].split("/");
                items.push({
                    label: item[0].replace("\"", ""),
                    description: item[1].replace("\"", "")
                });
            }
            i++;
            vscode.window.showQuickPick(items).then(sel => {
                var cmd = `git diff-tree --no-commit-id --name-only -r ${sel.label} | zip -d@ ${sel.label}_changes.zip`;
                process.exec(cmd, { cwd: cwd }, (error, stdout, stderr) => {
                    console.log(stdout);
                    console.error(stderr);
                });
            });
        });
        s.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        s.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
    logger();
}

exports.stageFile = stageFile;
exports.archiveUnstageChanges = archiveUnstageChanges;
exports.archiveLastCommit = archiveLastCommit;
exports.archiveCurrentChanges = archiveCurrentChanges;
exports.archiveCommitChanges = archiveCommitChanges;
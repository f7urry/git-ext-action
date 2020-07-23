"use strict";
const vscode = require("vscode");
const process = require("child_process");

function stageFile(path) {
    let cwd = vscode.workspace.rootPath;
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
    let options: InputBoxOptions = {
        prompt: "Label: ",
        placeHolder: "(placeholder)"
    }

    window.showInputBox(options).then(value => {
        if (!value) return;
        answer1 = value;
        // show the next dialog, etc.
    });
    let cmd = `zip latest_changes.zip $(git diff-tree --no-commit-id --name-only -r HEAD)`;
    let cwd = vscode.workspace.rootPath;
    process.exec(cmd, {
        cwd: cwd
    }, (error, stdout, stderr) => {
        console.dir(error);
        if (error)
            vscode.window.showErrorMessage("Failed create archive files");
        else
            vscode.window.showInformationMessage("Archive last changes successful");
    });
}

exports.stageFile = stageFile;
exports.archiveUnstageChanges = archiveUnstageChanges;
exports.archiveLastCommit = archiveLastCommit;
exports.archiveCurrentChanges = archiveCurrentChanges;
exports.archiveCommitChanges = archiveCommitChanges;
const vscode = require('vscode');
const git_explore = require('./git-explore');

function activate(context) {

    let stageSelectedFile = vscode.commands.registerCommand('action.stageSelectedFile', function(e) {
        git_explore.stageFile(e.fsPath);
    });
    let archiveUnstageChanges = vscode.commands.registerCommand('action.archiveUnstageChanges', function() {
        git_explore.archiveUnstageChanges();
    });
    let archiveLastCommit = vscode.commands.registerCommand('action.archiveLastCommit', function() {
        git_explore.archiveLastCommit();
    });
    let archiveCommitChanges = vscode.commands.registerCommand('action.archiveCommitChanges', function() {
        git_explore.archiveCommitChanges();
    });
    let archiveCurrentChanges = vscode.commands.registerCommand('action.archiveCurrentChanges', function() {
        git_explore.archiveCurrentChanges();
    });
    context.subscriptions.push(stageSelectedFile);
    context.subscriptions.push(archiveUnstageChanges);
    context.subscriptions.push(archiveLastCommit);
    context.subscriptions.push(archiveCurrentChanges);
    context.subscriptions.push(archiveCommitChanges);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
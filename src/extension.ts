
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import jsbeautify = require('js-beautify');


export function format(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions) {

	if (range === null) {
		let start = new vscode.Position(0, 0);
		let end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
		range = new vscode.Range(start, end);
	}

	let result: vscode.TextEdit[] = [];

	let content = document.getText(range);

	if (!options) {
		options = { insertSpaces: true, tabSize: 4 };
	}

	let beutifyOptions: jsbeautify.IBeautifyCSSOptions = {
		indent_char: options.insertSpaces ? ' ' : '\t',
		indent_size: options.insertSpaces ? options.tabSize : 1,
		selector_separator_newline: false
	}

	let formatted = jsbeautify.css_beautify(content, beutifyOptions);
	if (formatted) {
		result.push(new vscode.TextEdit(range, formatted));
	}

	return result;
};


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('css', {
		provideDocumentFormattingEdits: (document, options, token) => {
			return format(document, null, options)
		}
	}));
	context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('css', {
		provideDocumentRangeFormattingEdits: (document, range, options, token) => {
			let start = new vscode.Position(0, 0);
			let end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
			return format(document, new vscode.Range(start, end), opons)
		}
	}));
}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('reactstory.createReactComponent', function (uri) {
        // Show quick pick to select between 'js' and 'ts'
        vscode.window.showQuickPick(['js', 'ts'], { placeHolder: 'Select language (js or ts)' }).then((language) => {
            if (!language) {
                // User canceled the quick pick
                return;
            }

            // Get folder name
            const folderName = path.basename(uri.fsPath);

            // Determine file extensions based on language selection
            const ext = language === 'ts' ? 'ts' : 'js';
            const extx = language === 'ts' ? 'tsx' : 'jsx';

            // Create component file
            const componentFilePath = path.join(uri.fsPath, `${folderName}.${extx}`);

            // Create component content based on language
            let componentContent;
            if (language === 'ts') {
                componentContent = `
import React from 'react';

const ${folderName}: React.FC = () => {
    return (
        <div>${folderName} Component</div>
    );
};

export default ${folderName};`;
            } else {
                componentContent = `
import React from 'react';

const ${folderName} = () => {
    return (
        <div>${folderName} Component</div>
    );
};

export default ${folderName};`;
            }

            fs.writeFileSync(componentFilePath, componentContent);

            // Create __tests__ folder and test files
            const testFolderPath = path.join(uri.fsPath, '__tests__');

            if (!fs.existsSync(testFolderPath)) {
                fs.mkdirSync(testFolderPath);
            }

            const testFilePath = path.join(testFolderPath, `${folderName}.test.${extx}`);

            let testContent = `
import React from 'react';
import { render } from '@testing-library/react';
import ${folderName} from '../${folderName}';

test('renders ${folderName} component', () => {
    render(<${folderName} />);	
});`;

            fs.writeFileSync(testFilePath, testContent);

            const a11yTestFilePath = path.join(testFolderPath, `${folderName}.a11y.${extx}`);

            let a11yTestContent = `
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import ${folderName} from '../${folderName}';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
    const { container } = render(<${folderName} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
`;

            fs.writeFileSync(a11yTestFilePath, a11yTestContent);

            // Create Storybook story
            const storyFilePath = path.join(uri.fsPath, `${folderName}.stories.${extx}`);

            let storyContent;
            if (language === 'ts') {
                storyContent = `
import { Meta, StoryFn } from '@storybook/react';
import ${folderName} from './${folderName}';

export default {
    title: 'Components/${folderName}',
    component: ${folderName},
    tags: ['autodocs'],
} as Meta;

const Template: StoryFn = () => <${folderName} />;

export const Default = Template.bind({});`;
            } else {
                storyContent = `
import React from 'react';
import ${folderName} from './${folderName}';

export default {
    title: 'Components/${folderName}',
    component: ${folderName},
    tags: ['autodocs'],
};

const Template = () => <${folderName} />;

export const Default = Template.bind({});`;
            }

            fs.writeFileSync(storyFilePath, storyContent);

            // Display a message box to the user
            vscode.window.showInformationMessage(`${folderName} component created with tests and Storybook story in ${language}.`);
        });
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
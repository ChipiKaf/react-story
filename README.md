# ReactStory - Create React Components with Tests and Stories

`reactstory` is a Visual Studio Code extension that helps you quickly scaffold React components with associated test files and Storybook stories. This extension offers a simple workflow for creating a React component folder structure with relevant files for both `js` and `ts` languages, including tests and accessibility tests using `jest` and `jest-axe`.

## Features

- Create a React component with a single command.
- Automatically generates:
  - Component file (`jsx`/`tsx`).
  - Test file (`test.jsx`/`test.tsx`).
  - Accessibility test file (`a11y.jsx`/`a11y.tsx`).
  - Storybook story file (`stories.jsx`/`stories.tsx`).
- Support for both JavaScript and TypeScript.
  
## How to Use

1. **Install the Extension**

   Clone the repository and install the extension in Visual Studio Code.
   
2. **Right-click on a Folder**

   In the VS Code Explorer, right-click on any folder where you want to create a new React component.
   
3. **Select "Create React Component (with stories and tests)"**

   From the context menu, select this option. A prompt will appear asking you to select the language (`js` or `ts`).
   
4. **Component Scaffolding**

   After selecting the language, the extension will automatically create:
   
   - A React component file (`jsx`/`tsx`).
   - A `__tests__` folder containing:
     - A component test file (`test.jsx`/`test.tsx`).
     - An accessibility test file (`a11y.jsx`/`a11y.tsx`).
   - A Storybook story file (`stories.jsx`/`stories.tsx`).
   
5. **Done!**

   A confirmation message will appear in VS Code, indicating that your component was created successfully.

## Requirements

- Visual Studio Code `^1.94.0`
- Installed `jest`, `@testing-library/react`, `jest-axe`, and `storybook` in your project for testing and stories.

## Development Setup

To contribute to this extension:

1. Clone the repository.
2. Install dependencies with `yarn` or `npm install`.
3. Run the extension in VS Code.

## Running Tests

To run tests for this extension:

```bash
yarn test
# Frontend QA coding challenge

This repository contains tests for specific cases outlined in the coding challenge document.

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Approach](#approach)
- [Notes](#notes)

## Installation

1. **Clone the repository**

2. **Install dependencies**

    Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```
    
3. **Install Playwright**

    Install Playwright and its browser binaries:

    ```bash
    npx playwright install --with-deps
    ```

## Running Tests

### Running All Tests

To run all tests, use:

headless mode
```bash
npx playwright test
```

ui mode
```bash
npx playwright test --ui
```

## Approach

### Page Object Model (POM)
One test was designed to showcase POM's modularity and reusability.

### Playwright
Playwright was chosen for its:
1. Auto-waiting and retries to handle dynamic elements and loading states
2. Built-in support for Shadow DOM and iFrames.
3. Multi-browser support.
4. CI/CD integration and detailed test reports.

## Notes
This repository is set up with GitHub Actions.
Every time you push a commit or open a pull request, tests will run automatically.

Check test results under the "Actions" tab in the GitHub repository.

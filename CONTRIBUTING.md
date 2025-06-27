# 𝕄𝕪𝕥𝕙𝕨𝕖𝕒𝕧𝕖𝕣 𝕀𝕟𝕔.

File Managed by Solo™ only.

# Contribution Guide

Welcome to the project! To ensure our codebase remains clean, stable, and easy to manage, we follow a structured development workflow. All changes to the project must be submitted through a Pull Request (PR).

**The cardinal rule is: direct pushes to the `main` branch are disabled.**

## Development Workflow

Follow these steps every time you start working on a new feature, bug fix, or task.

### Step 1: Sync Your Local Repository

Before creating a new branch, always make sure your local `main` branch is up-to-date with the remote repository.

```sh
# Switch to your main branch
git checkout main

# Pull the latest changes from the server
git pull origin main
```

### Step 2: Create a New Branch

Create a new branch from `main` for your work. This isolates your changes and prevents conflicts.

You can name your branch based on the task you're working on or use your username as a prefix. The specific naming convention is flexible, as long as it's descriptive.

```sh
# Create and switch to your new branch
git checkout -b <your-branch-name>
```

**Examples:**
*   `git checkout -b feature/beta-signup-system`
*   `git checkout -b fix/navbar-alignment`
*   `git checkout -b Sorodyn/language-switcher`

### Step 3: Make Your Changes

Work on your task in your new branch. Write your code, add your assets, and commit your changes with clear, descriptive messages.

```sh
# Add your changed files
git add .

# Commit your changes with a message
git commit -m "feat: Implement initial beta signup form UI"
```

### Step 4: Push Your Branch to GitHub

When you're ready to share your work or open it for review, push your branch to the remote repository on GitHub.

```sh
# Push your branch to the remote repository
git push origin <your-branch-name>
```

### Step 5: Open a Pull Request

1.  Navigate to the repository on GitHub.
2.  You will see a prompt to create a Pull Request from your recently pushed branch. Click it.
3.  **Ensure the base branch is `main`** and the compare branch is your feature branch.
4.  Write a clear, concise title for your Pull Request.
5.  In the description, briefly explain the purpose of your changes and what you accomplished. If your PR resolves a specific task, link to it.
6.  Click "Create pull request".

### Step 6: Code Review and Merge

Once your Pull Request is submitted, the team lead will be notified to review your changes.

-   **Feedback:** The team lead may leave comments or request changes.
-   **Updates:** To make updates, simply commit and push more changes to your same branch. The Pull Request will update automatically.
-   **Approval & Merge:** Once your PR is approved and passes all checks, the team lead will merge it into the `main` branch. Your work is now part of the main codebase!

Thank you for your contributions!
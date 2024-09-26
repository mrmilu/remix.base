# Justfile Commands 🦀 🚀

Run `just` to display the list of available commands.

## What is just?

`just` is a handy way to save and run project-specific commands. Commands, called recipes, are stored in a file called `justfile` with syntax inspired by `make`.

## Commands List

- `just corepack-enable`: Enables Corepack in Node.js.
- `just install-deps`: Installs the dependencies listed in the project's package.json.
- `just dev`: Starts the vite development server.
- `just build`: Builds the application using vite.
- `just fix`: Runs linting and formatting.
- `just nvm exec {{command}}`: Proxies a command through nvm. Replace `{{command}}` with the desired command to execute.


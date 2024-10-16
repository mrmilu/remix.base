default:
  just --list

# Enables corepack in node
corepack-enable:
    ./nvm_exec.sh corepack enable

# Installs project package.json dependencies
install-deps:
    ./nvm_exec.sh pnpm install

# Starts vite development server
dev:
    ./nvm_exec.sh pnpm dev

# Builds application using vite
build:
    ./nvm_exec.sh pnpm build

# Starts remix vite server from build output
start:
    ./nvm_exec.sh pnpm start

# Runs tsc to check types
check-types:
    ./nvm_exec.sh pnpm check-types

# Runs linting
lint:
    ./nvm_exec.sh pnpm lint
    ./nvm_exec.sh pnpm prettier

# Runs linting and formatting.
fix:
    ./nvm_exec.sh pnpm lint-fix
    ./nvm_exec.sh pnpm prettier-fix

# Generate inversify bindings
ioc-generate:
    ./nvm_exec.sh pnpm ioc-generate

ioc-generate-watch:
    ./nvm_exec.sh pnpm ioc-generate --watch

# Commit
commit:
    ./nvm_exec.sh pnpm commit

# Proxy comand through nvm
nvm-exec command:
    ./nvm_exec.sh {{command}}
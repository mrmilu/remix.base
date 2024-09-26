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

fix:
    ./nvm_exec.sh pnpm lint-fix
    ./nvm_exec.sh pnpm prettier-fix

# Proxy comand through nvm
nvm-exec command:
    ./nvm_exec.sh {{command}}
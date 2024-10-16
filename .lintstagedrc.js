export default {
  "**/*.{js,jsx,ts,tsx}": "eslint",
  "**/*.{ts,tsx}": () => "tsc --project tsconfig.json"
};

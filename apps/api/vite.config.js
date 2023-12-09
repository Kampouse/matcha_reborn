import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  plugins: [
    // If you're using Fastify with a Node.js backend setup, this plugin can be useful
    ...VitePluginNode({
      // Node.js app entry point
      appPath: './src/server.ts',
      adapter: 'fastify',
      
      tsCompiler: "esbuild"
      // Other plugin options
    }),
  ],
  test: {
    // Specify the environment in which the tests are run
    environment: 'node',

    // Glob pattern to match test files
    include: ['**/*.test.ts', '**/*.spec.ts'],

    // If you need to transpile modules during testing
    // If your tests require specific global setup or teardown
    // Additional Vitest configurations...
    // For example, setting timeout if your tests involve network or database operations
    testTimeout: 10000,

    // Mocking global objects if needed
    globals: true,

    // Enable or disable watching files for changes
    watch: false,

    // Coverage options
    coverage: {
      // Configurations for coverage reports
      reporter: ['text', 'json', 'html'],
    },
  },
});


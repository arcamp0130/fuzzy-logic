import { defineConfig } from "vite"

// Vite configuration to bundle project
export default defineConfig(({ mode }) => ({
    root: "./src/public",
    build: {
        outDir: "../../dist/public",
        emptyOutDir: true,
        sourcemap: mode === 'development',
    }
}))
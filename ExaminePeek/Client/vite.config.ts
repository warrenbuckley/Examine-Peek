import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts", // Entrypoint file (registers other manifests)
            formats: ["es"],
            fileName: "examine-peek",
        },
        outDir: "../wwwroot/App_Plugins/ExaminePeek", // your web component will be saved in this location
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
        },
    },
});
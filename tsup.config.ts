import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/index.ts"],
    outDir: "lib",
    target: "esnext",
    format: ["esm", "cjs", "iife"],
    clean: true,
    splitting: false,
    minify: !options.watch,
    dts: options.watch ? false : { resolve: true },
}));

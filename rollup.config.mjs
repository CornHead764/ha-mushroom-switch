import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/main.ts",
  output: {
    file: "dist/mushroom-switch.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    typescript({
      declaration: false,
    }),
    nodeResolve(),
    ...(dev ? [] : [terser()]),
  ],
};

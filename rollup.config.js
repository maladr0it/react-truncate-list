import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const NODE_ENV = process.env.NODE_ENV || "development";

export default {
  input: "src/index.tsx",
  output: {
    file: "./build/index.js",
    format: "cjs",
  },
  external: ["react", "react-dom", "resize-observer-polyfill"],
  plugins: [
    resolve(),
    commonjs({ include: "node_modules/**" }),
    typescript(),
    postcss({ plugins: [] }),
    babel({ exclude: "node_modules/**", extensions: [".js"] }),
    replace({ "process.env.NODE_ENV": JSON.stringify(NODE_ENV) }),
  ],
};

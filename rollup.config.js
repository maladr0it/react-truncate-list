import replace from "@rollup/plugin-replace";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const NODE_ENV = process.env.NODE_ENV || "development";
const outputPath = NODE_ENV === "production" ? "build/prod.js" : "build/dev.js";

export default {
  input: "src/index.tsx",
  output: {
    file: outputPath,
    format: "cjs",
  },
  external: ["react", "react-dom"],
  plugins: [
    replace({ "process.env.NODE_ENV": JSON.stringify(NODE_ENV) }),
    babel({ exclude: "node_modules/**", extensions: [".js", ".ts", ".tsx"] }),
    resolve({ extensions: [".js", ".ts", ".tsx"] }),
    commonjs({ include: "node_modules/**" }),
  ],
};

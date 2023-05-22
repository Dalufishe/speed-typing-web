import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";

const tailwindcssConfig = resolveConfig(tailwindConfig);

export { tailwindcssConfig };

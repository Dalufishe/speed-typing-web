import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind(clone).config";

const tailwindcssConfig = resolveConfig(tailwindConfig);

export { tailwindcssConfig };

import { Config } from 'bili';
const config: Config = {
  input: 'src/index.js',
  banner: true,
  output: {
    extractCSS: false,
    format: ['cjs', 'esm'],
  },
  plugins: {
    typescript2: {
      // Override the config in `tsconfig.json`
      tsconfigOverride: {
        include: ['src'],
      },
    },
    vue: {
      css: true,
    },
  },
};

export default config;

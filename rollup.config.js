const base = {
  external: [
    'protocol-buffers-schema',
    'pbf/compile',
    'rollup-pluginutils',
  ],
};

export default [
  {
    input: './src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/index.js',
    },
    ...base,
  },
];

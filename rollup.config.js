import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/index.js',
    output: {
      exports: 'named',
      file: 'dist/crio.js',
      format: 'umd',
      name: 'crio',
      sourcemap: true
    },
    plugins: [
      commonjs({
        include: 'node_modules/**'
      }),
      resolve({
        main: true,
        module: true
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: 'src/index.js',
    output: {
      exports: 'named',
      file: 'dist/crio.min.js',
      format: 'umd',
      name: 'crio'
    },
    plugins: [
      commonjs({
        include: 'node_modules/**'
      }),
      resolve({
        main: true,
        module: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
  }
];

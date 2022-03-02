import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev', '--host'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'umd',
    name: 'datagen',
    file: `dist/${pkg.name}.js`
  },
  plugins: [
    resolve({
      browser: true,
      dedupe: ['d3-scale']
    }),
    commonjs(),
    !production && serve(),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

import path from 'path';
import fs from 'node:fs';

function cleanReadFiles(path: string) {
  const source = fs.readFileSync(path, 'utf-8');
  // remove comments
  return source.replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '').trim();
}

export default function collectSass() {
  const varFiles: string[] = [];
  const varOutput = path.resolve(__dirname, 'dist/variables.scss');

  return {
    name: 'collect-sass',
    buildStart() {
      [
        path.resolve(__dirname, 'src/styles/_colors.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
        path.resolve(__dirname, 'src/styles/_variables.scss'),
      ].map((_file) => {
        varFiles.push(cleanReadFiles(_file));
      });
    },
    async generateBundle() {
      await fs.promises.mkdir(path.dirname(varOutput), {recursive: true});
      await fs.promises.writeFile(varOutput, varFiles.join(''));
    },
  };
}

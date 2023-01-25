import path from 'path';
import fs from 'node:fs';
import {glob} from 'glob';
import syntax from 'postcss-scss';
import nested from 'postcss-nested';
import {compileStringAsync} from 'sass';
import {compileStyle} from '@vue/compiler-sfc';

function cleanReadFiles(path: string) {
  let source = fs.readFileSync(path, 'utf-8');
  // remove comments
  source = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '').trim();
  // remove imports
  source = source.replace(/(@import.+)/gm, '').trim();
  return source;
}

export default function collectSass() {
  const styleFiles: string[] = [];
  const variableFiles: string[] = [];
  const styleOutput = path.resolve(__dirname, './dist/styles.scss');
  const variablesOutput = path.resolve(__dirname, './dist/variables.scss');

  return {
    name: 'collect-sass',
    buildStart() {
      // Collect theme variables
      glob(path.join(__dirname, '/src/styles/_*.scss'), (_, files) => {
        files.map((_file) => {
          variableFiles.push(cleanReadFiles(_file));
        });
      });

      // Collect component variables
      glob(path.join(__dirname, '/src/components/**/_*.scss'), (_, files) => {
        files.map((_file) => {
          styleFiles.push(cleanReadFiles(_file));
        });
      });
    },
    transform(_: string, id: string) {
      if (/\.scss\?vue/.test(id)) {
        const [filename, rawQuery] = id.split(`?`, 2);
        const query = Object.fromEntries(new URLSearchParams(rawQuery)) as {
          scoped?: string;
        };
        const isScoped =
          query?.scoped !== undefined && query?.scoped.trim() !== '';
        const {code} = compileStyle({
          scoped: isScoped,
          filename: filename,
          source: fs.readFileSync(filename, 'utf-8'),
          id: isScoped ? `data-v-${query.scoped}` : '',
          postcssOptions: {
            parser: syntax,
          },
          postcssPlugins: [
            (css) => {
              css.walkComments((i) => {
                if (i.raws.inline) i.remove();
              });
              css.walkAtRules((i) => {
                if (i.name === 'import') i.remove();
              });
            },
            nested,
          ],
        });
        styleFiles.push(code);
      }
      return null;
    },
    async generateBundle() {
      // validate generated sass bundles
      await compileStringAsync([...variableFiles, ...styleFiles].join(''));

      await fs.promises.mkdir(path.dirname(styleOutput), {recursive: true});
      await fs.promises.writeFile(styleOutput, styleFiles.join(''));
      await fs.promises.writeFile(variablesOutput, variableFiles.join(''));
    },
  };
}

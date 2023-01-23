import path from 'path';
import fs from 'node:fs';
import {compileStyle} from '@vue/compiler-sfc';

function cleanReadFiles(path: string) {
  let source = fs.readFileSync(path, 'utf-8');
  // remove comments
  source = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  return source;
}

export default function collectSass() {
  const files: string[] = [];
  return {
    name: 'collect-sass',
    transform(_: string, id: string) {
      if (/\.scss\?vue/.test(id)) {
        const [filename, rawQuery] = id.split(`?`, 2);
        const query = Object.fromEntries(new URLSearchParams(rawQuery)) as {
          scoped?: string;
        };
        // console.log(filename, query);
        const isScoped = query?.scoped != '';
        const {code} = compileStyle({
          scoped: isScoped,
          filename: filename,
          source: cleanReadFiles(filename),
          id: isScoped ? `data-v-${query.scoped}` : '',
        });
        files.push(code);
      }
      return null;
    },
    async generateBundle(opts: {file?: string; dir?: string}) {
      const outputPath = path.resolve(
        opts.file ? path.dirname(opts.file) : opts.dir || '',
        `${opts.file ? path.parse(opts.file).name : 'index'}.scss`,
      );
      await fs.promises.mkdir(path.dirname(outputPath), {recursive: true});
      await fs.promises.writeFile(outputPath, files.join('\n '));
    },
  };
}

import schema from 'protocol-buffers-schema';
import { raw } from 'pbf/compile';
import { createFilter } from 'rollup-pluginutils';


const ext = /\.proto$/;

export default function proto(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'protobuf',

    transform(code, id) {
      if (!ext.test(id)) {
        return;
      }
      if (!filter(id)) {
        return;
      }

      const ast = schema.parse(code);
      const rawCode = raw(ast)
        .replace(/^var (\w+) = exports\.\1 = (.+?);/mg, 'export const $1 = $2;');

      return {
        code: rawCode,
        map: { mappings: '' },
      };
    },
  };
}

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var schema = _interopDefault(require('protocol-buffers-schema'));
var compile = require('pbf/compile');
var rollupPluginutils = require('rollup-pluginutils');

const ext = /\.proto$/;

function proto(options = {}) {
  const filter = rollupPluginutils.createFilter(options.include, options.exclude);

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
      const rawCode = compile.raw(ast)
        .replace(/^var (\w+) = exports\.\1 = (.+?);/mg, 'export const $1 = $2;');

      return {
        code: rawCode,
        map: { mappings: '' },
      };
    },
  };
}

module.exports = proto;

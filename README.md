# @dishuostec/rollup-plugin-proto

Convert .proto files into JavaScript module useing [pbf](https://github.com/mapbox/pbf).

## Installation

```
npm install --save-dev @dishuostec/rollup-plugin-proto
```

## Usage

### rollup config
```javascript
// rollup.config.js
import proto from '@dishuostec/rollup-plugin-proto';

export default {
  input: './src/index.js',
  plugins: [
    proto()
  ],
};
```

### read & write
```proto
// demo.proto
syntax = "proto3";

message SearchRequest {
  required string query = 1;
  optional int32 page_number = 2;
  optional int32 result_per_page = 3;
}
```

```javascript
// index.js
import { SearchRequest } from './demo.proto';
import Pbf from 'pbf';

// read
const pbf = new Pbf(buffer);
const obj = SearchRequest.read(pbf);

// write
const pbf = new Pbf();
SearchRequest.write(obj, pbf);
const buffer = pbf.finish();
```

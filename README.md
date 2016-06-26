
ac-util-stream
===============

A collection of utility functions for streams.

Install
-------

```sh
npm install ac-util-stream --save
```

Usage
-----

##### utilStream.JsonWriter(writable)

```js
var utilStream = require('ac-util-stream');
var writeJson = utilStream.JsonWriter(process.stdout);
writeJson({foo:'bar'}); // -> {"foo":"bar"}\n
```

##### utilStream.TypedJsonWriter(writable | utilStream.JsonWriter)

```js
var utilStream = require('ac-util-stream');
var writeFooType = utilStream.TypedJsonWriter('foo', process.stdout);

writeFooType({foo: 'bar'});              // -> {"type":"foo","foo":"bar"}\n
writeFooType({type: 'foo', foo: 'bar'}); // -> {"type":"foo","foo":"bar"}\n
writeFooType({type: 'baz', foo: 'bar'}); // -> throws
```

##### utilStream.JsonLogger(writable | utilStream.JsonWriter)

```js
var utilStream = require('ac-util-stream');
var log = utilStream.JsonLogger(process.stdout);

log('foo %s', bar);       // -> {"type":"log","level":"log","message":"foo bar"}\n
log.log('foo %s', bar);   // -> {"type":"log","level":"log","message":"foo bar"}\n
log.error('foo %s', bar); // -> {"type":"log","level":"error","message":"foo bar"}\n
log.debug({ foo:'bar' }); // -> {"type":"log","level":"log","message":"{ foo: 'bar' }"}\n

```

Available log-levels translate directly to `console.*()`.

##### readable dataToJsonStream(data)

Creates a readable stream from data.

```js
var dataToJsonStream = require('ac-util-stream').dataToJsonStream;
dataToJsonStream('hello').pipe(process.stdout);
  // -> "hello"
```

##### readable arrayToJsonStream(data)

Creates a readable stream from an array of data.

```js
var dataToJsonStream = require('ac-util-stream').dataToJsonStream;
dataToJsonStream(['hello','world']).pipe(process.stdout);
  // -> "hello"
  //    "world"
```

##### Reuse `utilStream.JsonWriter`

```js
var utilStream = require('ac-util-stream');
var writeJson = utilStream.JsonWriter(process.stdout);
var writeFooType = utilStream.TypedJsonWriter('foo', writeJson);
var log = utilStream.JsonLogger(writeJson);

```

MIT License
-----------

Copyright (c) 2016 Oliver Leics <oliver.leics@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

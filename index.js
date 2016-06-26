'use strict';

var util = require('util');
var isStream = require('is-stream');
var PassThrough = require('stream').PassThrough;

module.exports = {
  JsonWriter: JsonWriter,
  TypedJsonWriter: TypedJsonWriter,
  JsonLogger: JsonLogger,

  dataToJsonStream: dataToJsonStream,
  arrayToJsonStream: arrayToJsonStream
};

function derefValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function JsonWriter(writable) {
  return writeJson;
  function writeJson(data) {
    writable.write(JSON.stringify(data)+'\n');
  }
}

function curryJsonWriter(writeJsonOrWritable) {
  if(!isStream.writable(writeJsonOrWritable)) {
    return writeJsonOrWritable;
  }
  return JsonWriter(writeJsonOrWritable);
}

function TypedJsonWriter(type, writeJson) {
  writeJson = curryJsonWriter(writeJson);
  return writeTypedJson;
  function writeTypedJson(data) {
    if(data.type == null) {
      data = derefValue(data);
      data.type = type;
    } else if(data.type !== type) {
      throw new Error('Type must be "'+type+'", but is "'+data.type+'"');
    }
    writeJson(data);
  }
}

function JsonLogger(writeJson) {
  writeJson = curryJsonWriter(writeJson);
  var logger = _mk('log');
  logger.log = logger;
  logger.info = _mk('info');
  logger.debug = _mk('debug');
  logger.warn = _mk('warn');
  logger.error = _mk('error');
  return logger;
  function _mk(level) {
    return function(){
      writeJson({
        type: 'log',
        level: level,
        message: util.format.apply(util, arguments)
      });
    };
  }
}

function dataToJsonStream(data) {
  var stream = new PassThrough();
  JsonWriter(stream)(data);
  stream.end();
  return stream;
}

function arrayToJsonStream(arr) {
  var stream = new PassThrough();
  var writeJson = JsonWriter(stream);
  arr.forEach(writeJson);
  stream.end();
  return stream;
}

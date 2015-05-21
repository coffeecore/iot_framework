var ConfThing    = require('./conf/thing');
var Thing        = require('./core/model/thing');

/* node_modules */
var Express      = require('express');
var BodyParser   = require("body-parser");
var IdGenerator  = require('id-generator');
var FileSystem   = require('fs');
var Slug         = require('slug');
var Schedule     = require('node-schedule');
var EventEmitter = require("events").EventEmitter;
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var safeOpts = { j : 1, wtimeout: 10000 };

var UserSchema  = new Schema({
    rut : { type:  String, unique: true, required: true },
    mobile : { type:  String, required: true, minlength: 8 },
    createdAt : { type: Date, default : Date.now },
    updatedAt : { type: Date }

}, {
    collection : 'users',
    safe : safeOpts
});

UserSchema.pre('save', function(next){
    this.updatedAt = new Date();;
    next();
});

module.exports = mongoose.model('User', UserSchema);

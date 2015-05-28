var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlayerSchema   = new Schema({
    name: String,
    position: String,
    infos: {
      height: Number,
      weight: Number,
      speed: Number
   },
   metas: {
      goal: Number,
      assist: Number,
      penalty: Number
   },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', PlayerSchema);

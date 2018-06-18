const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  likes: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

SongSchema.statics.like = function(id) {
  const Song = mongoose.model('song');

  return Song.findById(id).then(song => {
    ++song.likes;
    return song.save();
  });
};

SongSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song })
      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
}

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

mongoose.model('song', SongSchema);

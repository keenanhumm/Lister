const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        likes: { type: GraphQLInt }
      },
      resolve(parentValue, { title, likes }) {
        return (new Song({ title, likes })).save()
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      }
    },
    likeSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.like(id);
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;

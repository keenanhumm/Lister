const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const LyricType = require('./lyric_type');
const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
  name:  'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    likes: { type: GraphQLInt },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return Song.findLyrics(parentValue.id);
      }
    }
  })
});

module.exports = SongType;

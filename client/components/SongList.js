import React from "react";
import { graphql, compose } from "react-apollo";
import { fetchSongs, likeSong } from "../queries";
import gql from "graphql-tag";
import FlipMove from "react-flip-move";

class SongList extends React.Component {
  constructor(props) {
    super(props);
  }
  onSongDelete(id) {
    this.props
      .delete({
        variables: {
          id
        }
      })
      .then(() => {
        this.props.data.refetch();
      });
  }
  onLike(id, likes) {
    this.props
      .like({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          likeSong: {
            id: id,
            __typename: 'SongType',
            likes: likes + 1
          }
        }
      })
      .then(() => {
        this.props.data.refetch();
      });
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <div key={song.id} className="list-item">
          <div className="like">
            <i
              className="material-icons jump large like-icon"
              onClick={() => this.onLike(song.id,song.likes)}
            >
              thumb_up
            </i>

            {song.likes}
          </div>
          <div>{song.title}</div>

          <div>
            <i
              className="material-icons jump large"
              onClick={() => this.onSongDelete(song.id)}
            >
              delete
            </i>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div />;
    }
    return <FlipMove className="list-box">{this.renderSongs()}</FlipMove>;
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const augmentedSongList = compose(
  graphql(mutation, {
    name: "delete"
  }),
  graphql(likeSong(), {
    name: "like"
  }),
  graphql(fetchSongs())
)(SongList);

export default augmentedSongList;

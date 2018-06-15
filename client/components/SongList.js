import React from "react";
import { graphql } from 'react-apollo';
import { fetchSongs } from '../queries';
import gql from 'graphql-tag';
import FlipMove from 'react-flip-move';


class SongList extends React.Component {
  constructor(props){
    super(props);
  }
  onSongDelete(id){
    this.props.mutate({
        variables: {
          id
        }
      }).then(() => {
        this.props.data.refetch();
      }
    );
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return <div key={song.id} className="list-item">
          {song.title}
          <i 
            className="material-icons jump large"
            onClick={() => this.onSongDelete(song.id)}
          >
            delete
          </i>
        </div>;
    });
  }

  render() {
    if(this.props.data.loading) { return <div></div> };
    return (  
        <FlipMove className="list-box">
          {this.renderSongs()}
        </FlipMove>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs())(SongList));

import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import { fetchSongs } from "../queries";
import validator from 'validator';

class SongCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }
  onSubmit(event) {
    event.preventDefault();
    if (!(validator.isEmpty(this.state.title)) && validator.isAlpha(this.state.title) && this.state.title.length < 20) {
      this.props
        .mutate({
          variables: {
            title: this.state.title,
            likes: 0
          },
          refetchQueries: [
            {
              query: fetchSongs()
            }
          ]
        })
        .then(() => {
          hashHistory.push("/");
        });
    }
  }
  render() {
    return (
      <div className="container app-container create-box">
        <Link to="/" className="button">
          <i className="material-icons large">arrow_back</i>
        </Link>
        <br />
        <br />
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            className="create-input"
            value={this.state.title}
            onChange={event => {
              this.setState({ title: event.target.value });
            }}
            type="text"
            placeholder="Insert first name here"
          />
          {this.state.title !== "" && (
            <button className="button" type="submit">
              DONE
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String, $likes: Int) {
    addSong(title: $title, likes: $likes) {
      id
      title
      likes
    }
  }
`;

export default graphql(mutation)(SongCreate);

import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import { fetchSongs } from "../queries";

class SongCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.state.title !== "") {
      this.props
        .mutate({
          variables: {
            title: this.state.title
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
            placeholder="Name of item here"
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
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
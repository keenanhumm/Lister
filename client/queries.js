import gql from "graphql-tag";

export const fetchSongs = () => gql`
  {
    songs {
      id
      title
      likes
    }
  }
`;

export const likeSong = () => gql`
  mutation LikeSong($id: ID) {
    likeSong(id: $id) {
      id
      likes
    }
  }
`;

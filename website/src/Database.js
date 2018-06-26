import gql from "graphql-tag";

export const seasonQuery = gql`
  query {
    allSeasons(orderBy: number_ASC) {
      id
      number
      weeks(orderBy: number_ASC) {
        number
        challenges(orderBy: number_ASC) {
          number
          icon
          description
          coord
        }
      }
    }
  }
`;

export const promotedContentQuery = gql`
  query {
    allPromotedContents {
      id
      title
      media
      imageUrl
      link
    }
  }
`;

export const iconQuery = gql`
  query {
    allIcons {
      id
      name
      width
      height
      imageUrl
    }
  }
`;

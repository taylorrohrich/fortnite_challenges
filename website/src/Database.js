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

export const createChallenge = gql`
  mutation(
    $season: ID!
    $week: Int!
    $description: String!
    $coord: [Json!]!
    $icon: String!
    $number: Int!
  ) {
    createEntry(
      week: $week
      season: $season
      description: $description
      coord: $coord
      icon: $icon
      number: $number
    ) {
      id
    }
  }
`;

export const createPromotedContent = gql`
  mutation($title: String!, $media: String!, $imageUrl: String!) {
    createPromotedContent(title: $title, media: $media, imageUrl: $imageUrl) {
      id
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

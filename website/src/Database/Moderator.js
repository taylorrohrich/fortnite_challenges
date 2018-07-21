import gql from "graphql-tag";

export const allSeasonQuery = gql`
  query {
    allSeasons(orderBy: number_ASC) {
      isActive
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

export const createActiveSeason = gql`
  mutation($seasonId: ID!) {
    createActiveSeason(seasonId: $seasonId) {
      id
    }
  }
`;
export const createSeason = gql`
  mutation($number: Int!) {
    createSeason(number: $number) {
      id
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
  mutation(
    $title: String!
    $media: String!
    $imageUrl: String!
    $link: String!
  ) {
    createPromotedContent(
      title: $title
      media: $media
      imageUrl: $imageUrl
      link: $link
    ) {
      id
    }
  }
`;

export const updatePromotedContent = gql`
  mutation($id: ID!, $title: String!, $media: String!, $imageUrl: String!) {
    updatePromotedContent(
      id: $id
      title: $title
      media: $media
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;
export const deletePromotedContent = gql`
  mutation($id: ID!) {
    deletePromotedContent(id: $id) {
      id
    }
  }
`;

export const createIcon = gql`
  mutation($width: Int!, $height: Int!, $name: String!, $imageUrl: String!) {
    createIcon(
      name: $name
      width: $width
      height: $height
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;

export const updateIcon = gql`
  mutation(
    $id: ID!
    $width: Int!
    $height: Int!
    $name: String!
    $imageUrl: String!
  ) {
    updateIcon(
      id: $id
      name: $name
      width: $width
      height: $height
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;
export const deleteIcon = gql`
  mutation($id: ID!) {
    deleteIcon(id: $id) {
      id
    }
  }
`;

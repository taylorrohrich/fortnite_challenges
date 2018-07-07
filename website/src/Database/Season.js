import gql from "graphql-tag";

export const activeSeasonNumberQuery = gql`
  query {
    allSeasons(filter: { isActive: true }) {
      number
    }
  }
`;
export const SeasonNumberQuery = gql`
  query {
    allSeasons(orderBy: number_DESC) {
      number
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

export const seasonQuery = gql`
  query($number: Int!) {
    allSeasons(filter: { number: $number }) {
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

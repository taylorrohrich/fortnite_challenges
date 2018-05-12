const { fromEvent } = require("graphcool-lib");

module.exports = event => {
  const graphcool = fromEvent(event);
  const api = graphcool.api("simple/v1");
  let description = event.data.description;
  let coord = event.data.coord;
  let icon = event.data.icon;
  let seasonId = event.data.season;
  let week = event.data.week;
  let challengeNumber = event.data.number;
  const query = `
  query($number: Int!, $seasonId: ID!){
    allWeeks(filter:{
           season:{id: $seasonId}
      number: $number
    }){
      id
      challenges{
          number
          id
      }
    }
  }
`;
  const variables = {
    number: week,
    seasonId: seasonId
  };
  return api.request(query, variables).then(response => {
    let weekId = "";
    let weekData = response.allWeeks;
    console.log(weekData);
    if (!weekData.length) {
      const variables = {
        number: week,
        seasonId: seasonId
      };
      const mutation = `
        mutation($number:Int!, $seasonId:ID!){
            createWeek(number: $number, seasonId: $seasonId){
              id
            }
          }
      `;
      return api.request(mutation, variables).then(response => {
        weekId = response.createWeek.id;
        const variables = {
          description: description,
          weekId: weekId,
          coord: coord,
          icon: icon,
          number: challengeNumber
        };
        const mutation = `
            mutation($weekId: ID!, $description: String!, $coord: [Json!]!, $icon: String!, $number: Int!){
                createChallenge(weekId: $weekId, description: $description, coord: $coord, icon: $icon, number: $number){
                  id
                }
              }
          `;
        return api
          .request(mutation, variables)
          .then(response => {
            console.log(response);

            return { data: { id: response.createChallenge.id } };
          })
          .catch(e => {
            console.log(e);
          });
      });
    } else {
      weekId = weekData[0].id;
      weekChallenges = weekData[0].challenges;
      let cFound = weekChallenges.find(c => {
        return c.number == challengeNumber;
      });

      if (cFound && cFound.id) {
        console.log(cFound.id);
        const variables = {
          description: description,
          weekId: weekId,
          coord: coord,
          icon: icon,
          number: challengeNumber,
          id: cFound.id
        };
        const mutation = `
          mutation($id: ID!, $weekId: ID!, $description: String!, $coord: [Json!]!, $icon: String!, $number: Int!){
              updateChallenge(id: $id, weekId: $weekId, description: $description, coord: $coord, icon: $icon, number: $number){
                id
              }
            }
        `;
        return api
          .request(mutation, variables)
          .then(response => {
            console.log(response);

            return { data: { id: response.updateChallenge.id } };
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        const variables = {
          description: description,
          weekId: weekId,
          coord: coord,
          icon: icon,
          number: challengeNumber
        };
        const mutation = `
      mutation($weekId: ID!, $description: String!, $coord: [Json!]!, $icon: String!, $number: Int!){
          createChallenge(weekId: $weekId, description: $description, coord: $coord, icon: $icon, number: $number){
            id
          }
        }
    `;
        return api
          .request(mutation, variables)
          .then(response => {
            console.log(response);

            return { data: { id: response.createChallenge.id } };
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  });
};

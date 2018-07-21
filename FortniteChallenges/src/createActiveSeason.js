const { fromEvent } = require("graphcool-lib");

module.exports = event => {
  const graphcool = fromEvent(event),
    api = graphcool.api("simple/v1"),
    { seasonId } = event.data;
  variables = { seasonId };
  (query = `
  query{
      allSeasons(filter: {isActive: true}){
        id
      }
      }
`),
    (updateMutation = `
  mutation($id: ID!, $isActive: Boolean!){
    updateSeason(id: $id,isActive: $isActive){
      id
    }
  }
  `);
  return api.request(query).then(response => {
    console.log(response);
    const id = response.allSeasons[0].id;
    if (id) {
      return api
        .request(updateMutation, { id, isActive: false })
        .then(response => {
          return api
            .request(updateMutation, { id: seasonId, isActive: true })
            .then(response => {
              return { data: { id: response.updateSeason.id } };
            });
        });
    } else {
      return api
        .request(updateMutation, { id: seasonId, isActive: true })
        .then(response => {
          return { data: { id: response.updateSeason.id } };
        });
    }
  });
};

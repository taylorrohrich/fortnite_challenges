const { fromEvent } = require("graphcool-lib");

module.exports = event => {
  const graphcool = fromEvent(event),
    api = graphcool.api("simple/v1"),
    { number, isActive } = event.data;
  variables = { number, isActive };
  (query = `
  query{
      allSeasons(filter: {isActive: true}){
        id
      }
      }
`),
    (mutation = `mutation($number: Int!, $isActive: Boolean!){
    createSeason(
      number: $number,
      isActive: $isActive
    ){
      id
    }
  }`),
    (updateMutation = `
  mutation($id: ID!){
    updateSeason(id: $id,isActive:false){
      id
    }
  }
  `);
  if (isActive) {
    return api.request(query).then(response => {
      console.log(response);
      const id = response.allSeasons[0].id;
      if (id) {
        return api.request(updateMutation, { id }).then(response => {
          return api.request(mutation, variables).then(response => {
            return { data: { id: response.createSeason.id } };
          });
        });
      } else {
        return api.request(mutation, variables).then(response => {
          return { data: { id: response.createSeason.id } };
        });
      }
    });
  }
  return api.request(mutation, variables).then(response => {
    return { data: { id: response.createSeason.id } };
  });
};

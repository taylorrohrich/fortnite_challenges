import { some } from "lodash";

export const mutation = (variables, mutationFn, callback) => {
  if (some(variables, variable => variable === null)) {
    alert("not all fields filled out");
  } else {
    mutationFn({ variables }).then(response => {
      console.log(response);
      callback && callback();
    });
  }
};

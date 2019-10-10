import { makeStyle } from "@material-ui/core/styles";

export const useStyle = makeStyle(theme => {
  return {
    container: {
      overflow: "hidden"
    }
  };
});

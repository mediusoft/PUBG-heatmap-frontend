import React from "react";
import { Header, ScrollTop } from "components";
import AppRouter from "routes/AppRouter";
import { Fab, Icon } from "@material-ui/core";

const App = ({ url, ...props }) => {
  return (
    <>
      <Header />
      <AppRouter url={url} />
      <ScrollTop {...props}>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <Icon fontSize="large">keyboard_arrow_up</Icon>
        </Fab>
      </ScrollTop>
    </>
  );
};

export default App;

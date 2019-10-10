import React from "react";
import ReactGA from "react-ga";

// From: https://github.com/react-ga/react-ga/issues/122#issuecomment-320436578
export class Analytics extends React.Component {
  constructor(props) {
    super(props);

    this.sendPageChange(props.location.pathname, props.location.search);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (
      location.pathname !== prevProps.location.pathname ||
      location.search !== prevProps.location.search
    ) {
      this.sendPageChange(location.pathname, location.search);
    }
  }

  sendPageChange = (pathname, search = "") => {
    const page = pathname + search;

    if (process.env.NODE_ENV === "production") {
      ReactGA.set({ page });
      ReactGA.pageview(page);
    }
  };

  render() {
    return null;
  }
}

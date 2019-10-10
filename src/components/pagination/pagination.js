import React, { useState } from "react";
import { Icon, IconButton } from "@material-ui/core";
import { pageDisplayedPages } from "UIServices/jobUIService";
import { useStyles } from "./pagination.style";

export const Pagination = ({ pageCount = 5, displayedRange = 5, currentPage = 1 }) => {
  const classes = useStyles();
  const [count] = useState(pageCount);
  const [range] = useState(displayedRange);
  const [activePage, setActivePage] = useState(currentPage);

  const isPreviousDisabled = () => {
    return activePage === 1;
  };

  const isNextDisabled = () => {
    return activePage >= count;
  };

  const pages = pageDisplayedPages({ count, range, activePage });

  return (
    <div className={classes.container}>
      <nav className={classes.pagination}>
        <ul>
          <li className={classes.paginationArrow}>
            <IconButton
              disabled={isPreviousDisabled()}
              onClick={() => setActivePage(activePage - 1)}
            >
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
          </li>
          {pages.map(page => {
            return (
              <li>
                <IconButton
                  onClick={() => setActivePage(page)}
                  className={page === activePage && classes.current}
                >
                  {page}
                </IconButton>
              </li>
            );
          })}
          <li className={classes.paginationArrow}>
            <IconButton disabled={isNextDisabled()} onClick={() => setActivePage(activePage + 1)}>
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";

import TruncatedList from "../index";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    alignItems: "center",
    width: "18rem",
    height: "5.25rem",
    border: "1px solid black",
    "& > *": {
      margin: "0.25rem",
    },
  },
  "root--expanded": {
    height: "auto",
  },
});

export const expanding = () => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  return (
    <TruncatedList
      className={`${classes.root} ${expanded ? classes["root--expanded"] : ""}`}
      alwaysShowTruncator
      renderTruncator={({ hiddenItemsCount }) => {
        if (hiddenItemsCount) {
          return (
            <Link component="button" onClick={() => setExpanded(true)}>
              {hiddenItemsCount} more...
            </Link>
          );
        } else {
          return (
            <Link component="button" onClick={() => setExpanded(false)}>
              Hide
            </Link>
          );
        }
      }}
    >
      <Chip label="foo" />
      <Chip label="bar" />
      <Chip label="baz" />
      <Chip label="qux" />
      <Chip label="quux" />
      <Chip label="corge" />
      <Chip label="grault" />
      <Chip label="waldo" />
      <Chip label="fred" />
      <Chip label="plugh" />
      <Chip label="xyzzy" />
      <Chip label="thud" />
    </TruncatedList>
  );
};

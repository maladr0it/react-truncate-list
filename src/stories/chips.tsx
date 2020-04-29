import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import TruncatedList from "../index";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    alignItems: "center",
    width: "15rem",
    height: "5.25rem",
    resize: "both",
    border: "1px solid black",
  },
  item: {
    margin: "0.25rem",
  },
});

export const chips = () => {
  const classes = useStyles();

  return (
    <TruncatedList
      className={classes.root}
      itemClassName={classes.item}
      renderTruncator={({ hiddenItemsCount }) => (
        <Chip label={`+${hiddenItemsCount}`} />
      )}
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

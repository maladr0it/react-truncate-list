import { useState } from "react";
import { TruncatedList } from "react-truncate-list";
import "react-truncate-list/dist/styles.css";

import "./App.css";

const ITEMS = ["foo", "bar", "baz", "qux", "quux", "corge", "grault", "waldo", "fred", "plugh", "xyzzy", "thud"];

export const App = () => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState(ITEMS);
  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);

  const addItem = () => {
    setItems((prev) => ITEMS.slice(0, prev.length + 1));
  };

  const removeItem = () => {
    setItems((prev) => ITEMS.slice(0, prev.length - 1));
  };

  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <button onClick={removeItem}>Remove item</button>

      <h1>Default behavior</h1>
      <div className="demo">
        <TruncatedList
          className="list resizable"
          renderTruncator={({ hiddenItemsCount }) => <div className="listItem">+{hiddenItemsCount} more</div>}
        >
          {items.map((item) => (
            <div className="listItem">{item}</div>
          ))}
        </TruncatedList>
      </div>

      <h1>RTL</h1>
      <div className="demo" dir="rtl">
        <TruncatedList
          className="list resizable"
          renderTruncator={({ hiddenItemsCount }) => <div className="listItem">+{hiddenItemsCount} more</div>}
        >
          {items.map((item) => (
            <div className="listItem">{item}</div>
          ))}
        </TruncatedList>
      </div>

      <h1>Interactive truncator</h1>
      <div className="demo">
        <TruncatedList
          className={`list expandable ${expanded ? "expanded" : ""}`}
          alwaysShowTruncator
          renderTruncator={({ hiddenItemsCount }) => {
            if (hiddenItemsCount > 0) {
              return (
                <button className="expandButton" onClick={expand}>
                  {hiddenItemsCount} more...
                </button>
              );
            } else {
              return (
                <button className="expandButton" onClick={collapse}>
                  hide
                </button>
              );
            }
          }}
        >
          {items.map((item) => (
            <div className="listItem">{item}</div>
          ))}
        </TruncatedList>
      </div>
    </div>
  );
};

export default App;

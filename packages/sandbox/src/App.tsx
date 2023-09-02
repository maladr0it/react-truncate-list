import { useState, useEffect } from "react";
import { TruncatedList } from "react-truncate-list";
import "react-truncate-list/dist/styles.css";

import "./App.css";

const ITEMS = ["foo", "bar", "baz", "qux", "quux", "corge", "grault", "waldo", "fred", "plugh", "xyzzy", "thud"];

const INITIAL_ITEMS = Array.from({ length: 1 }, () => ITEMS).flat(1);

type ItemProps = {
  id: string;
  onClick: () => void;
};

const Item = ({ id, onClick }: ItemProps) => {
  useEffect(() => {
    console.log("mounted", id);
  }, []);

  return (
    <div className="listItem">
      {id}
      <button onClick={onClick}>x</button>
      <input />
    </div>
  );
};

export const App = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(true);
  };

  const collapse = () => {
    setExpanded(false);
  };

  const addItem = () => {
    setItems((prev) => [...prev, ITEMS[prev.length % ITEMS.length]]);
  };

  const removeItem = () => {
    setItems((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <button onClick={removeItem}>Remove item</button>

      <h1>Default behavior</h1>
      <div className="demo">
        <TruncatedList
          className="list resizable"
          onUpdate={(truncate) => {
            console.log("trunc");
            truncate();
          }}
          renderTruncator={({ hiddenItemsCount }) => <div className="listItem">+{hiddenItemsCount}</div>}
        >
          {items.map((item, i) => (
            <Item key={item} id={item} onClick={() => deleteItem(item)} />
          ))}
        </TruncatedList>
      </div>

      <h1>RTL</h1>
      <div className="demo" dir="rtl">
        <TruncatedList
          className="list resizable"
          renderTruncator={({ hiddenItemsCount }) => <div className="listItem">+{hiddenItemsCount}</div>}
        >
          {items.map((item, i) => (
            <div key={i} className="listItem">
              {item}
            </div>
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
            }
            return (
              <button className="expandButton" onClick={collapse}>
                hide
              </button>
            );
          }}
        >
          {items.map((item, i) => (
            <div key={i} className="listItem">
              {item}
            </div>
          ))}
        </TruncatedList>
      </div>
    </div>
  );
};

export default App;

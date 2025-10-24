import { useState } from "react";
import { TruncatedList } from "react-truncate-list";
import "react-truncate-list/dist/styles.css";
import { useDebouncedCallback } from "use-debounce";

import "./App.css";

const ITEMS = ["foo", "bar", "baz", "qux", "quux", "corge", "grault", "waldo", "fred", "plugh", "xyzzy", "thud"];

const INITIAL_ITEMS = Array.from({ length: 1 }, () => ITEMS).flat(1);

const DEBOUNCE_TIMES = [100, 1000];

export const App = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [expanded, setExpanded] = useState(false);
  const [debounceTime, setDebounceTime] = useState(DEBOUNCE_TIMES[0]);

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

  const handleResize = useDebouncedCallback((bag: { truncate: () => void }) => {
    bag.truncate();
  }, debounceTime);

  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <button onClick={removeItem}>Remove item</button>

      <h1>Default behavior</h1>
      <div className="demo">
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

      <h1>Debounced truncation</h1>

      <div className="demo">
        <fieldset>
          <legend>Debounce time (ms)</legend>
          {DEBOUNCE_TIMES.map((time) => (
            <label key={time} className="radio-label">
              <input
                type="radio"
                value="debounce"
                checked={debounceTime === time}
                onChange={() => setDebounceTime(time)}
              />
              {time}
            </label>
          ))}
        </fieldset>

        <TruncatedList
          className="list resizable"
          onResize={handleResize}
          renderTruncator={({ hiddenItemsCount }) => <div className="listItem">+{hiddenItemsCount}</div>}
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

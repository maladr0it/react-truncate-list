import React, { useState } from "react";
import TruncatedList from "react-truncate-list";
import "react-truncate-list/dist/styles.css";

import "./App.css";

export const App = () => {
  const [expanded, setExpanded] = useState(false);
  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);

  return (
    <div>
      <h1>react-truncate-list</h1>
      <h2>Use-case</h2>
      <p>
        The same component can be used for mobile and desktop, and the items
        will be truncated appropriately.
      </p>
      <div className="demo">
        <section className="card mobile">
          <h3>Skills</h3>
          <TruncatedList
            className="list"
            renderTruncator={({ hiddenItemsCount }) => (
              <div className="listItem">+{hiddenItemsCount}</div>
            )}
          >
            <div className="listItem">UX</div>
            <div className="listItem">JavaScript</div>
            <div className="listItem">TypeScript</div>
            <div className="listItem">React</div>
            <div className="listItem">Redux</div>
            <div className="listItem">GraphQL</div>
            <div className="listItem">Webpack</div>
            <div className="listItem">Node.js</div>
            <div className="listItem">Express</div>
            <div className="listItem">Firebase</div>
            <div className="listItem">Git</div>
          </TruncatedList>
        </section>

        <br />

        <section className="card desktop">
          <h3>Skills</h3>
          <TruncatedList
            className="list"
            renderTruncator={({ hiddenItemsCount }) => (
              <div className="listItem">+{hiddenItemsCount}</div>
            )}
          >
            <div className="listItem">UX</div>
            <div className="listItem">JavaScript</div>
            <div className="listItem">TypeScript</div>
            <div className="listItem">React</div>
            <div className="listItem">Redux</div>
            <div className="listItem">GraphQL</div>
            <div className="listItem">Webpack</div>
            <div className="listItem">Node.js</div>
            <div className="listItem">Express</div>
            <div className="listItem">Firebase</div>
            <div className="listItem">Git</div>
          </TruncatedList>
        </section>
      </div>

      <h2>Playground</h2>
      <p>Resize to see it adapt to different container sizes</p>
      <div className="demo">
        <TruncatedList
          className="list resizable"
          renderTruncator={({ hiddenItemsCount }) => (
            <div className="listItem">+{hiddenItemsCount}</div>
          )}
        >
          <div className="listItem">foo</div>
          <div className="listItem">bar</div>
          <div className="listItem">baz</div>
          <div className="listItem">qux</div>
          <div className="listItem">quux</div>
          <div className="listItem">corge</div>
          <div className="listItem">grault</div>
          <div className="listItem">waldo</div>
          <div className="listItem">fred</div>
          <div className="listItem">plugh</div>
          <div className="listItem">xyzzy</div>
          <div className="listItem">thud</div>
        </TruncatedList>
      </div>

      <h2>Expandable list</h2>
      <p>The truncator can have advanced behaviour as seen here</p>
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
          <div className="listItem">foo</div>
          <div className="listItem">bar</div>
          <div className="listItem">baz</div>
          <div className="listItem">qux</div>
          <div className="listItem">quux</div>
          <div className="listItem">corge</div>
          <div className="listItem">grault</div>
          <div className="listItem">waldo</div>
          <div className="listItem">fred</div>
          <div className="listItem">plugh</div>
          <div className="listItem">xyzzy</div>
          <div className="listItem">thud</div>
        </TruncatedList>
      </div>
    </div>
  );
};

export default App;

import React, { useRef, useLayoutEffect } from "react";

import "./styles.css";

type RenderTruncator = ({
  hiddenItemsCount,
}: {
  hiddenItemsCount: number;
}) => React.ReactNode;

export type TruncatedListProps = {
  renderTruncator: RenderTruncator;
  children?: React.ReactNode;
  alwaysShowTruncator?: boolean;
  className?: string;
  itemClassName?: string;
  truncatorClassName?: string;
  style?: React.CSSProperties;
};

const TruncatedList = ({
  renderTruncator,
  alwaysShowTruncator,
  children,
  className,
  itemClassName,
  truncatorClassName,
  style,
}: TruncatedListProps) => {
  const containerRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const truncate = () => {
      if (!containerRef.current) {
        return;
      }

      containerRef.current.style.overflow = "hidden";

      const childNodes = Array.from(
        containerRef.current.children,
      ) as HTMLElement[];

      for (let node of childNodes) {
        node.hidden = true;
      }

      if (childNodes.length === 0) {
        return;
      }

      let i: number; // Declare outside the loop so we can check it afterward
      for (i = 1; i < childNodes.length; i += 2) {
        const itemEl = childNodes[i];
        const truncatorEl = childNodes[i + 1];

        itemEl.hidden = false;
        truncatorEl.hidden = false;
        const truncatorRect = truncatorEl.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        truncatorEl.hidden = true;

        // If truncator is outside of the container
        if (
          truncatorRect.bottom > containerRect.bottom ||
          truncatorRect.right > containerRect.right
        ) {
          itemEl.hidden = true;
          if (i >= 1) {
            childNodes[i - 1].hidden = false;
          }
          break;
        }
      }

      // If all items were inside the container but we still wish to show the truncator
      if (i === childNodes.length && alwaysShowTruncator) {
        childNodes[childNodes.length - 1].hidden = false;
      }
    };

    truncate();

    const resizeObserver = new ResizeObserver((entries: any) => {
      for (let _ of entries) {
        truncate();
      }
    });

    // Copy to a variable so the ref in the cleanup effect targets the correct node
    const containerEl = containerRef.current;

    if (containerEl) {
      resizeObserver.observe(containerEl);
    }

    return () => {
      if (containerEl) {
        resizeObserver.unobserve(containerEl);
      }
    };
  }, [children, alwaysShowTruncator, className, style]);

  const childArray = React.Children.toArray(children);

  const getTruncator = (i: number) => (
    <li className={truncatorClassName} hidden>
      {renderTruncator({ hiddenItemsCount: i })}
    </li>
  );

  const items = childArray.map((item, i) => (
    <React.Fragment key={i}>
      <li className={itemClassName}>{item}</li>
      {getTruncator(childArray.length - 1 - i)}
    </React.Fragment>
  ));

  return (
    <ul
      ref={containerRef}
      className={`react-truncate-list ${className || ""}`}
      style={style}
    >
      {getTruncator(childArray.length)}
      {items}
    </ul>
  );
};

export default TruncatedList;

import React, { useRef, useLayoutEffect } from "react";

import "./styles.css";

type RenderTruncator = ({ hiddenItemsCount }: { hiddenItemsCount: number }) => React.ReactNode;

export type TruncatedListProps = {
  renderTruncator: RenderTruncator;
  children?: React.ReactNode;
  alwaysShowTruncator?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const rectContainsRect = (parent: DOMRect, child: DOMRect) => {
  return (
    child.top >= parent.top && child.bottom <= parent.bottom && child.left >= parent.left && child.right <= parent.right
  );
};

export const TruncatedList = ({
  renderTruncator,
  alwaysShowTruncator,
  children,
  className,
  style,
}: TruncatedListProps) => {
  const containerRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const truncate = () => {
      if (!containerRef.current) {
        return;
      }

      containerRef.current.style.overflow = "hidden";
      const childNodes = Array.from(containerRef.current.children) as HTMLElement[];

      // Show all items, hide all truncators.
      for (let i = 0; i < childNodes.length; ++i) {
        childNodes[i].hidden = i % 2 === 0;
      }

      // If there are no items (the last truncator is always included).
      if (childNodes.length === 1) {
        return;
      }

      //
      // Test if truncation is necessary.
      //
      if (alwaysShowTruncator) {
        // if the last truncator fits, exit
        const truncatorEl = childNodes[childNodes.length - 1];
        truncatorEl.hidden = false;

        if (rectContainsRect(containerRef.current.getBoundingClientRect(), truncatorEl.getBoundingClientRect())) {
          return;
        }
        truncatorEl.hidden = true;
      } else {
        // if the last item fits, exit
        const itemEl = childNodes[childNodes.length - 2];

        if (rectContainsRect(containerRef.current.getBoundingClientRect(), itemEl.getBoundingClientRect())) {
          return;
        }
      }

      //
      // Go backward and find the last truncator that can fit.
      //
      for (let i = childNodes.length - 2; i >= 1; i -= 2) {
        const itemEl = childNodes[i];
        const truncatorEl = childNodes[i - 1];
        itemEl.hidden = true;
        truncatorEl.hidden = false;

        if (rectContainsRect(containerRef.current.getBoundingClientRect(), truncatorEl.getBoundingClientRect())) {
          return;
        }

        truncatorEl.hidden = true;
      }
    };

    truncate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let _ of entries) {
        truncate();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [children, alwaysShowTruncator, className, style]);

  const childArray = React.Children.toArray(children);

  const items = childArray.map((item, i) => (
    <React.Fragment key={i}>
      <li hidden>{renderTruncator({ hiddenItemsCount: childArray.length - i })}</li>
      <li>{item}</li>
    </React.Fragment>
  ));

  return (
    <ul ref={containerRef} className={`react-truncate-list ${className || ""}`} style={style}>
      {items}

      <li hidden>{renderTruncator({ hiddenItemsCount: 0 })}</li>
    </ul>
  );
};

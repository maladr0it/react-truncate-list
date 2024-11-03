import { useCallback, useRef, useLayoutEffect, Children, Fragment, type ReactNode, type CSSProperties } from "react";

type RenderTruncator = (state: { hiddenItemsCount: number }) => ReactNode;

export type TruncatedListProps = {
  renderTruncator: RenderTruncator;
  children?: ReactNode;
  alwaysShowTruncator?: boolean;
  className?: string;
  style?: CSSProperties;
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
  console.log("rendering list");

  const containerRef = useRef<HTMLUListElement>(null);

  const truncate = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    const childNodes = Array.from(containerRef.current.children) as HTMLElement[];

    //
    // Put the list in its initial state.
    //
    // Change from a scrollable container to overflow: hidden during hydration
    containerRef.current.style.overflow = "hidden";
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
    // Truncation is necessary - binary search to find the last truncator that can fit.
    //
    const numTruncators = Math.floor((childNodes.length - 1) / 2);
    let left = 0;
    let right = numTruncators - 1;
    let truncatorIndex: number | null = null;

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);

      // show all items before the truncator
      for (let i = 0; i < middle; i += 1) {
        childNodes[i * 2 + 1].hidden = false;
      }
      // hide all items after the truncator
      for (let i = middle; i < numTruncators; i += 1) {
        childNodes[i * 2 + 1].hidden = true;
      }

      const truncatorEl = childNodes[middle * 2];
      truncatorEl.hidden = false;

      // check if this truncator fits
      if (rectContainsRect(containerRef.current.getBoundingClientRect(), truncatorEl.getBoundingClientRect())) {
        truncatorIndex = middle;
        left = middle + 1;
      } else {
        right = middle - 1;
      }

      truncatorEl.hidden = true;
    }

    // If we didn't find a truncator that fits, everything will be hidden at this point and we can exit early
    if (truncatorIndex === null) {
      return;
    }

    //
    // Now we have found the last truncator that fits, show it.
    //
    // show all items before the truncator
    for (let i = 0; i < truncatorIndex; i += 1) {
      childNodes[i * 2 + 1].hidden = false;
    }
    // hide all items after truncator
    for (let i = truncatorIndex; i < numTruncators; i += 1) {
      childNodes[i * 2 + 1].hidden = true;
    }
    const truncatorEl = childNodes[truncatorIndex * 2];
    truncatorEl.hidden = false;
  }, [children, alwaysShowTruncator]);

  // Set up a resize observer
  useLayoutEffect(() => {
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
  }, [truncate]);

  const childArray = Children.toArray(children);

  const items = childArray.map((item, i) => (
    <Fragment key={i}>
      <li hidden>{renderTruncator({ hiddenItemsCount: childArray.length - i })}</li>
      <li>{item}</li>
    </Fragment>
  ));

  return (
    <ul ref={containerRef} className={`react-truncate-list ${className ?? ""}`} style={style}>
      {items}

      <li hidden>{renderTruncator({ hiddenItemsCount: 0 })}</li>
    </ul>
  );
};

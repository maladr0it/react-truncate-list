# react-truncate-list

Truncate a list of elements with a symbol or component of your choice.

- no opinionated styles - fully customizable
- < 1kb bundle size
- SSR friendly

## Demos

### 1. Interactive Sandbox
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/maladr0it/react-truncate-list?file=packages/sandbox/src/App.tsx)

*Note: StackBlitz WebContainers may not work in Safari.*

### 2. Static Preview
[View Live Demo](https://maladr0it.github.io/react-truncate-list/)
*Works in all browsers.*

## Purpose

Have you ever needed to make something like the design below?

![img](images/use-case.png)

This is surprisingly hard to accomplish, as there is no way to know ahead of time how many items can fit within the space available. This is a low-level library to give you the tools necessary to make this a breeze.

## Installation

1. Add the `react-truncate-list` package

```bash
npm i react-truncate-list
```

2. If your project targets older browsers, add the `resize-observer-polyfill` package to support the `ResizeObserver` API (https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

```bash
npm i resize-observer-polyfill
```

3. Import the package and its required CSS and use it 🚀

```js
import { TruncatedList } from "react-truncate-list";
import "react-truncate-list/dist/styles.css";
```

## How to use

This library simply provides an unstyled `<ul>` that will render a component of your choice after the last item that fits within it before overflowing. It is up to you to provide a `max-height` or some other constraint on its dimensions so that it will experience overflow behaviour.

Please see the [interactive demo](https://stackblitz.com/github/maladr0it/react-truncate-list?file=packages/sandbox/src/App.tsx) for concrete examples for how the library can be used. As this is a low-level library, it takes a little more work than you may be used to. However this will empower you to customise the list to look and behave exactly as you need.

## API

### Props

```ts
type RenderTruncatorFn = (state: { hiddenItemsCount: number }) => React.ReactNode;

type OnResizeFn = (bag: { truncate: () => void }) => void;

type Props = {
  renderTruncator: RenderTruncatorFn;
  alwaysShowTruncator?: boolean;
  onResize?: OnResizeFn
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};
```

### `renderTruncator`

A render function called to display a 'truncator' after the last item before overflowing the container.

```
renderTruncator={({ hiddenItemsCount }) => (
  <span>{hiddenItemsCount} more items...</span>
)}
```

### `children` (optional)

Pass the list items as children. Each child will be automatically wrapped in an `<li>`.

### `alwaysShowTruncator` (optional)

Always show the 'truncator', even when all items are visible. Useful for advanced use-cases such as an expanding list.

### `onResize` (optional)

Pass a callback for when the list resizes. You can use this to debounce the truncating effect for performance reasons, If you use this, you must manually call the provided truncate() function in your callback.

See the `Debounced truncation` example in the [demo](https://stackblitz.com/edit/vitejs-vite-lpmpeh?file=src%2FApp.tsx).


## SSR

Before hydration, the list will have `overflow: auto` applied to it so that it is scrollable. Once hydrated in the client, a layout effect will fire, shortening the list and inserting the 'truncator'.

## Contributing

### Local development environment

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

This will start the library sandbox. Changes to the library will be reflected instantly.

# react-truncate-list

Truncate a list of elements with a symbol or component of your choice.

- no opinionated styles - fully customizable
- < 1kb bundle size
- SSR friendly

## Demo

A [demo](https://codesandbox.io/s/react-truncate-list-demo-okc5e) is worth a thousand words.

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

Please see the [demo](https://codesandbox.io/s/react-truncate-list-demo-okc5e) for concrete examples for how the library can be used. As this is a low-level library, it takes a little more work than you may be used to. However this will empower you to customise the list to look and behave exactly as you need.

## API

### Props

```ts
type RenderTruncator = ({ hiddenItemsCount }: { hiddenItemsCount: number }) => React.ReactNode;

type Props = {
  renderTruncator: RenderTruncator;
  children?: React.ReactNode;
  alwaysShowTruncator?: boolean;
  className?: string;
  style?: React.CSSProperties;
};
```

### `renderTruncator`

A render function called to display a 'truncator' after the last item before overflowing the container.

```jsx
renderTruncator={({ hiddenItemsCount }) => (
  <span>{hiddenItemsCount} more items...</span>
)}
```

### `children` (optional)

Pass the list items as children. Each child will be automatically wrapped in an `<li>`.

### `alwaysShowTruncator` (optional)

Always show the 'truncator', even when all items are visible. Useful for advanced use-cases such as an expanding list.

## SSR

Before hydration, the list will have `overflow: auto` applied to it so that it is scrollable. Once hydrated in the client, a layout effect will fire, shortening the list and inserting the 'truncator'.

## Contributing

### Local development environment

1. From the `lib` directory, run `npm link`.
2. From the `lib` directory, run `npm run dev` to build the library in watch mode.
3. From the `sandbox` directory, run `npm link react-truncate list`. This will symlink the local `react-truncate-list` package into the sandbox, so local changes to the library will be immediately reflected in the sandbox.
4. From the `sandbox` directory, run `npm run dev` to start the sandbox in watch mode.
5. Load the sandbox in your browser on the port specified in the terminal.

![enter image description here](https://assets.styledpage.com/react-curved-arrow/logo.png)
Fancy curved arrows for your React project! Great for tutorials and product tours!

https://react-curved-arrow.nickjanssen.com/



## Installation

`yarn add react-curved-arrow`

## Usage

```jsx
import CurvedArrow from "react-curved-arrow";

// Usage
<CurvedArrow />
```

## Props
|Name|Type|Description|Default|
|--- |--- |--- |--- |
|fromSelector|DOM selector|DOM element from which your arrow will start.|body|
|fromOffsetX|number|Amount of pixels to offset the arrow from the DOM element on the X axis.|0|
|fromOffsetY|number|Amount of pixels to offset the arrow from the DOM element on the Y axis.|0|
|toSelector|DOM selector|DOM element to which your arrow will go to.|(same as fromSelector)|
|toOffsetX|number|Amount of pixels to offset the arrow from the DOM element on the X axis.|0|
|toOffsetY|number|Amount of pixels to offset the arrow from the DOM element on the Y axis.|0|
|middleX|number|Middle point X position.|0|
|middleY|number|Middle point Y position.|0|
|width|number|Width of the arrow and arrowhead.|8|
|color|color|Color of the arrow and arrowhead.|"black"|
|hideIfFoundSelector|DOM selector|Optional. if the arrow can find this selector, it will hide itself. Useful for product tours when you only want to show an arrow whenever a user hasn't performed an action yet such as opening a menu.||
|debugLine|boolean|Show debug dots and lines for fromOffset, toOffset and middle vectors.|false|
|dynamicUpdate|boolean|Automatically adjust the arrow whenever the from/to DOM elements update. Useful for dynamic content such as sliding menus or content that is within a scrolling container.|false|
|zIndex|number|Adjust the z-index for this arrow.|0|

## Try it out!

[Open in Playground](https://app.styledpage.com/app/-M-zcwJJQcEEOLLVgwE8)

[Open in CodeSandbox](https://app.styledpage.com/app/-M-zcwJJQcEEOLLVgwE8)

Made with ❤️ by [Nick Janssen](https://twitter.com/nickjanssen_com)

Also check out [Styled Page](https://styledpage.com/?ref=eam&eam=react-curved), a tool that lets you visually build React apps & components!

# License
MIT
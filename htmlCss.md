# HTML, CSS

CSS Positioning => static(default), relative, absolute, fixed, sticky

- **Relative =>** Elements maintain their normal position in the **document flow**, but you can offset them using top, right, bottom, or left properties & it doesn't affect **other elements' positioning.**

- **Absolute =>** Elements are completely removed from the normal **document flow** and positioned relative to their nearest **positioned ancestor**. If there is no **positioned ancestor** exists, it positions relative to the initial containing block (usually the viewport/htmlPage). We can use top, right, bottom, or left properties on this. => **Common for overlays, tooltips, and dropdown menus.**

- **Fixed =>** Elements are positioned relative to the viewport(a/c to screen, not parent) and stay in the same position even when scrolling. They're removed from the document flow like absolute elements. **Perfect for navigation bars, floating action buttons, or any UI element that should remain visible during scrolling.**

- **Sticky =>** A hybrid between relative and fixed positioning. Elements behave as relatively positioned until they reach a specified scroll threshold, then become fixed within their containing block. The element(Table's header) scrolls normally until it reaches 10px from the top of its container, then sticks there. When the container scrolls out of view, the sticky element goes with it. (Jab tak table ke andar scroll karoge, header chipka rahega. Table ke bahar scroll karoge to header bhi gayab ho jaayega).

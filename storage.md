# STORAGE => localStorage, sessionStorage, Cookies, indexDB(cache), redux/Zustand

## LocalStorage 

- Persistense => Data stored in localStorage does not expire. Even after closing/reopening the browser or restarting the system, the data remains.
- Storage => Usually around 5–10 MB per domain (much larger than cookies, which are ~4 KB).
- DataType => Only stores strings. For objects/arrays, you must use JSON.stringify() when saving and JSON.parse() when retrieving.

```js
const user = { name: "Aman", age: 25 };
// Save data
localStorage.setItem("userDetails", JSON.stringify(user));

// Get data
let user = JSON.parse(localStorage.getItem("userDetails"));

// Remove a specific key
localStorage.removeItem("user");

// Clear everything
localStorage.clear();

```

## SessionStorage



----

## IndexedDB
















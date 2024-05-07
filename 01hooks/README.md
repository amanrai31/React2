# 01hooks
Use state hook is used to *propagate* the change of variable in the UI.
Learn how we could do that using plain JS.

let [counter, setCounter] = useState(10);  // [value/variable, function/reference holder]
Default value of counter= 10, use the function setCounter to set updated values of counter.


## React-Fiber- <a href="https://github.com/acdlite/react-fiber-architecture" target="_blank"> React fiber</a>

Key features of React-fiber => 
1. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

2. Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.



Reconciliation => The algorithm React uses to diff one tree with another to determine which parts need to be changed.
Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM".

Note :- Diffing(Defining) of lists is performed using keys. Keys should be "stable, predictable, and unique". When you iterate array or something in any UI element like Button etc.   



Note :- Virtual DOM (React does not use this now a days)
Note :- Hydration- When JS comes in HTML while browser loads WebPage.

### More on Reconciliation, React-Fiber =>  Lecture 7 of chai & react (HC) 
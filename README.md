# Simple-Game-Of-Life 

Why a game of life more? Just for fun

## How it works

To setup the game you just have to create a div tag with the id of your choice and add "game.js"

```html
<body>
    <div id="app"></div>
    <script src="Game.js"></script>
</body>
```

Then you have to bind the id using the Game's bind methode with the ccs selector of your div tag as parameter

```javascript
let app = Game.bind("#app")
```

This methode can also take an object second parameter to config some game options

```javascript
let app = Game.bind("#app", {tps: 10, cellSize: 5, canvasSize: 750, initCellNbr: 20})
```

### Options list

* **tps** : to set the number of turn per second of the game
* **cellSize** : the size of a cell (px)
* **canvasSize** : the size of the game's canvas (px)
* **initCellNbr** : the number of initial cell

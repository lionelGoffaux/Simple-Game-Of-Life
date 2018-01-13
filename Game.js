class Game {

    /**
     * Create an instance of the game of life for the targeted div element
     * @param {string} selector
     * @param {Object=} config
     * @return {Game} app
     */
    static bind (selector, config) {
        if (config === undefined) {
            config = {tps: 10, cellSize: 5, canvasSize: 900, initCellNbr: 7500}
        }
        return new Game(document.querySelector(selector), config)
    }

    /**
     * Setup HTML elements for the game
     * @param {HTMLElement} element
     * @param {Object} config
     */
    constructor (element, config) {
        this.tps = config.tps
        this.cellSize = config.cellSize
        this.canvasSize = config.canvasSize
        this.initCellNbr = config.initCellNbr
        this.mapSize = this.canvasSize/this.cellSize
        this.turn = 0
        this.element = element
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.setAttribute('height', this.canvasSize)
        this.canvas.setAttribute('width', this.canvasSize)
        this.element.appendChild(this.canvas)
        this.map = this.getMap()
        this.init()
        this.timeout = setInterval(this.update.bind(this), 1000/this.tps)
    }

    /**
     * Create a new map and return
     * @return {Array} map
     */
    getMap () {
        let map = new Array(this.mapSize)
        for (let x = 0; x < map.length; x++) {
            map[x] = new Array(this.mapSize)
            for (let y = 0; y < map[x].length; y++) {
                map[x][y] = false  
            }    
        }
        return map
    }

    /**
     * Init the map 
     */
    init () {
        if (this.initCellNbr <= Math.pow(this.mapSize, 2)) {
            for (let i = 0; i < this.initCellNbr; i++) {
                let x
                let y
                do {
                    x = Math.floor(Math.random() * (this.mapSize))
                    y = Math.floor(Math.random() * (this.mapSize))
                } while (this.map[x][y])
                this.map[x][y] = true
            }
        }
        else {
            throw new Error('the number of initial cells is too large')
        }
        this.context.font = 'Arial'
        this.context.fillStyle = "black"
        this.render()
    }

    /**
     * Recalculates the map at each turn
     */
    update () {
        let nextMap = this.getMap()
        for (let x = 0; x < this.map.length; x++) {
           for (let y = 0; y < this.map[x].length; y++) {
                let nbrOfCells = this.checkProximity(x, y)
                if (this.map[x][y]) {
                    if (nbrOfCells >= 2 && nbrOfCells <= 3) {nextMap[x][y] = true}
                }
                else {
                    if (nbrOfCells === 3) {nextMap[x][y] = true}
                }
           }           
        }
        this.map = nextMap
        this.turn++
        this.render()
    }
    
    /**
     * Does the rendering of the map in the canvas
     */
    render () {
        this.context.clearRect(0, 0, this.canvasSize, this.canvasSize)
        this.context.fillText(this.turn, 5, 10)
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
               if (this.map[x][y] === true) {
                    this.context.fillRect(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize)
               }
            }
        }
    }

    /**
     * Checks the number of living cells in the map next to the entered coordinates
     * @param {number} px 
     * @param {number} py 
     * @return {number} nbrOfCells
     */
    checkProximity (px, py) {
        let nbrOfCells = 0
        for (let x = px - 1; x <= px + 1; x++) {
            for (let y = py - 1; y <= py + 1; y++) {
                if ((x >= 0  && x < this.map.length) && (y >= 0  && y < this.map.length)) {
                    if (!(x == px && y == py)) {                       
                        if (this.map[x][y]) {nbrOfCells++}
                    }
                }      
            }
        }
        return nbrOfCells
    }
}
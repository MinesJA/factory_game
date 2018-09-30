let canvWidth = 1500
let canvHeight = 900
let start;
let current;
let end;
let openList = [];
let closedList = [];

let steps = 0;


function setup() {
  createCanvas(canvWidth, canvHeight);
  background(32,29,29);
  noStroke();

  let buildings = new Group();
  let trucks = new Group();
  let tiles = new Group();

  let cityBlocks = 3
  // number of desired city blocks in a row
  
  let cells = (cityBlocks * 8) + ((cityBlocks-1) * 4)
  // gives me number of cells or segments

  let col = 0
  let row = 0


  let cellWidth = canvWidth/8
  let cellHeight = canvHeight/7

  let horDistBtwBlocks = cellWidth * 3
  let vertDistBtwBlocks = cellHeight * 2

  let blockWidth = cellWidth * 2
  let blockHeight = cellHeight

  let carStartOptions = []


  for(let xCoord = blockWidth/2; xCoord <= canvWidth - blockWidth/2; xCoord += horDistBtwBlocks){
    col++
    for(let yCoord = blockHeight/2; yCoord <= (canvHeight - blockHeight/2)+1; yCoord += vertDistBtwBlocks){
      row++

      let tile = createSprite(xCoord, yCoord, blockWidth, blockHeight)
      tile.shapeColor = color(217,218,227)
      tile.onMousePressed = ()=>{squareClicked(tile)}
      tile.addToGroup(tiles)
      tile.row = row;
      tile.col = col;

      let startVertLineX = xCoord + horDistBtwBlocks/2
      let startVertLineY = 0

      let endVertLineX = xCoord + horDistBtwBlocks/2
      let endVertLineY = canvHeight

      let inc =

      carStartOptions.push({x: })

      line(startVertLineX, startVertLineY, endVertLineX, endVertLineY)
      stroke(255)

      let startHorLineX = 0
      let startHorLineY = yCoord + vertDistBtwBlocks/2

      let endHorLineX = canvWidth
      let endHorLineY = yCoord + vertDistBtwBlocks/2

      line(startHorLineX, startHorLineY, endHorLineX, endHorLineY)
      stroke(255)



    }
  }
  // let car = createSprite(startVertLineX+50, startVertLineY+50,50,50)

  //
  // var gridSize = 135;
  // let row = 0;
  // let col = 0;
  //
  //
  //
  // let tile = createSprite(150, 150, z, 100)
  // console.log(tile)
  //
  // for (var x = gridSize; x <= 1500 - gridSize; x += gridSize) {
  //   col++
  //
  //   for (var y = gridSize; y <= 1000 - gridSize; y += gridSize) {
  //     row++
  //
  //     let xCoord = x-1
  //     let yCoord = y-1
  //
  //     let tile = createSprite(xCoord, yCoord, 100, 60)
  //
  //     tile.shapeColor = color(217,218,227)
  //     tile.onMousePressed = ()=>{squareClicked(tile)}
  //     tile.addToGroup(tiles)
  //     tile.row = row;
  //     tile.col = col;
  //   }
  //   row = 0
  // }
  //
  // start = tiles[91];
  // end = tiles[25];
  // current = start
  // // current = tiles[25];
  //
  // start.shapeColor = color(66,134,244)
  // end.shapeColor = color(244, 66, 66)
}



function createObject(tile, direction){

  let hScore = abs(tile.col - end.col) + abs(tile.row - end.row)
  let gScore = steps
  let fScore = hScore + gScore

  console.log(tile, "H: ", hScore, "G: ", gScore, "F: ", fScore)

  return {direction, tile, fScore, gScore, hScore}
}




function nextStep(){
  steps++
  console.log("Next Step. Step #: ", steps)

  let up = tiles.find( (tile)=> ( tile.row == current.row - 1 && tile.col == current.col  ))

  let down = tiles.find( (tile)=> ( tile.row == current.row + 1 && tile.col == current.col ))
  let left = tiles.find( (tile)=> (tile.row == current.row && tile.col == current.col - 1))
  let right = tiles.find( (tile)=> (tile.row == current.row && tile.col == current.col + 1))

  openList.push(createObject(up, "up"))
  openList.push(createObject(down, "down"))
  openList.push(createObject(left, "left"))
  openList.push(createObject(right, "right"))

  openList.forEach( (tileObj) => {
    if(!closedList.includes(tileObj.tile) || tileObj.tile == start || tileObj.tile == end){
      tileObj.tile.shapeColor = color(66, 244, 80)
    }
  })

  current = openList.sort( (a,b)=>( a.fScore - b.fScore))[0].tile


  closedList.push(current)
  console.log("OPEN: ", openList)

  closedList.forEach( (tile) => {
    console.log("Row: ", tile.row, "Col: ", tile.col)
  })


  current.shapeColor = color(242,33,33)
  // openList = openList.slice(1,openList.length)

  openList = []

}














function draw() {
  drawSprites()

  // let rectangle = rect(700, 100, 100, 100)

  // rectangle.shapeColor = color(66,137,244)
}


function squareClicked(clickedTile){
  clickedTile.addToGroup(buildings)
  clickedTile.shapeColor = color(222,200,2)


  let closedList = [];
  let openList = [];


  let createObject = (sprite, direction) => ({direction: direction, sprite: sprite, fScore: null, gScore: null, HScore: null})


  let up = tiles.find( (tile)=> ( tile.row == clickedTile.row - 1 && tile.col == clickedTile.col  ))
  let down = tiles.find( (tile)=> ( tile.row == clickedTile.row + 1 && tile.col == clickedTile.col ))
  let left = tiles.find( (tile)=> (tile.row == clickedTile.row && tile.col == clickedTile.col - 1))
  let right = tiles.find( (tile)=> (tile.row == clickedTile.row && tile.col == clickedTile.col + 1))

  openList.push(createObject(up, "up"))
  openList.push(createObject(down, "down"))
  openList.push(createObject(left, "left"))
  openList.push(createObject(right, "right"))

  openList.forEach( (tile) => {
    tile.sprite.shapeColor = color(66, 244, 80)
  })

}

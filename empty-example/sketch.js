let canvWidth = 1500
let canvHeight = 900

let start;
let current;
let end;
let openList = [];
let closedList = [];

let buildings;
let cars;
let blocks;

let carStartOptions;

let steps = 0;

let lines = []


function setup() {
  createCanvas(canvWidth, canvHeight);

  noStroke();

  buildings = new Group();
  cars = new Group();
  blocks = new Group();

  let col = 0;
  let row = 0;

  let cityBlocksInCol = 3

  let cityBlocksInRow = 4
  // number of desired city blocks in a Col and Row

  let horCells = (cityBlocksInCol * 8) + ((cityBlocksInCol-1) * 4)
  let vertCells = (cityBlocksInRow * 4) + ((cityBlocksInRow-1) * 4)
  // number of cells or segments on the X Axis and Y Axis

  let cellWidth = canvWidth/horCells
  let cellHeight = canvHeight/vertCells

  let blockWidth = cellWidth * 8
  let horDistBtwBlocks = cellWidth * 12

  let blockHeight = cellHeight * 4
  let vertDistBtwBlocks = cellHeight * 8

  carStartOptions = [
    {x: cellWidth * 9, y: cellHeight, facing: "down"},
    {x: cellWidth * 21, y: cellHeight, facing: "down"},
    {x: cellWidth * 11, y: canvHeight - cellWidth, facing:"up"},
    {x: cellWidth * 23, y: canvHeight - cellWidth, facing: "up"},
    {x: cellWidth, y: cellHeight * 7, facing: "right"},
    {x: cellWidth, y: cellHeight * 15, facing: "right"},
    {x: cellWidth, y: cellHeight * 23, facing: "right"},
    {x: canvWidth - cellWidth, y: cellHeight * 5, facing: "left"},
    {x: canvWidth - cellWidth, y: cellHeight * 13, facing: "left"},
    {x: canvWidth - cellWidth, y: cellHeight * 21, facing: "left"},
  ];


  for(let xCoord = cellWidth * 4; xCoord <= canvWidth - (cellWidth * 4); xCoord += horDistBtwBlocks){
    col++
    for(let yCoord = cellHeight * 2; yCoord <= canvHeight - (cellHeight * 2) +1; yCoord += vertDistBtwBlocks){
      row++

      let block = createSprite(xCoord, yCoord, blockWidth, blockHeight)
      block.shapeColor = color(217,218,227)
      block.onMousePressed = ()=>{squareClicked(block)}
      blocks.add(block)
      // block.addToGroup(blocks)
      block.row = row;
      block.col = col;

      let startVertLineX = xCoord + cellWidth * 6
      let startVertLineY = 0

      let endVertLineX = xCoord + cellWidth * 6
      let endVertLineY = canvHeight

      lines.push({xStart: startVertLineX, yStart: startVertLineY, xEnd: endVertLineX, yEnd: endVertLineY})

      let startHorLineX = 0
      let startHorLineY = yCoord + vertDistBtwBlocks/2

      let endHorLineX = canvWidth
      let endHorLineY = yCoord + vertDistBtwBlocks/2

      lines.push({xStart: startHorLineX, yStart: startHorLineY, xEnd: endHorLineX, yEnd: endHorLineY})
    }
  }

  for(let i = 0; i < carStartOptions.length; i++){

    let car = createSprite(carStartOptions[i].x, carStartOptions[i].y, cellWidth, cellHeight)
    car.facing = carStartOptions[i].facing
    cars.add(car)
  }
}

function draw() {
  background(32,29,29);

  for(let i = 0; i < lines.length; i++){
    var newLine = lines[i]
    line(newLine.xStart, newLine.yStart, newLine.xEnd, newLine.yEnd)
    stroke(255)
  }

  for(let i = 0; i < cars.length; i++){
    var car = cars[i]
    car.collide(blocks);
    car.displace(cars)

    switch (car.facing) {
      case "up":
        car.setSpeed(1.5, 270)
        break;
      case "down":
        car.setSpeed(1.5, 90)
        break;
      case "right":
        car.setSpeed(1.5, 0)
        break;
      case "left":
        car.setSpeed(1.5, 180)
        break;
      default:
    }

  }



  drawSprites();
}

















function createObject(tile, direction){

  let hScore = abs(tile.col - end.col) + abs(tile.row - end.row)
  let gScore = steps
  let fScore = hScore + gScore

  return {direction, tile, fScore, gScore, hScore}
}




function nextStep(){
  steps++
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


  closedList.forEach( (tile) => {

  })


  current.shapeColor = color(242,33,33)
  // openList = openList.slice(1,openList.length)

  openList = []

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

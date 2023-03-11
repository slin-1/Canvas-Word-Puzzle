/*
Name: Steven Lin
File: canvasWithTimer.js
*/

/*
handles mouse dragging and release
to drag a strings around on the html canvas

Mouse event handlers are being added and removed.

Keyboard keyUP handler is used to trigger communication with the
server via POST message sending JSON data

*/

//DATA MODELS
//Use javascript array of objects to represent words and their locations
let words = []
words.push({word: "Welcome", x: 20, y: 50})
words.push({word: "to", x: 40, y: 50})
words.push({word: "Steven's", x: 70, y: 50})
words.push({word: "Puzzle", x: 100, y: 50})
words.push({word: "Game", x: 130, y: 50})

const canvas = document.getElementById('canvas1') //our drawing canvas

function assignRandomIntCoords(object, maxX, maxY) {
  //object expected to have .x and .y co-ordinates

  const MARGIN = 50 //keep way from edge of canvas by MARGIN
  object.x = MARGIN + Math.floor(Math.random() * (maxX - 2*MARGIN))
  object.y = MARGIN + Math.floor(Math.random() * (maxY - MARGIN))
}

function randomizeWordArrayLocations(wordsArray) {
  for(word of wordsArray){
    assignRandomIntCoords(word, canvas.width, canvas.height)
  }
}

//Determines the location of words on the canvas
function getWordAtLocation(aCanvasX, aCanvasY) {
    var context = canvas.getContext('2d')
    context.font = '20pt Arial'
    const TOLERANCE = 20
    for(var i=0; i<words.length; i++){
       var wordWidth = context.measureText(words[i].word).width
     if((aCanvasX > words[i].x && aCanvasX < (words[i].x + wordWidth))  &&
        Math.abs(words[i].y - aCanvasY) < TOLERANCE) return words[i]
    }
    return null
}

//Draws the canvas on the webpage
function drawCanvas() {

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height) //erase canvas

  context.font = '20pt Arial'
  context.fillStyle = 'cornflowerblue'
  context.strokeStyle = 'blue'

  for (let i = 0; i < words.length; i++) {

    let data = words[i]
    context.fillText(data.word, data.x, data.y)
    context.strokeText(data.word, data.x, data.y)

  }

}
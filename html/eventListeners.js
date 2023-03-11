/*
Name: Steven Lin
File: eventListeners.js
*/

document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  //add listener to get puzzle button
  document.getElementById('get_puzzle').addEventListener('click', handleGetPuzzleButton)
  //add listener to solve puzzle button
  document.getElementById('solve_puzzle').addEventListener('click', handleSolvePuzzleButton)
  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyEnter)

  //Randomizes the word locations
  randomizeWordArrayLocations(words)

  drawCanvas()
})

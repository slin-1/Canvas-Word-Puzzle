/*
Name: Steven Lin
File: buttonAndKeyListeners.js
*/

//KEY CODE(S)
//should clean up these hard-coded key codes
const ENTER = 13


function handleKeyEnter(e) {
  //console.log("key: " + e.which)

  if (e.which == ENTER) {
    handleGetPuzzleButton() //treat ENTER key like you would the submit button
    document.getElementById('userTextField').value = ''
  }
  e.stopPropagation()
  e.preventDefault()
}

function handleGetPuzzleButton() {
  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {
    let userRequestObj = {
      text: userText
    }
    //let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = '' //clear user text field
    //alert ("You typed: " + userText);

    fetch('/userText', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userRequestObj),
      })
      .then((response) => response.json())
      .then((data) => {

        if (data.validity === "VALID") {
          let textDiv = document.getElementById("text-area")
          textDiv.innerHTML = ''
          textDiv.innerHTML = textDiv.innerHTML + `<p> ${userText}</p>`
        }
        
        let responseObj = data
        puzzle.puzzleLines = responseObj.puzzleWords //store the puzzle solution in an object

        if (puzzle.puzzleLines) {
          words = [] //clear words on canvas
          let newPuzzleWords = [] //temporarily holds the individual puzzle words
          for (line of puzzle.puzzleLines) {
            lineWords = line.split(" ")
            for (w of lineWords) {
              newPuzzleWords.push(w)

              let word = {
                word: w
              }
              assignRandomIntCoords(word, canvas.width, canvas.height)
              words.push(word)
            }
          }
          puzzle.puzzleWords = words //store original words & their coordinates
          shuffleArray(newPuzzleWords) //scramble the puzzle words before sending object data to client
          responseObj.puzzleWords = newPuzzleWords;
        }

        //console.dir(puzzle) //temp
        console.dir(responseObj) //output object data
        drawCanvas()

      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}

function handleSolvePuzzleButton() {
  let userText = document.getElementById('userTextField').value
  let userRequestObj = {
    text: userText
  }
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear text
  document.getElementById('userTextField').value = '' //clear user text field

  fetch('/userText', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(userRequestObj),
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      sortWordLocations() //sort words

      if (verifyPuzzle()) { //check if the arrangement is correct
        displayPuzzleWords("valid") //display the user's arrangement
        //console.log("SUCCESS")
      }
      else {
        displayPuzzleWords("invalid")
        //console.log("FAIL")
      }
      
      drawCanvas()

    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
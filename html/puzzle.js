/*
Name: Steven Lin
File: puzzle.js
*/

let puzzle = {}

function shuffleArray(arr) {
  let index = arr.length;
  let randomIndex;
  while (index != 0) {
    //pick random element and swap it with the current element
    randomIndex = Math.floor(Math.random() * index);
    index--;
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
  }

  return arr;
}

//sort x-values
function sortWordX(lower, upper) {
  for (let k=lower; k<=upper; k++) {
    for (let l=lower; l<=upper; l++) {
      if (puzzle.puzzleWords[k].x < puzzle.puzzleWords[l].x) {
        let temp = puzzle.puzzleWords[k]
        puzzle.puzzleWords[k] = puzzle.puzzleWords[l]
        puzzle.puzzleWords[l] = temp;
      }
    }
  }
}

//create levels, words should be sorted by y-value (ascending) before using this function
function createLevels() {
  const LEVEL_TOLERANCE = 20
  puzzle.levelCounter = 0
  
  for (let i=0; i<puzzle.puzzleWords.length; i++) {
    let increment = 0
    let currLevelLowerBound = puzzle.puzzleWords[i].y - LEVEL_TOLERANCE
    let currLevelUpperBound = puzzle.puzzleWords[i].y + LEVEL_TOLERANCE
    
    for (let j=i+1; j<puzzle.puzzleWords.length; j++) {
      if ((currLevelLowerBound < puzzle.puzzleWords[j].y) && (puzzle.puzzleWords[j].y < currLevelUpperBound)) {
        puzzle.puzzleWords[j].y = puzzle.puzzleWords[i].y
        increment++
      }
    }

    //sort every words x-values for each level
    sortWordX(i, i+increment)

    i += increment
    puzzle.levelCounter += 1
  }
}

function sortWordLocations() {
  //sort by puzzle words y-values
  for (let i=0; i<puzzle.puzzleWords.length; i++) {
    for (let j=0; j<puzzle.puzzleWords.length; j++) {
      if (puzzle.puzzleWords[i].y < puzzle.puzzleWords[j].y) {
        let temp = puzzle.puzzleWords[i]
        puzzle.puzzleWords[i] = puzzle.puzzleWords[j]
        puzzle.puzzleWords[j] = temp;
      }
    }
  }

  //create levels & sort by puzzle words x-values for each level
  createLevels()
}

function verifyPuzzle() {
  let validPuzzle
  let puzzleSolutionWords = []

  //first split all the words of the correct puzzle solution into an array
  for (let i=0; i<puzzle.puzzleLines.length; i++) {
    let tmpSplitWords = puzzle.puzzleLines[i].split(" ")
    for (w in tmpSplitWords) {
      puzzleSolutionWords.push(tmpSplitWords[w])
    }
  }
  //console.log("Solution: ", puzzleSolutionWords)

  //compare the user's arrangement to the correct puzzle solution
  for (let i=0; i<puzzle.puzzleWords.length; i++) {
    if (puzzle.puzzleWords[i].word != puzzleSolutionWords[i]) {
      validPuzzle = false;
      return validPuzzle;
    }
    else {
      validPuzzle = true;
    }
  }

  //console.log("Valid puzzle?: ", validPuzzle)
  return validPuzzle
}

function displayPuzzleWords(validity) {
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ''    //clear the html
  let index = 0

  //prepare words to output to the user
  for (let i=0; i<puzzle.levelCounter; i++) {
    let puzzleWordsString = ""
    let currLevelValueY = puzzle.puzzleWords[index].y

    while (puzzle.puzzleWords[index].y == currLevelValueY) {
      puzzleWordsString += puzzle.puzzleWords[index].word
      puzzleWordsString += " "
      if (index == puzzle.puzzleWords.length - 1) {break}
      else {index++}
    }

    textDiv.innerHTML += `<p><span class=${validity}>${puzzleWordsString}</span></p>`
  }
}
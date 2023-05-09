# Canvas-Word-Puzzle

**Purpose:**
- Local web application utilizing JavaScript, HTML, CSS, and Node.js  
- Allows the user to type in a text file name, and load it onto a HTML canvas element
  - Then, the user can drag the scrambled words into their respective locations, where a valid  
    puzzle is where the order of the words matches the text file (regardless of the line number).

**Node.js Version:** &nbsp; v18.13.0.  
**OS Used:** &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Windows 10  

**Install:**  
<pre>
npm install npm@latest -g  
  ^ installs the latest NPM updates (I am/was on version 9.5.1)  
  note: I did not use any external modules
</pre>

**Launch:**  
`node server.js`

**Testing:**  
- after launching, visit: `http://localhost:3000/index.html`
- Then type into the text area a puzzle file name and press "Get Puzzle" or the enter key.
  - If the puzzle name is valid, the words of the puzzle file will be scrambled on the canvas.
- Then you can rearrange the words in the correct order and press "Solve Puzzle" to check if  
  the puzzle arrangement is correct.
  - If the puzzle arrangement is correct, the bottom text will be green, but if it's wrong,  
    then the text will be red.

---
## Puzzle SPOILERS Below

Example of Puzzle 1:

**Puzzle 1 unsolved:**  
![puzzle_1_unsolved](https://user-images.githubusercontent.com/105820635/236995417-9383296a-8a57-480e-bac7-e919e071aae9.png)  

**Puzzle 1 solved:**  
![puzzle_1_solved](https://user-images.githubusercontent.com/105820635/236995157-45dde185-9081-44c1-b428-c5becc1b8e4c.png)  

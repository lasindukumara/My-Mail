// Import required modules
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
;

const { exec } = require('child_process');

// Define the port the server will run on
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const fix1 = "'translate(${Math.round(curX)}px, ${Math.round(curY)}px)'";
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html>

<head>
  <script>document.addEventListener("DOMContentLoaded", () => {
      const interBubble = document.querySelector(".interactive");

      if (!interBubble) {
        console.error("Element with class 'interactive' not found.");
        return;
      }

      let curX = 0;
      let curY = 0;
      let tgX = 0;
      let tgY = 0;

      function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = ${fix1};
        requestAnimationFrame(move);
      }

      window.addEventListener("mousemove", (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
      });

      move();
    });
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Lasindu Kumara</title>
  <style>
 


    /*****************************************/

    /* Reset default styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Base body styling */
body {
  font-family: Arial, sans-serif;
  background-color: #f1f3f4; /* Light grey background */
  padding: 2.5%;
  display: flex;
  justify-content: center;
  position: relative;

}




/* Gradient background layer (if needed) */
.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(40deg, rgb(108, 0, 162), rgb(0, 17, 82));
  z-index: 0;
  overflow: scroll;
}

/* Ensure the form container appears above the gradient */
.text-container {
  position: relative;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
}


.container::before {
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1558b050;
  filter: blur(100px); /* Apply blur effect to the pseudo-element */
  z-index: 1}



/* Flatten nested body element so it doesn't intercept clicks */
#emailForm > body {
  display: contents !important;
  pointer-events: none;
}
#emailForm > body * {
  pointer-events: auto;
}

/* Grid-based form styling */
#emailForm {
  color: #000;
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #dadce0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3);
  padding: 60px 16px;
  width: 95%;
  margin: auto;
  display: grid;
  grid-template-areas: 
    "head head head"
    "name1 input1 CCBCC"
    "name2 input2 input2"
    "name3 input3 input3"
    "name4 input4 input4"
    "name5 input5 input5"
    "name6 toolbar toolbar"
    "name7 textbox textbox"
    "name8 textbox textbox"
    "name9 input9 send"
    "name10 input10 input10"
    "name11 input11 input11";
  grid-template-columns: 1fr 10fr 1fr;
  gap: 1rem;
  align-items: center;
  justify-items: end;
  align-content: center;
  filter: blur(0px);
}

/* Collapse the nested body element so it doesn't interfere with grid or clicks */
#emailForm > body {
  display: contents !important;
}

/* Form header styling */
#emailForm h2 {
  grid-area: head;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 16px;
}

/* Individual grid items mapping (using nth-child for simplicity) */
#emailForm :nth-child(1) {
  grid-area: head;
  justify-self: start;

}
#emailForm :nth-child(2) {
  grid-area: name1;
}
#emailForm :nth-child(3) {
  grid-area: input1;
}
#emailForm :nth-child(4) {
  grid-area: CCBCC;
}
#emailForm :nth-child(5) {
  grid-area: name2;
}
#emailForm :nth-child(6) {
  grid-area: input2;
}
#emailForm :nth-child(7) {
  grid-area: name3;
}
#emailForm :nth-child(8) {
  grid-area: input3;
}
#emailForm :nth-child(9) {
  grid-area: name4;
}
#emailForm :nth-child(10) {
  grid-area: input4;
}
#emailForm :nth-child(11) {
  grid-area: name5;
}
#emailForm :nth-child(12) {
  grid-area: input5;
}
#emailForm :nth-child(13) {
  grid-area: name6;
}
#emailForm :nth-child(14) {
  grid-area: toolbar;
}
#emailForm :nth-child(17) {
  grid-area: textbox;
}
#emailForm :nth-child(18) {
  grid-area: name9;
}
#emailForm :nth-child(19) {
  grid-area: input9;
}
#emailForm :nth-child(20) {
  grid-area: send;
}

/* Compact label styling */
#emailForm label {

  display: block;
  font-size: 14px;
  font-weight: bold;
  margin: 4px 0;
}

/* Input fields – compact and clean */
#emailForm input[type="email"],
#emailForm input[type="text"] {
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #dadce0;
  border-radius: 4px;

}

/* Button for toggling CC/BCC fields */
#emailForm button.CC_BCC {
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background-color: #f1f3f4;
  cursor: pointer;

}

/* Toolbar styling for rich text controls */
.toolbar {
  grid-area: toolbar;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 12px;
}

.toolbar button {
  background-color: #f1f3f4;
  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toolbar button:hover {
  background-color: #e8eaed;
}

 .editor_ {
      width: 100%;
      flex-grow: 2;
    }


/* Editor area styling */
#editor {
     display: block;

      padding: 0;
      margin: 0;
  overflow: scroll;
  width: 100%;
  max-height: 38vh;
  border: 1px solid #dadce0;
  border-radius: 4px;
  min-height: 150px;
  background-color: #fff;
}
#editor::-webkit-scrollbar {
    display: none;  /* WebKit browsers */
}


/* Submit button styling */
#emailForm button[type="submit"] {
  grid-area: send;
  width: 100%;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

}

#emailForm button[type="submit"]:hover {
  background-color: #1558b0;
}

/* Response message styling */
#responseMessage {
  font-size: 14px;
  text-align: center;
  color: #202124;
;
}

/* Ensure interactive elements remain clickable */
#emailForm button,
#emailForm input,
.toolbar button {
  pointer-events: auto;
}

    /*****************************************/

    html,
    body {
      font-family: "Dongle", sans-serif;
      margin: 0;
      padding: 0;
    }

    .text-container {
      z-index: 100;
      height: 100vh;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      color: white;
      opacity: 0.8;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
    }

    :root {
      --color-bg1: rgb(108, 0, 162);
      --color-bg2: rgb(0, 17, 82);
      --color1: 18, 113, 255;
      --color2: 221, 74, 255;
      --color3: 100, 220, 255;
      --color4: 200, 50, 50;
      --color5: 180, 180, 50;
      --color-interactive: 140, 100, 255;
      --circle-size: 80%;
      --blending: hard-light;
    }

    @-webkit-keyframes moveInCircle {
      0% {
        transform: rotate(0deg);
      }

      50% {
        transform: rotate(180deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes moveInCircle {
      0% {
        transform: rotate(0deg);
      }

      50% {
        transform: rotate(180deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes moveVertical {
      0% {
        transform: translateY(-50%);
      }

      50% {
        transform: translateY(50%);
      }

      100% {
        transform: translateY(-50%);
      }
    }

    @keyframes moveVertical {
      0% {
        transform: translateY(-50%);
      }

      50% {
        transform: translateY(50%);
      }

      100% {
        transform: translateY(-50%);
      }
    }

    @-webkit-keyframes moveHorizontal {
      0% {
        transform: translateX(-50%) translateY(-10%);
      }

      50% {
        transform: translateX(50%) translateY(10%);
      }

      100% {
        transform: translateX(-50%) translateY(-10%);
      }
    }

    @keyframes moveHorizontal {
      0% {
        transform: translateX(-50%) translateY(-10%);
      }

      50% {
        transform: translateX(50%) translateY(10%);
      }

      100% {
        transform: translateX(-50%) translateY(-10%);
      }
    }

    .gradient-bg {
      width: 100vw;
      height: 100vh;
      position: relative;
      overflow: hidden;
      background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
      top: 0;
      left: 0;
    }

    .gradient-bg svg {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
    }

    .gradient-bg .gradients-container {
      filter: url(#goo) blur(40px);
      width: 100%;
      height: 100%;
    }

    .gradient-bg .g1 {
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
      mix-blend-mode: var(--blending);
      width: var(--circle-size);
      height: var(--circle-size);
      top: calc(50% - var(--circle-size) / 2);
      left: calc(50% - var(--circle-size) / 2);
      transform-origin: center center;
      -webkit-animation: moveVertical 30s ease infinite;
      animation: moveVertical 30s ease infinite;
      opacity: 1;
    }

    .gradient-bg .g2 {
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
      mix-blend-mode: var(--blending);
      width: var(--circle-size);
      height: var(--circle-size);
      top: calc(50% - var(--circle-size) / 2);
      left: calc(50% - var(--circle-size) / 2);
      transform-origin: calc(50% - 400px);
      animation: moveInCircle 20s reverse infinite;
      opacity: 1;
    }

    .gradient-bg .g3 {
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
      mix-blend-mode: var(--blending);
      width: var(--circle-size);
      height: var(--circle-size);
      top: calc(50% - var(--circle-size) / 2 + 200px);
      left: calc(50% - var(--circle-size) / 2 - 500px);
      transform-origin: calc(50% + 400px);
      -webkit-animation: moveInCircle 40s linear infinite;
      animation: moveInCircle 40s linear infinite;
      opacity: 1;
    }

    .gradient-bg .g4 {
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
      mix-blend-mode: var(--blending);
      width: var(--circle-size);
      height: var(--circle-size);
      top: calc(50% - var(--circle-size) / 2);
      left: calc(50% - var(--circle-size) / 2);
      transform-origin: calc(50% - 200px);
      -webkit-animation: moveHorizontal 40s ease infinite;
      animation: moveHorizontal 40s ease infinite;
      opacity: 0.7;
    }

    .gradient-bg .g5 {
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
      mix-blend-mode: var(--blending);
      width: calc(var(--circle-size) * 2);
      height: calc(var(--circle-size) * 2);
      top: calc(50% - var(--circle-size));
      left: calc(50% - var(--circle-size));
      transform-origin: calc(50% - 800px) calc(50% + 200px);
      -webkit-animation: moveInCircle 20s ease infinite;
      animation: moveInCircle 20s ease infinite;
      opacity: 1;
    }

    .gradient-bg .interactive {
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
      mix-blend-mode: var(--blending);
      width: 100%;
      height: 100%;
      top: -50%;
      left: -50%;
      opacity: 0.7;
    }







    /**********************************************************/


    /**********************************************************/
    .results {
    z-index: 2000;
    background-color: #dadce0e3;
    border-radius: 20px;
    padding: 20px;    
    display: none;  /* Change none to flex to enable Flexbox centering */
    flex-direction: column;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Move the div back into the center */
    pointer-events: visible;
    height: auto;

}

#responseMessage {
    font-size: 20px;
}

.results button {
    background-color: #4CAF50; /* Green background */
    border: none; /* Remove border */
    color: white; /* White text */
    padding: 10px 16px; /* Padding */
    text-align: center; /* Center text */
    text-decoration: none; /* Remove underline */
    display: inline-block; /* Display as inline-block */
    font-size: 16px; /* Font size */
    margin: 4px 2px; /* Margin */
    cursor: pointer; /* Pointer cursor on hover */
    border-radius: 8px; /* Rounded corners */
}

    
  </style>
</head>

<body>
  <div class="text-container">
    <div class="container">
      <form id="emailForm">

        <body>
          <h2>Send an Email</h2>
          <label for="to">To:</label>
          <input type="email" id="to" name="to" required />

          <button class="CC_BCC" type="button" onclick="toggleFields()">CC & BCC</button>

          <label class="cc" style="display: none;" for="cc">CC:</label>
          <input class="cc" style="display: none;" type="text" id="cc" name="cc" />

          <label class="bcc" style="display: none;" for="bcc">BCC:</label>
          <input class="bcc" style="display: none;" type="text" id="bcc" name="bcc" />

          <!-- <label for="to">To:</label>
    <input type="email" id="to" name="to" required /><br /><br />

    <label for="cc">CC:</label>
    <input type="text" id="cc" name="cc" /><br /><br />

    <label for="bcc">BCC:</label>
    <input type="text" id="bcc" name="bcc" /><br /><br />
-->
          <label for="subject">Subject:</label>
          <input type="text" id="subject" name="subject" required />

          <label for="name">Your Name:</label>
          <input type="text" id="name" name="name" required />

          <label>Message:</label>
          <div class="toolbar">
            <button  type="button" onclick="formatText('bold')"><b>B</b></button>
            <button  type="button" onclick="formatText('italic')"><i>I</i></button>
            <button  type="button" onclick="formatText('underline')"><u>U</u></button>
            <button  type="button" onclick="formatText('strikethrough')"><strike>S</strike></button>
            <button  type="button" onclick="formatText('subscript')">Sub</button>
            <button  type="button" onclick="formatText('superscript')">Sup</button>
            <button  type="button" onclick="formatText('insertOrderedList')">OL</button>
            <button  type="button" onclick="formatText('insertUnorderedList')">UL</button>
            <button  type="button" onclick="formatText('justifyLeft')">Left</button>
            <button  type="button" onclick="formatText('justifyCenter')">Center</button>
            <button  type="button" onclick="formatText('justifyRight')">Right</button>
            <button  type="button" onclick="formatText('justifyFull')">Full</button>
            <button  type="button" onclick="createLink()">Link</button>
            <button  type="button" onclick="formatText('unlink')">Unlink</button>
            <button  type="button" onclick="insertImage()">Image</button>
            <button  type="button" onclick="insertHTML()">HTML</button>
            <button  type="button" onclick="formatText('insertHorizontalRule')">HR</button>
            <button  type="button" onclick="changeBGColor()">BG Color</button>
            <button  type="button" onclick="changeTextColor()">Text Color</button>

            <select id="fontSelect" onchange="changeFont()">
              <option value="">Select Font</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Impact">Impact</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Segoe UI">Segoe UI</option>
              <option value="Calibri">Calibri</option>
              <option value="Cambria">Cambria</option>
              <option value="Garamond">Garamond</option>
              <option value="Lucida Sans">Lucida Sans</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Palatino Linotype">Palatino Linotype</option>
              <option value="Book Antiqua">Book Antiqua</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Gill Sans">Gill Sans</option>
              <option value="Century Gothic">Century Gothic</option>
              <option value="Arial Narrow">Arial Narrow</option>
              <option value="Lucida Console">Lucida Console</option>
              <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
              <option value="Consolas">Consolas</option>
              <option value="Copperplate Gothic Bold">Copperplate Gothic Bold</option>
              <option value="Brush Script MT">Brush Script MT</option>
              <option value="Algerian">Algerian</option>
              <option value="Mistral">Mistral</option>
              <option value="Corbel">Corbel</option>
              <option value="Forte">Forte</option>
              <option value="Harrington">Harrington</option>
              <option value="Monotype Corsiva">Monotype Corsiva</option>
              <option value="Gill Sans MT">Gill Sans MT</option>
              <option value="Lucida Handwriting">Lucida Handwriting</option>
              <option value="Copperplate Gothic Light">Copperplate Gothic Light</option>
            </select>

            <select id="sizeSelect" onchange="changeFontSize()">
              <option value="">Select Size</option>
              <option value="1">8pt</option>
              <option value="2">10pt</option>
              <option value="3">12pt</option>
              <option value="4">14pt</option>
              <option value="5">18pt</option>
              <option value="6">24pt</option>
              <option value="7">36pt</option>
            </select>
            <select id="formatLevel" onchange="formatHeading()" value="p">
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
              <option value="p">Paragraph</option>
              <option value="blockquote">Blockquote</option>
              <option value="pre">Preformatted Text</option>
              <option value="div">Division</option>
              <option value="small">Small Text</option>
              <option value="code">Code</option>
            </select>


            <button  type="button" onclick="formatText('outdent')">Outdent</button>
            <button  type="button" onclick="formatText('indent')">Indent</button>
            <button  type="button" onclick="formatText('undo')">Undo</button>
            <button  type="button" onclick="formatText('redo')">Redo</button>
            <button  type="button" onclick="formatText('selectAll')">Select All</button>
            <button  type="button" onclick="formatText('copy')">Copy</button>
            <button  type="button" onclick="formatText('cut')">Cut</button>
            <button  type="button" onclick="formatText('paste')">Paste</button>
            <button  type="button" onclick="formatText('delete')">Delete</button>
            <button  type="button" onclick="formatText('insertParagraph')">Paragraph</button>
            <button  type="button" onclick="formatText('insertBrOnReturn')">BR on Return</button>

        <button type="button" onclick="clearFormatting()">Clear Formatting</button>
          </div>


          <input type="file" id="fileInput" style="display: none;" accept=".html">
          <input type="color" id="colorPicker" style="display: none;">


   <div class="editor_">
          <div id="editor" contenteditable="true">
            Type your message here...
          </div>
</div>

          <label for="Closing">Closing:</label>
          <input type="text" id="Closing" name="Closing" />

          <button type="submit">Send Email</button>
      </form>
    </div>

  </div>
  <div class="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
    <div class="gradients-container">
      <div class="g1"></div>
      <div class="g2"></div>
      <div class="g3"></div>
      <div class="g4"></div>
      <div class="g5"></div>
      <div class="interactive"></div>
    </div>
  </div>
  <div class="results">
    <p id="responseMessage">
      

    </p>
       <button onclick="hideResults()">OK</button>

  </div>


  <script>


        // Execute rich text commands and trigger send
        function formatText(command, value = null) {
            document.execCommand(command, false, value);
        }

    // Function to trigger email send
    function triggerSend() {
      document.getElementById("emailForm").dispatchEvent(new Event("submit"));
    }





    function toggleFields() {
      var ccElements = document.getElementsByClassName('cc');
      var bccElements = document.getElementsByClassName('bcc');

      for (var i = 0; i < ccElements.length; i++) {
        if (ccElements[i].style.display === 'none' || ccElements[i].style.display === 'none !important' || ccElements[i].style.display === '') {
          ccElements[i].style.display = 'block';
        } else {
          ccElements[i].style.display = 'none';
        }
      }

      for (var j = 0; j < bccElements.length; j++) {
        if (bccElements[j].style.display === 'none' || bccElements[j].style.display === 'none !important' || bccElements[j].style.display === '') {
          bccElements[j].style.display = 'block';
        } else {
          bccElements[j].style.display = 'none';
        }
      }
    }




    function createLink() {
      const url = prompt("Enter the URL");
      if (url) {
        document.execCommand('createLink', false, url);
      }
    }

    function insertImage() {
      const imageUrl = prompt("Enter the image URL");
      if (imageUrl) {
        document.execCommand('insertImage', false, imageUrl);
      }
    }

    function insertHTML() {
      const choice = prompt("Enter 1 to type HTML, 2 to upload an HTML file");

      if (choice == '1') {
        const htmlContent = prompt("Enter the HTML content");
        if (htmlContent) {
          const editor = document.getElementById('editor');
          editor.focus();
          document.execCommand('insertHTML', false, htmlContent);
        }
      } else if (choice == '2') {
        document.getElementById('fileInput').click();
      }
    }

    function changeBGColor() {
      const colorPicker = document.getElementById('colorPicker');
      colorPicker.click();
      colorPicker.onchange = function () {
        const color = colorPicker.value;
        const editor = document.getElementById('editor');
        editor.focus();
        document.execCommand('backColor', false, color);
      };
    }

    function changeTextColor() {
      const textColorPicker = document.getElementById('colorPicker');
      textColorPicker.click();
      textColorPicker.onchange = function () {
        const color = textColorPicker.value;
        const editor = document.getElementById('editor');
        editor.focus();
        document.execCommand('foreColor', false, color);
      };
    }

    document.getElementById('fileInput').addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const editor = document.getElementById('editor');
          editor.focus();
          document.execCommand('insertHTML', false, e.target.result);
        }
        reader.readAsText(file);
      }
    });


    function changeFont() {
      const font = document.getElementById('fontSelect').value;
      if (font) {
        const editor = document.getElementById('editor');
        editor.focus();
        document.execCommand('fontName', false, font);
      }
    }

    function changeFontSize() {
      const size = document.getElementById('sizeSelect').value;
      if (size) {
        const editor = document.getElementById('editor');
        editor.focus();
        document.execCommand('fontSize', false, size);
      }
    }

    function formatHeading() {
            var headingLevel = document.getElementById('formatLevel').value;
            document.execCommand('formatBlock', false, headingLevel);
        }

         function clearFormatting() {
            const editor = document.getElementById('editor');
            const plainText = editor.innerText;
            editor.innerHTML = plainText;
            console.log("Formatting cleared. Current content: ", plainText);
        }

        // Event listener to log typed content to the console
        document.getElementById('editor').addEventListener('input', function() {
            const content = this.innerHTML;
            console.log("Current content: ", content);
        });

    // Function to handle form submission
    async function sendEmail(event) {
      event.preventDefault(); // Prevent default form submission

      // Collect form data
      const data = {
        to: document.getElementById("to").value.trim(),
        cc: document.getElementById("cc").value.trim(),
        bcc: document.getElementById("bcc").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        name: document.getElementById("name").value.trim(),
        customMessage: document.getElementById("editor").innerHTML.trim(),
        Closing: document.getElementById("Closing").value.trim(),
      };

      // Validate required fields
      if (!data.to || !data.subject || !data.name || !data.customMessage) {
        document.getElementById("responseMessage").innerText =
          "Please fill in all required fields!";
        return;
      }

      try {
        // Send the email data to the backend
        const response = await fetch("/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        document.getElementById("responseMessage").innerText =
          result.message || "Email sent successfully!";
           const resultsElements = document.querySelectorAll('.results');
    resultsElements.forEach(element => {
        element.style.display = 'flex';
      });
      } catch (error) {
        document.getElementById("responseMessage").innerText =
          "Error sending email: " + error.message;
      }
    }

    function hideResults() {
    const resultsElements = document.querySelectorAll('.results');
    resultsElements.forEach(element => {
        element.style.display = 'none';
    });
}


    // Attach event listener to form submission
    document.getElementById("emailForm").addEventListener("submit", sendEmail);
  </script>

</body>

</html>
    `);
});


// Email sending route with custom template
app.post("/send-email", async (req, res) => {
  const { to, subject, name, customMessage, cc, bcc, Closing } = req.body;

  if (!to || !subject || !name || !customMessage) {
    return res
      .status(400)
      .json({ message: "To, subject, name, and customMessage are required!" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lasindukumara2020@gmail.com", // Replace with your Gmail address
        pass: "qtkecpvnscgdwuhp", // Replace with your Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define the HTML template
    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email Template</title>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }

  .container {
    width: 95%;
    max-width: 1400px;
    margin: 20px auto 0 auto;
    /* or simply margin: 20px auto; */
    background: #f7f7f7;
    padding: 2.5%;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .header {
    text-align: center;
    padding-bottom: 20px;
  }

  .header h1 {
    color: #003366;
    font-size: 1.4em;
    /* Deep blue for header text */
  }

  .header img {
    display: none;
    max-width: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .header h4 {
    font-size: 1.2em;
  }

  .content {
    padding: 0 0 0 10px;
    font-size: 1em;
 
  }

  .content img {
    max-width: 90%;
  }

  .signature {
    text-align: left;
    margin-top: 20px;
    padding: 0 0 0 20px;
  }

  .signature p {
    font-size: 0.8em;
  }

  .signature img {
    height: 2.2em;
    margin-top: 10px;
  }

  .footer {
    background-color: #f1f3f4;
    padding: 30px;
    border-top: 5px solid#003366;
    border-radius: 0 0 8px 8px;
    text-align: center;
    margin-top: 20px;
    font-size: 0.8em;
    color: #000000;
    /* White text for contrast */
  }

  .footer-container {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    
  }
  .footer-container2 {
display: flex;
          max-width: 600px;
          margin: 0 auto;    flex-direction: row;
flex-wrap: wrap;
   align-items: center;
  }

  /* Optional: Adjust left and right columns */
  .footer-left,
  .footer-right {
    width: 45%;
  }

  .footer-left img {

    width: 20vw;
   max-width: 150px; 
    border-radius: 50%;
  }

  .footer-right {
    padding-left: 20px;
    text-align: left;
  }

  .footer h3 {
    margin: 0;
    font-size: 1.3em;
  }

  .footer .contact-info {
    margin-top: 15px;
    font-size: 1em;
  }

  .footer .contact-info p {
    margin: 5px 0;
  }

  .footer .contact-info p a {
       text-decoration: none;
   
  }

  .footer .social-media {
    text-align: center; 
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(245, 245, 245, 0);
    border-radius: 1em;
    padding: 0 10px;
  }

  .footer .social-media a {
    display: block;
    color: #ffffff;
    text-decoration: none;
  }

  .footer .social-media img {
    margin: 0.15em 0.15em;
    height: 1.7em;
    max-height: 30px;
  }

  .footer .social-media a:hover {
    color: #ffbb00;
  }

  .footer .footer-bottom {
    margin-top: 20px;
    font-size: 0.8em;
    text-align: center;
    width: 100%;
  }

  .footer .footer-bottom a {
    color: #ffbb00;
    text-decoration: none;
  }

  .footer .footer-bottom a:hover {
    text-decoration: underline;
  }

  /* Responsive Design */
  @media screen and (min-width: 769px) {
  body {
    font-size: 18px;
  }
  .header h1 {
    font-size: 2em; /* Increase header size */
  }
  .header h4 {
    font-size: 1.5em;
  }
  .content {
    font-size: 1.2em;
  }
  .signature p {
    font-size: 1em;
  }
  .footer {
    font-size: 1em;
  }

  .footer-left,
    .footer-right {
      width: 100%;
      margin-bottom: 20px;
    }
}

</style>
</head>

<body>
<div class="container">
  <!-- Header Section -->
  <div class="header">
    <img
      src="https://drive.usercontent.google.com/download?id=1dL1r_M4xAt7xychPdnYb8JJPx34FHEZJ&export=view&authuser=0"
      alt="Your Picture"
    />
    <h1>Hello, ${name}!</h1>
    <h4>Subject: ${subject}</h4>
  </div>

  <!-- Content Section -->
  <div class="content">
    ${customMessage}
    <h5>${Closing},</h5>
  </div>

  <!-- Signature Section -->
  <div class="signature">
    <img
      src="https://drive.usercontent.google.com/download?id=1PWkTfjHzBmx_HDZ2tQOEWDQxTzu8623D"
      alt="A.H.K.Lasindu Kumara's Signature"
    />
    <p>
      Lasindu Kumara <br />
      Undergraduate at University of Colombo <br />
      Student of Chartered Institutes of Sri Lanka
    </p>
  </div>

  <!-- Footer Section -->
  <div class="footer">
    <div class="footer-container">
      <div class="footer-container2">
        <!-- Left Content -->
        <div class="footer-left" style="width: 45%; padding: 10px">
          <img
            src="https://drive.usercontent.google.com/download?id=1dL1r_M4xAt7xychPdnYb8JJPx34FHEZJ&export=view&authuser=0"
            alt="A.H.K.Lasindu Kumara"
          />
        </div>

        <!-- Vertical Line -->
        <div style="width: 2px; background-color: #000"></div>

        <!-- Right Content -->
        <div class="footer-right" style="width: 45%; padding: 10px">
          <h3 style="margin: 0">A.H.K Lasindu Kumara</h3>
          <p style="margin: 5px 0">
            <strong>Undergraduate</strong><br />
            University of Colombo
          </p>
          <p style="margin: 5px 0">
            <strong>Email:</strong>
            <a
              href="mailto:lasindukumara2020@gmail.com"
              style="text-decoration: none"
              >lasindukumara2020@gmail.com</a
            >
          </p>
          <p style="margin: 5px 0">
            <strong>Phone:</strong>
            <a href="tel:+94762515384" style="text-decoration: none"
              >+94 76 2515384</a
            >
          </p>
          <p style=" margin: 5px 0">
            <strong>Address:</strong> 37/7, Sri Hemanandha Mawtha,
            Bataganvila, Galle.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer Bottom Section -->
    <div class="footer-bottom">
      
      <p><strong>Connect with me:</strong></p>

      <div style="display: table; max-width: 195px; margin: 0 auto">
        <div
          class="social-media"
        >

               <a
            href="mailto:lasindukumara2020@gmail.com"
            target="_blank"
          >
            <img
              src="https://drive.usercontent.google.com/download?id=1ffI2AsWW0zx5kHL49LJPQ0zOyhfSyKVF"
              alt="Gmail"
            />
          </a>
               <a
            href="https://t.me/lasindukumara2020"
            target="_blank"
          >
            <img
              src="https://drive.usercontent.google.com/download?id=1Pec8tpnQw4AOVStY7YI57BLqhCLHIW2M"
              alt="Telegram"
            />
          </a>
          <a href="https://wa.me/message/3YKJQ3APQHDYF1" target="_blank">
            <img
              src="https://drive.usercontent.google.com/download?id=1In2ppS2SeFgl23oiUymxLoKKLyDxudba"
              alt="WhatsApp"
            />
          </a>


        </div>
      </div>

      <p><strong>Follow me on:</strong></p>

      <div style="display: table; max-width: 195px; margin: 0 auto">
        <div
          class="social-media"
        >
          <a
            href="https://www.facebook.com/lasindukumara2020/"
            target="_blank"
          >
            <img
              src="https://drive.usercontent.google.com/download?id=12t-2CVUBL4Q4NbTHn6psKJSWytYRnGA0"
              alt="Facebook"
            />
          </a>
          <a
            href="https://www.instagram.com/lasindukumara2020/"
            target="_blank"
          >
            <img
              src="https://drive.usercontent.google.com/download?id=13oPaiStUefoCCY7r2MkhJNwVnFQ0TYrx"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/lasindukumara"
            target="_blank"
          >
            <img
              src="https://drive.usercontent.google.com/download?id=1eSIq10xXjxCM_DiHkrILEOxqJsjV-6TI"
              alt="LinkedIn"
            />
          </a>
               <a
            href="https://github.com/lasindukumara/"
            target="_blank"
          >
            <img
              src="https://drive.usercontent.google.com/download?id=17QsieOU1xZKabD4ipDMwvDUmgiBZjuZZ"
              alt="GitHub"
            />
          </a>
          <a href="https://x.com/lasindukumara" target="_blank">
            <img
              src="https://drive.usercontent.google.com/download?id=1UxJEtx7UR6CwepBV1z21GW_x0PnZd_mJ"
              alt="X"
            />
          </a>
          <a href="https://www.youtube.com/@lasindu_kumara" target="_blank">
            <img
              src="https://drive.usercontent.google.com/download?id=18UbVtAS8twDz2-n-6J6_2aWRlqJc7yXY"
              alt="YouTube"
            />
          </a>
        </div>
      </div>
     <p>
        &copy; 2025 A.H.K Lasindu Kumara. All rights reserved.<br />
        The information of this email is confidential. If you have received
        it by error, please inform us by email and then delete the message.
        It is illegal to disclose the contents of this message to anyone.
        The integrity or security of this email cannot be guaranteed over
        the Internet. Therefore, the sender will not be responsible for any
        damage caused by this email.
      </p>
    </div>
  </div>
</div>
</body>
</html>

`;

    // Define email options
    const mailOptions = {
      from: "lasindukumara2020@gmail.com", // Replace with your email address
      to: to, // Add recipient email
      cc: cc, // Add cc field
      bcc: bcc, // Add bcc field
      subject: subject,
      customMessage: customMessage,
      Closing: Closing,
      html: emailTemplate,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    res.json({
      message: "Email sent successfully!",
      info: info,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

// 404 Route (matches undefined routes)
app.use((req, res) => {
  res.status(404).send("Sorry, the page you are looking for does not exist!");
});

console.log('Starting application...');

// Place this log at various points to track the app's behavior
console.log('App has reached this point...');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  exec(`start http://localhost:${port}`);
  console.log('Browser opened.');
});

console.log('Application setup complete.');



// Global error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});



/************/
/* A script implementing a game as described in README.md
/************/

console.log('main.js is working')


/***********************/
/*                     */
/* ---  FUNCTIONS  --- */
/*                     */
/***********************/

/* UTILITIES FUNCTIONS */
function build_mainBoard(HTML_idElement, total) {
    //A function accepting a integer 'total' and a HTML ID element; and creating a number 'total' of button as innerHTML of the givern element. Each button contain as text a integer, in such a way that each button has a different number from 1 to 'total'.
    var content = ''
    for (i = 1; i <= total; i++) {
        content += '<button id="button-board-' + i + '" class="button main-board-button" value="' + i + '"><span>' + i + '</span></button>'
    }
    document.getElementById(HTML_idElement).innerHTML = content
}


function message_to_user(HTML_idElement, content) {
    //A function accepting a var and HTML element ID, and adding such var as content of said HTML element
    document.getElementById(HTML_idElement).innerHTML = content
}


function radioInput__checked_value(name) {
    // A function accepting a name of HTML input elements of type "radio", and returning the value of the checked option.
    var array = document.getElementsByName(name)
    for (i = 0; i < array.length; i++) {
        if (array[i].checked) {
            return array[i].value
        }
    }
}


/* GAME SECONDARY FUNCTIONS */
function difficultLevel(userChoise) {
    // A function accepting an integer "userChoise" and returning an integer according to the game rules as described in README.md; return -1 if parameter is invalid.
    switch (userChoise) {
        case 1:
            return 100
        case 2:
            return 80
        case 3: 
            return 50
        default:
            return -1
    }
}


function randomNumberSet(n, max) {
    //A function accepting two integer "n" and "max", and returning a set of n different ingeters from 1 to max, included. Return -1 if either parameter is not number of smaller than 1.
    var randomNumbers = new Set()

    if (isNaN(n) || n < 1 || isNaN(max) || n < 1) {return -1}  // Validation

    while (randomNumbers.size < n) {
        randomNumbers.add(Math.floor(Math.random() * max) + 1)
    }
    
    return randomNumbers
}


function resultOfAttempt(user_value, invalid_set) {
    //A function accepting a variable 'user_value' and a set 'invalid_set'; and returing true if 'user_value' is not an element of the set.
    if (invalid_set.has(user_value)) {
        return false    //game over
    }
    return true //game continue
}
    

/* GAME MAIN FUNCTIONS */
function opening_button() {
    level = parseInt(radioInput__checked_value('level')) //Chosenlevel of difficulty by user
    levelMax = difficultLevel(level)
    losingNumbers = randomNumberSet(totalRandom, levelMax) 

    // resettting variables
    message_to_user(score_box, 0) 
    message_to_user('level-text', level)
    attempted = [] 

    build_mainBoard('main-board', levelMax) // Building the board
    mainBoard_buttons = document.getElementsByClassName('main-board-button')
    for (let i = 0; i < mainBoard_buttons.length; i++) { // Adding class to losing buttons
        if (losingNumbers.has(i + 1)) {
            document.getElementById('button-board-' + (i + 1)).classList += ' losing-numbers'}
    }                                        
    
    message_to_user(text_box, 'Choose a number!')

    for (let i = 0; i < mainBoard_buttons.length; i++) {
        mainBoard_buttons[i].addEventListener('click', mainPhase);
    }
}



function mainPhase() {
    singleAttempt = parseInt(this.value)
    document.getElementById('button-board-' + this.value).disabled = true  // disabling button
    document.getElementById('button-board-' + this.value).classList += ' attempted'

    if (resultOfAttempt(singleAttempt, losingNumbers)) {  //check if number is in set
        attempted.push(singleAttempt)
        if (attempted.length < levelMax - totalRandom) {
            message_to_user(score_box, attempted.length)
            message_to_user(text_box, 'You got it right!<br><br>The game continue.')
        }
        else {
            endgame(true, attempted.length) // player wins
        }
    } else { 
        endgame(false, attempted.length)
    }
}


function endgame(result, score) {
    for (let i = 0; i < mainBoard_buttons.length; i++) {
        mainBoard_buttons[i].disabled = true;
    }

    if (result) {
        message_to_user(text_box, 'You win!<br><br>You scored' + score + ' points!')
    } else {
        message_to_user(text_box, 'Game over!<br><br>Your final score is: ' + score + ' points.')
    }
}




/***********************/
/*                     */
/* --- MAIN SCRIPT --- */
/*                     */
/***********************/


/*GLOBAL VARIABLES*/
const play_button = document.getElementById('play-button')
const text_box = document.getElementById('text-message')
const score_box = document.getElementById('score-message')
const totalRandom = 16

var level
var levelMax 
var losingNumbers
var mainBoard_buttons
var attempted = []


/* GAMEPLAY */
play_button.addEventListener('click', opening_button) 



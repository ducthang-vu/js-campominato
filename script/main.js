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
    //A function accepting an integer 'total' and a HTML ID element; and creating a number 'total' of button as innerHTML of the given element. Each button contains as text an integer, in such a way that each button has a different number from 1 to 'total'.
    var content = ''
    for (i = 1; i <= total; i++) {
        content += '<button id="button-board-' + i + '" class="button main-board-button" value="' + i + '"><span>' + i + '</span></button>'
    }
    document.getElementById(HTML_idElement).innerHTML = content
}


function message_to_user(HTML_idElement, content) {
    //A function accepting a HTML element ID and a variable, and adding such var as content of said HTML element.
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
    //A function accepting a variable 'user_value' and a set 'invalid_set'; and returning true if 'user_value' is not an element of the set.
    if (invalid_set.has(user_value)) {
        return false    //game should end
    }
    return true     //game should continue
}
    

/* GAME MAIN FUNCTIONS */
function startGame() {
    // A function for setting the game according to the rules and the level of difficulty. In this phase the user does not give any input.
    level = parseInt(radioInput__checked_value('level')) //Chosen level of difficulty by user
    levelMax = difficultLevel(level)
    losingNumbers = randomNumberSet(totalRandom, levelMax) 

    // reset game
    message_to_user(score_box, 0) 
    message_to_user('level-text', level)
    attempted = [] 

    // Building the board with buttons, and creating a collection thereof
    build_mainBoard('main-board', levelMax) 
    mainBoard_buttons = document.getElementsByClassName('main-board-button')

    // Adding HTML class to losing buttons
    for (let i = 0; i < mainBoard_buttons.length; i++) { 
        if (losingNumbers.has(i + 1)) {
            document.getElementById('button-board-' + (i + 1)).classList += ' losing-numbers'}
    }                                        
    
    message_to_user(text_box, 'Choose a number!')

    // Enabling the buttons
    for (let i = 0; i < mainBoard_buttons.length; i++) {
        mainBoard_buttons[i].addEventListener('click', mainPhase);
    }
}


function mainPhase() {
    // A function modelling the interaction with the user.
    singleAttempt = parseInt(this.value)    // value from user
    document.getElementById('button-board-' + this.value).disabled = true  // disabling button
    document.getElementById('button-board-' + this.value).classList += ' attempted'     // adding HTML class to button

    if (resultOfAttempt(singleAttempt, losingNumbers)) {    //check if number is in set
        attempted.push(singleAttempt)
        if (attempted.length < levelMax - totalRandom) {    // check if the game can continue
            message_to_user(score_box, attempted.length)
            message_to_user(text_box, 'You got it right!<br><br>The game continue.')
        }
        else {
            endgame(true, attempted.length) // player wins
        }
    } else { 
        endgame(false, attempted.length)  // player loses
    }
}


function endgame(result, score) {
    // A function ending the game, by disabling all buttons, and by declaring the result to the user.
    for (let i = 0; i < mainBoard_buttons.length; i++) {  // disabling all buttons
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
const text_box = 'text-message'
const score_box = 'score-message'
const totalRandom = 16

var level
var levelMax 
var losingNumbers
var mainBoard_buttons
var attempted = []


/* GAMEPLAY */
play_button.addEventListener('click', startGame) 

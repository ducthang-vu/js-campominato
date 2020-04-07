/************/
/* A script implementing a game as described in README.md
/************/

console.log('main.js is working')

/*********************/
/* --- FUNCTIONS --- */
/*********************/

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


function promtpUser(max, invalid_array) {
    //A function accepting an integer 'max' and an array 'invalid_array', and prompting user to enter a number 'user_value', as many times as necessary until 1 < 'user_value' <= max and != from any item of 'invalid_array'. Returns the 'user_value'.
    var user_value = parseInt(prompt('Enter a number between 1 and ' + max))
    while (isNaN(user_value) || user_value < 1 || user_value > max || invalid_array.includes(user_value)) {
        user_value = parseInt(prompt('Your number is not valid, enter a diferrent number between 1 and ' + max + ': '))
    }

    return user_value
}


// TODO -- VALIDATION
function resultOfAttempt(user_value, invalid_set) {
    //A function accepting a number 'user_value' and a set 'invalid_set'; and returing true if 'user_value' is not an element of the set.
    if (invalid_set.has(user_value)) {
        return false    //game over
    }
    return true //game continue
}


function mainPhase(levelMax, totalRandom, losingNumbers) {
    //A function modelling the solving process by the player according to the game rules as described in README.md. Return an array, being array[0] = true if the player have completed all possible attempts, otherwise false; and array[1] being the total numbers of attempts
    var attempted = [] //creating array of attempt
    while (attempted.length < levelMax - totalRandom) { 
        var singleAttempt = promtpUser(levelMax, attempted) //ask user for number and validate number
        //var singleAttempt = getting_userValue('main-board', attempted)

        if (resultOfAttempt(singleAttempt, losingNumbers)) {  //check if number is in set
            attempted.push(singleAttempt)
            alert('You got it right! You score now is: is: ' + attempted.length + '. \nThe game continue.')
        } else { 
            return [false, attempted.length]
        }
    }
    return [true, attempted.length]
}
              

function gameplay(userChoise, totalRandom) {
    var levelMax = difficultLevel(userChoise) //Chosing level of difficulty

    build_mainBoard('main-board', levelMax)

    const losingNumbers = randomNumberSet(totalRandom, levelMax) 

    var result = mainPhase(levelMax, totalRandom, losingNumbers)  //array with overall result
    
    if (result[0]) {
        message_to_user('text-message', 'You win!\nYou scored' + result[1] + ' points!')
    } else {
        message_to_user('text-message', 'Game over!<br>Your final score is: ' + result[1] + ' points.')
    }
}




/* UTILITIES FUNCTIONS */
function fakeset() {
    // A function creating a set of integers number from 1 to 49.
    var fakeset = new Set()
    for (let i = 0; i < 50; i++) {fakeset.add(i)}
    return fakeset
}


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

/***********************/
/* --- MAIN SCRIPT --- */
/***********************/
var button1 = document.getElementById('button1')
var button2 = document.getElementById('button2')
var button3 = document.getElementById('button3')



/* EVENTS */
button1.addEventListener('click', 
    function() {
        gameplay(1, 16)
    }
) 


button2.addEventListener('click', 
    function() {
        gameplay(2, 16)
    }
) 


button3.addEventListener('click', 
    function() {
        gameplay(3, 16)
    }
) 

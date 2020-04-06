/************/
/* A script implementing a game as described in README.md
/************/

console.log('main.js is working')

/*********************/
/* --- FUNCTIONS --- */
/*********************/

function difficultLevel(userChoise) {
    // A function accepting a integer "userChoise" and returning a integer according to the game rules as described in README.md; return -1 if parameter is invalid.
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
    //A function accepting two integer "n" and "max", and returning a set of n different ingeters from 1 to max included. Return -1 if either parameter is not number of smaller than 1.
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


function attemps_by_player(levelMax, totalRandom, losingNumbers) {
    //A function modelling the solving process by the player according to the game rules as described in README.md. Return an array, being array[0] true if the player have completed all possible attempts, otherwise false, and array[1] being the total numbers of attempts
    var attempted = [] //creating array of attempt
    while (attempted.length < levelMax - totalRandom) { 
        var singleAttempt = promtpUser(levelMax, attempted) //ask user for number and validate number

        if (resultOfAttempt(singleAttempt, losingNumbers)) {  //check if number is in set
            attempted.push(singleAttempt)
            alert('You got it right! You score now is: is: ' + attempted.length + '. \nThe game continue:')
        } else { 
            return [false, attempted.length]
        }
    }
    return [true, attempted.length]
}



function gameplay(userChoise, totalRandom) {
    var levelMax = difficultLevel(userChoise) //Chosing level of difficulty
    const losingNumbers = randomNumberSet(totalRandom, levelMax) // creating set of random numbers //for testing: const losingNumbers = fakeset()
    var result = attemps_by_player(levelMax, totalRandom, losingNumbers)  //array with overall result
    

    if (result[0]) {
        console.log('You win!\nYou scored' + result[1] + ' points!')} 
    else {
        alert('Game over! Check your result in console!')             //user loses: print score
        console.log('You final score is: ' + result[1] + ' points.')
    }
}


function fakeset() {
    var fakeset = new Set()
    for (let i = 0; i < 50; i++) {fakeset.add(i)}
    return fakeset
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
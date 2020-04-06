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





function gameplay(userChoise) {
    //creating scoreCounter
    var currentScore = 0
    var attempted = [] //creating array of attempt

    //Chosing level of difficulty
    var levelMax = difficultLevel(userChoise)

    //creating set of random numbers
    const losingNumbers = randomNumberSet(16, levelMax)
    console.log(losingNumbers)

    while (currentScore < (levelMax - 16)) { 
        var singleAttempt = promtpUser(levelMax, attempted) //ask user for number and validate number

        if (resultOfAttempt(singleAttempt, losingNumbers)) {  //check if number is in set
            ++currentScore
            attempted.push(singleAttempt)
            alert('You got it right! You score now is: is: ' + currentScore + '. \nThe game continue:')
        } else { 
            //user loses: print score
            alert('Game over! Check your result in console!')
            console.log('You final score is: ' + currentScore + '.')
            break
        }
    }
    console.log('You win!')
}



/***********************/
/* --- MAIN SCRIPT --- */
/***********************/
var button3 = document.getElementById('button3')

button3.addEventListener('click', 
    function() {
        gameplay(3)
    }
) 
/************/
/* A script implementing a game as described in README.md
/************/

console.log('main.js is working')

/*********************/
/* --- FUNCTIONS --- */
/*********************/

function difficultLevel(userChoise) {
    // A fanction accepting a integer "userChoise" and returning a integer according to the game rules as described in README.md; return -1 if parameter is invalid.
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
        randomNumbers.add(Math.floor(Math.random() * 100) + 1)
    }
    
    return randomNumbers
}






function gameplay(userChoise) {
    //creating scoreCounter
    var currentScore = 0

    //Chosing level of difficulty
    var levelMax = difficultLevel(userChoise)

    //creating set of random numbers
    const losingNumbers = randomNumberSet(16, levelMax)

    //creating array of attempt
    var attempted = []

    //ask user for number
    var singleAttempt = parseInt(prompt('Enter a number:'))
        //validate the number
    
    //if number is in set
        //user loses
        //game continue
}

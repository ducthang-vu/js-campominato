/************/
/* A script implementing a game as described in README.md
/************/

console.log('main.js is working')

/*********************/
/* --- FUNCTIONS --- */
/*********************/

function randomNumberSet(n, max) {
    //A function accepting two integer "n" and "max", and returning a set of n different ingeters from 1 to max included. Return -1 if either parameter is not number of smaller than 1.
    var randomNumbers = new Set()

    if (isNaN(n) || n < 1 || isNaN(max) || n < 1) {return -1}  // Validation

    while (randomNumbers.size < n) {
        randomNumbers.add(Math.floor(Math.random() * 100) + 1)
    }
    
    return randomNumbers
}


function difficultLevel() {

}



function game() {
    //creating scoreCounter, difficult level
    var currentScore = 0
    var level = 1;
    //Chosing level of difficulty

    //creating set of random numbers
    randomNumberSet(16, max)

    //creating array of attempt

    //ask user for number
        //validate the number

    //if number is in set
        //user loses
        //game continue
}

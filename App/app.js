var initialPositions = [
    [0, 0, 0, 0, 0], 
    [0, 0, 1, 0, 0], 
    [0, 1, 1, 1, 0], 
    [0, 0, 1, 0, 0], 
    [0, 0, 0, 0, 0], 
]

const getValidIndex = (i, j, m, n) => {
    /*
        Get the valid values that can be used for each element on the matrix. 
    */
    var validForWidth = [], validForHeight = []; 
    i - 1 > -1 ? validForWidth.push(i - 1) : null;
    validForWidth.push(i);
    validForHeight.push(j); 
    j - 1 > -1 ? validForHeight.push(j - 1) : null;
    i + 1 < n ? validForWidth.push(i + 1) : null;
    j + 1 < m ? validForHeight.push(j + 1) : null;
    return [validForWidth, validForHeight]; 
}


const generateCombinations = (values) => {
    let combinations = [], widthValues, heightValues; 
    widthValues = values[0];
    heightValues = values[1];
    for(let i = 0; i , i < widthValues.length; i++){
        for(let j = 0; j < heightValues.length; j++){
            combinations.push([widthValues[i], heightValues[j]]); 
        }
    }
    return combinations; 
}


const checkNeighbours = (i, j, combinations, gameBoard) => {
    var alive = 0, death = 0; 
    for(let k = 0; k < combinations.length; k++){
        if(JSON.stringify(combinations[k]) !== JSON.stringify([i, j])){
            let m = combinations[k][0];
            let n = combinations[k][1];
            gameBoard[m][n] == 1 ? alive += 1 : death += 1;
        }
    }
    return [alive, death];
}


const nextGeneration = (i, j, status, gameBoard) => {
    let alive = status[0]; 
    let death = status[1]; 
    if(gameBoard[i][j] == 0 && alive == 3){
        gameBoard[i][j] = 1; 
    } else if(gameBoard[i][j] == 0 && (alive == 3 || alive == 2)){
        gameBoard[i][j] = 1;
    } else{
        gameBoard[i][j] = 0;
    }

    return gameBoard

}


const gameOfLife = (initial) => {
    /*
        Main game controller. 
    */
    var nextGen = [...initial]
    const gameHeight = initial.length; 
    const gameWidth = initial[0].length; 
    for(let i = 0; i < gameWidth; i++){
        for(let j = 0; j < gameHeight; j++){
            let validValues, combinations; 
            validValues = getValidIndex(i, j, gameHeight, gameWidth); 
            combinations = generateCombinations(validValues); 
            neighbourStatus = checkNeighbours(i, j, combinations, initial); 
            console.log(initial);
            nextGen = nextGeneration(i, j, neighbourStatus, initial)
        }
    }


    
}

gameOfLife(initialPositions)
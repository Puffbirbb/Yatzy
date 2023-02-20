//Variable n stuff

/** Face values of the 5 dice.
1 <= values[i] <= 6 for i in [0..4]
*/

let values = new Array(5);

let throwCount = 0;


/**Random number between 1 and 5 generator */
let randomNumber = Math.floor(Math.random() * 5) + 1;


/**
* Reset the throw count.
 */
let resetThrowCount = () => {
throwCount = 0;
}

/**
* Roll the 5 dice. Only roll dice that are not hold.
* Note: holdStatus[i] is true, if die no. i is hold (for i in [0..4]).
*/
function throwDice(holdStatus) {
    for (let i = 0; i < 5; i++) {
      if (holdStatus[i] === false) {
        values[i] = randomNumber
      }
    }
    throwCount++;
  }

//------------------------------------------------------------------------------
function getResults() {
let results = new Array(15);

}

/** Creates an array the size of 7
 * Iterates through the values array and adds the value of each die to the array.
 * Adds the sum of the frequency value to the corresponding [i] in the array.
 */
function frequency() {
    const frequency1 = [0, 0, 0, 0, 0, 0, 0];
    
    for (const value of values) {
      frequency1[value]++;
    }
    return frequency1;
  }

  /** Returns the sum of the frequency values of the 5 dices.
   */
  function sameValuePoints(value){
    return frequency()[value] * value;
  }


  //------------------------------------------------------------------------------
  // Pairs

  /** Returns points for one pair(for the facevalue with potential highest points)
   * Returns 0, if there are 2 dice with the same face value.
   */
  function onePairPoints(){
    let sum = 0;
    for(let i = 1; i < frequency.length; i++){
        if(frequency()[i] >= 2){
        sum += i * 2;
        }
     }
     return sum;
  }

  /** Returns points for two pairs
   * (for the 2 face values giving the highest points)
   * Returns 0 if there aren't 2 pairs.
   * and 2 other dice with the same face but different values.
   */
  function twoPairPoints() {
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 1; i < frequency.length; i++) {
      if (frequency[i] >= 2) {
        sum1 = i * 2;
  
        for (let j = i + 1; j < frequency.length; j++) {
          if (frequency[j] >= 2) {
            sum2 = j * 2;
            break;
          }
        }
        break;
      }
    }
    return sum1 && sum2 ? sum1 + sum2 : 0;
  }

 //------------------------------------------------------------------------------
 //Same points

 /**Return points of 3 of a kind
  * Return 0 if there aren't 3 of a kind.
  */
 function threeSamePoints() {
    let sum = 0;
    for (let i = 1; i < frequency.length; i++) {
        if (frequency[i] >= 3) {
            sum = i * 3;
        }
    }
    return sum;
 }

 /**Return points of 4 of a kind
  * Return 0 if there aren't 4 of a kind.
  */
 function fourSamePoints() {
    let sum = 0;
    for (let i = 1; i < frequency.length; i++) {
        if (frequency[i] >= 4) {
            sum = i * 4;
        }
    }
    return sum;
 }

 /**Return points of full house
  * Return 0 if there aren't 3 with the same face value and two with the same face value.
  */
 function fullHousePoints() {
    let threeOfAKind = 0;
    let twoOfAKind = 0;
  
    for (let i = 1; i < frequency.length; i++) {
      if (frequency[i] >= 3) {
        threeOfAKind = i * 3;
        break;
      }
    }
  
    for (let j = 1; j < frequency.length; j++) {
      if (frequency[j] >= 2 && j !== threeOfAKind / 3) {
        twoOfAKind = j * 2;
        break;
      }
    }
  
    return threeOfAKind && twoOfAKind ? threeOfAKind + twoOfAKind : 0;
  }




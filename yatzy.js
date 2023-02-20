//Variable n stuff

/** Face values of the 5 dice.
1 <= values[i] <= 6 for i in [0..4]
*/

let values = new Array(5);

let throwCount = 0;

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
    for (let i = 0; i <= 5; i++) {
      if (holdStatus[i] === false) {
        values[i] = Math.floor(Math.random() * 6 + 1);
        console.log(values[i]);
      }
    }
    throwCount++;
}

//------------------------------------------------------------------------------

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
    for(let i = 1; i < frequency().length; i++){
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
    for (let i = 1; i < frequency().length; i++) {
      if (frequency()[i] >= 2) {
        sum1 = i * 2;
  
        for (let j = i + 1; j < frequency().length; j++) {
          if (frequency()[j] >= 2) {
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
    for (let i = 1; i < frequency().length; i++) {
        if (frequency()[i] >= 3) {
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
    for (let i = 1; i < frequency().length; i++) {
        if (frequency()[i] >= 4) {
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
  
    for (let i = 1; i < frequency().length; i++) {
      if (frequency()[i] >= 3) {
        threeOfAKind = i * 3;
        break;
      }
    }
  
    for (let j = 1; j < frequency().length; j++) {
      if (frequency()[j] >= 2 && j != threeOfAKind / 3) {
        twoOfAKind = j * 2;
        break;
      }
    }
  
    return threeOfAKind && twoOfAKind ? threeOfAKind + twoOfAKind : 0;
  }
  
 //------------------------------------------------------------------------------
 //Straights

 /**Return points for small straight
  * Return 0, if the dice aren't 1, 2, 3, 4 and 5
  */
 function smallStraightPoints() {
    let sum = 0;
    for (let i = 1; i < frequency().length - 1; i++) {
        if(frequency()[i] !== 1){
            return 0;
        } else {
            sum = 15;
        }
    }
    return sum;
 }

 /**Return points for large straight
  * Return 0, if the dice aren't 2, 3, 4, 5 and 6
  */
 function largeStraightPoints(){
    let sum = 0;
    for (let i = 0; i < frequency().length; i++) {
        if(frequency()[i]!== 1){
            return 0;
        } else {
            sum = 20;
        }
    }
    return sum;
 }

 //------------------------------------------------------------------------------
 // Chance and yatzy

 /**Return points for chance(sum of face values)*/
 function chancePoints() {
    let points = 0;
    for (let face of values) {
      points += face;
    }
    return points;
  }

  /**Returns points for yatzy(50 points)
   * Return 0, if there aren't 5 dice with the same face value.
   */
function yatzyPoints(){
  let sum = 0;
  for(let i = 1; i < frequency().length; i++){
      if(frequency()[i] >= 5){
        sum = 50;
      }
  }
  return sum;
}

function getResults() {
  let results = new Array(15);
  for (let i = 0; i < 6; i++) {
      let value = i + 1;
      let points = 0;
      for (let j = 0; j < values.length; j++) {
          if (values[j] === value) {
              points += value;
          }
      }
      results[i] = points;
  }
  results[6] = onePairPoints();
  results[7] = twoPairPoints();
  results[8] = threeSamePoints();
  results[9] = fourSamePoints();
  results[10] = fullHousePoints();
  results[11] = smallStraightPoints();
  results[12] = largeStraightPoints();
  results[13] = chancePoints();
  results[14] = yatzyPoints();

  return results;
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
  // GUI Functions
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

let resetGame = function () {
  resetThrowCount();
  for (let i = 1; i <= 5; i++) {
    let dice = document.getElementById("dice"+i);
    dice.src = "./Dice/" + i + ".png"
  }
  document.querySelector("button").disabled = false;
  document.querySelector("span").innerHTML = "Roll Counter: " + throwCount;
  holdStatusList = [false, false, false, false, false];
}

document.querySelector("span").innerHTML += throwCount;

let Names = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s", "One Pair", "Two Pair", "Three of a Kind", "Four of a Kind", "Full House", "Small Straight", "Large Straight", "Chance", "Yatzy", "Sum", "Bonus", "Total"];

for (let i = 0; i < 18; i++) {
  let label = document.createElement("label");
  label.innerHTML = Names[i];
  document.getElementById("Value-Container").appendChild(label);
  let input = document.createElement("input");
  document.getElementById("Value-Container").appendChild(input);
  input.type = "number";
  input.readOnly = true;
  input.id = i;
}

let holdStatusList = [false, false, false, false, false];

let valuesChange = function() {
  let results = getResults();
  for (let i = 0; i < results.length; i++) {
    if (document.getElementById(i).disabled === false) {
      document.getElementById(i).value = results[i];
    }
  }
}

let roll = function(){
  throwDice(holdStatusList);
  document.querySelector("span").innerHTML = "Roll Counter: " + throwCount;
  for (let i = 1; i <= 5; i++){
    let dice = document.getElementById("dice"+i);
    dice.src = "./Dice/" + values[i-1] + ".png"
  }
  if (throwCount === 3){
    document.querySelector("button").disabled = true;
  }
  valuesChange();
}

let rollButton = document.querySelector("button");
rollButton.onclick = () => roll();

let dice1 = document.getElementById("dice1");
let dice2 = document.getElementById("dice2");
let dice3 = document.getElementById("dice3");
let dice4 = document.getElementById("dice4");
let dice5 = document.getElementById("dice5");

let ones = document.getElementById(0);
let twos = document.getElementById(1);
let threes = document.getElementById(2);
let fours = document.getElementById(3);
let fives = document.getElementById(4);
let sixes = document.getElementById(5);
let onePair = document.getElementById(6);
let twoPair = document.getElementById(7);
let threeOAK = document.getElementById(8);
let fourOAK = document.getElementById(9);
let fullHouse = document.getElementById(10);
let smallStraight = document.getElementById(11);
let largeStraight = document.getElementById(12);
let chance = document.getElementById(13);
let yatzy = document.getElementById(14);
let sum = document.getElementById(15);
let bonus = document.getElementById(16);
let total = document.getElementById(17);

dice1.onclick = () => {
  if (throwCount != 0){
    holdStatusList[0] = true;
    dice1.style.border = "2px solid #2BC232";
    dice1.style.borderRadius = "14px";
  }
}

dice2.onclick = () => {
  if (throwCount != 0){
    holdStatusList[1] = true;
    dice2.style.border = "2px solid #2BC232";
    dice2.style.borderRadius = "14px";
  }
}

dice3.onclick = () => {
  if (throwCount != 0){
    holdStatusList[2] = true;
    dice3.style.border = "2px solid #2BC232";
    dice3.style.borderRadius = "14px";
  }
}

dice4.onclick = () => {
  if (throwCount != 0){
    holdStatusList[3] = true;
    dice4.style.border = "2px solid #2BC232";
    dice4.style.borderRadius = "14px";
  }

}

dice5.onclick = () => {
  if (throwCount != 0){
    holdStatusList[4] = true;
    dice5.style.border = "2px solid #2BC232";
    dice5.style.borderRadius = "14px";
  }
}

ones.onclick = () => {
  if (throwCount != 0){
    const num1 = sum.value;
    const num2 = ones.value;
    sum.value = parseInt(+num1 + +num2);
    ones.disabled = true;
    resetGame();
  }
}

twos.onclick = () => {
  if (throwCount!= 0){
    const num1 = sum.value;
    const num2 = twos.value;
    sum.value = parseInt(+num1 + +num2);
    twos.disabled = true;
    resetGame();
  }
}

threes.onclick = () => {
  if (throwCount!= 0){
    const num1 = sum.value;
    const num2 = threes.value;
    sum.value = parseInt(+num1 + +num2);
    threes.disabled = true;
    resetGame();
  }
}

fours.onclick = () => {
  if (throwCount!= 0){
    const num1 = sum.value;
    const num2 = fours.value;
    sum.value = parseInt(+num1 + +num2);
    fours.disabled = true;
    resetGame();
  }
}

fives.onclick = () => {
  if (throwCount!= 0){
    const num1 = sum.value;
    const num2 = fives.value;
    sum.value = parseInt(+num1 + +num2);
    fives.disabled = true;
    resetGame();
  }
}

sixes.onclick = () => {
  if (throwCount!= 0){
    const num1 = sum.value;
    const num2 = sixes.value;
    sum.value = parseInt(+num1 + +num2);
    sixes.disabled = true;
    resetGame();
  }
}

onePair.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +onePair.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    onePair.disabled = true;
    resetGame();
  }
}

twoPair.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +twoPair.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    twoPair.disabled = true;
    resetGame();
  }
}

threeOAK.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +threeOAK.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    threeOAK.disabled = true;
    resetGame();
  }
}

fourOAK.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +fourOAK.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    fourOAK.disabled = true;
    resetGame();
  }
}

fullHouse.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +fullHouse.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    fullHouse.disabled = true;
    resetGame();
  }
}

smallStraight.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +smallStraight.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    smallStraight.disabled = true;
    resetGame();
  }
}

largeStraight.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +largeStraight.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    largeStraight.disabled = true;
    resetGame();
  }
}

chance.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +chance.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    chance.disabled = true;
    resetGame();
  }
}

yatzy.onclick = () => {
  if (throwCount!= 0){
    const num1 = (+sum.value + +yatzy.value);
    const num2 = total.value;
    total.value = parseInt(+num1 + +num2);
    yatzy.disabled = true;
    resetGame();
  }
}
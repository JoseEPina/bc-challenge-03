// Assignment Code
var generateBtn = document.querySelector("#generate"); //Associates html id = "#generate" with the variable generateBtn.
// Number of Criteria: Lowercase, Uppercase, Numbers, Special Characters.
const NUMBER_OF_CRITERIA = 4;
// const value of True to validate user 'selected' criteria
const YES = true;
// to store valid password length.
var passwordLength = 0;
// 'Super' Set of Characters that MERGES the set(s) of characters for ALL selected Criteria.
var superSetOfChars = [];

// Criteria Object:
// name - Criteria Name
// selected - was this criteria selected for Pwd? (Yes/No)
// setOfChars - define set of chars for this criteria
var criteria = [
   {
      name: "lower-case", // Criteria Name
      selected: false, // Criteria Selected Yes/No
      setOfChars: [
         "a",
         "b",
         "c",
         "d",
         "e",
         "f",
         "g",
         "h",
         "i",
         "j",
         "k",
         "l",
         "m",
         "n",
         "o",
         "p",
         "q",
         "r",
         "s",
         "t",
         "u",
         "v",
         "w",
         "x",
         "y",
         "z",
      ],
   },
   {
      name: "upper-case",
      selected: false,
      setOfChars: [
         "A",
         "B",
         "C",
         "D",
         "E",
         "F",
         "G",
         "H",
         "I",
         "J",
         "K",
         "L",
         "M",
         "N",
         "O",
         "P",
         "Q",
         "R",
         "S",
         "T",
         "U",
         "V",
         "W",
         "X",
         "Y",
         "Z",
      ],
   },
   {
      name: "special-characters",
      selected: false,
      setOfChars: [
         "!",
         "(",
         ")",
         "-",
         ".",
         "?",
         "[",
         "]",
         "_",
         "`",
         "~",
         ";",
         ":",
         "@",
         "#",
         "$",
         "%",
         "^",
         "&",
         "*",
         "+",
         "=",
      ],
   },
   {
      name: "numeric",
      selected: false,
      setOfChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
   },
];

// Presents prompts in a Loop
var presentPrompts = function () {
   superSetOfChars = [];
   console.log("Inside presentPrompts");
   // debugger;
   // Assumption that user did not select any Criteria
   var noneSelected = true;

   // Loops to present All criteria
   for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
      // Receive user input (Yes/True or No/Fasle) on property 'selected' of object Criteria
      criteria[i].selected = window.confirm("Do you want to use " + criteria[i].name + " characters in the password?");
      // If at least one user input is Yes/True, then noneSelected assumption is False.
      if (criteria[i].selected == YES) {
         // MERGE setofChars of selected criteria with the superSetofChars (using the spread operator ...)
         superSetOfChars = [...criteria[i].setOfChars, ...superSetOfChars];
         // noneSelected assumption is false, AT LEAST ONE criteria was selected.
         noneSelected = false;
         console.log(i, criteria[i].setOfChars);
         console.log(superSetOfChars);
      }
   }
   // If assumption is True (and No Criteria was selected), then send an alert message and prompt again.
   if (noneSelected === true) {
      window.alert("Please select at least ONE valid criteria. Try again.");
      presentPrompts();
   }
};

// Get and validate Password length input from user
var promptPasswordLength = function () {
   console.log("Prompt Password Length");

   // Create Const values to validate a valid password length range.
   const PWD_LENGTH_MIN = 8;
   const PWD_LENGTH_MAX = 128;

   // Read Password Lenth (in Number formm not string)
   passwordLength = parseInt(
      window.prompt(
         "What length do you need your password to be? Minimum is " +
            PWD_LENGTH_MIN +
            " characters long. Maximum is " +
            PWD_LENGTH_MAX +
            " characters long."
      )
   );
   // Validates for out of range password length(number), empty, or non-numeric input(spaces, other chars, etc).
   // If Length is invalid, present prompt function again
   if (passwordLength < PWD_LENGTH_MIN || passwordLength > PWD_LENGTH_MAX || isNaN(passwordLength)) {
      window.alert("Please enter a valid response.");
      promptPasswordLength();
   }
   console.log(passwordLength);
};

// var calculateCriteriaLength = function () {
//    // Determine count of selected criteria
//    var countedSelectedCriteria = 0;
//    for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
//       if (criteria[i].selected === YES) {
//          countedSelectedCriteria++;
//       }
//    }

//    // Determine each Criteria Characters' group size
//    var equalSize = Math.floor(passwordLength / countedSelectedCriteria);
//    // Adjust criteria size of password Length to compensate for Math.floor
//    var adjustedSize = passwordLength - equalSize * (countedSelectedCriteria - 1);

//    // Controls processing of groups with equal and different size of characters (due to use of Math.floor)
//    var auxIndex = 1;
//    // Loop to process object criteria array and assign max number of random characters per criteria selected
//    for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
//       // Process only if criteria was selected.
//       if (criteria[i].selected == YES) {
//          // Process all criteria except last one.
//          if (auxIndex < countedSelectedCriteria) {
//             criteria[i].totalCharsInPwd = equalSize;
//          } else {
//             // Process last criteria.
//             criteria[i].totalCharsInPwd = adjustedSize;
//          }
//          auxIndex++;
//       }
//    }
// };

var buildPassword = function () {
   console.log("inside buildPassword function");
   // Declare local variable for password
   var password = "";
   // Loop through total passwordLength to obtain a new Index number pointing to the randomly assigned character.
   for (var i = 0; i < passwordLength; i++) {
      // Index variable to choose random characters from new superSetOfChars array.
      var superSetIndex = Math.floor(Math.random() * superSetOfChars.length);

      // Using the new superSetIndex numbers, then assign the randomly selected characters to the password.
      password = password + superSetOfChars[superSetIndex];
      console.log(i, password);
   }
   // Returns built password from loop.
   return password;
};

function generatePassword() {
   console.log("Inside generatePassword");
   // Present and validate prompts for criteria to be used in the password, also builds superSetOfChar
   presentPrompts();
   // Present and validate prompt for password length.
   promptPasswordLength();
   // Call func to buildPassword with SuperSetofChars built with selected Criteria's setOfChars
   var password = buildPassword();
   // returns built password from previous func.
   return password;
}

// Write password to the #password input
function writePassword() {
   var password = generatePassword(); // Generates password.
   // Maps variable passwordText to the html element id= "password"
   var passwordText = document.querySelector("#password");
   // Update html id= "password" content with the newly built password.
   passwordText.value = password;
}

// Add event listener to generate button, calls writePassword on button "click", waits until click on "Generate Password" button.
generateBtn.addEventListener("click", writePassword);

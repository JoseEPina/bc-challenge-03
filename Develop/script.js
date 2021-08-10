// Assignment Code
var generateBtn = document.querySelector("#generate");

const NUMBER_OF_CRITERIA = 4;
// const value of True to validate user 'selected' criteria
const YES = true;

// Criteria Object:
// name - Criteria Name
// selected - was this criteria selected for Pwd? (Yes/No)
// totalCharsInPwd - random # of total criteria chars TO BE used in Pwd
// assignedCharsInPwd - current number of criteria chars used in Pwd
// setOfChars - define set of chars for this criteria
var criteria = [
   {
      name: "lower-case", // Criteria Name
      selected: false, // Criteria Selected Yes/No
      totalCharsInPwd: 0, // Random# of Criteria Chars used in Pwd
      assignedCharsInPwd: 0, // Actual Criteria Chars used in Pwd
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
      totalCharsInPwd: 0,
      assignedCharsInPwd: 0,
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
      totalCharsInPwd: 0,
      assignedCharsInPwd: 0,
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
      totalCharsInPwd: 0,
      assignedCharsInPwd: 0,
      setOfChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
   },
];

// Presents prompts in a Loop
var presentPrompts = function () {
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
         noneSelected = false;
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
   var passwordLength = parseInt(
      window.prompt(
         "What length do you need your password to be? Minimum is 8 characters long. Maximum is 128 characters long."
      )
   );
   // Validates for out of range password length(number), empty, or non-numeric input(spaces, other chars, etc).
   // If Length is invalid, present prompt function again
   if (passwordLength < PWD_LENGTH_MIN || passwordLength > PWD_LENGTH_MAX || isNaN(passwordLength)) {
      window.alert("Please enter a valid response.");
      promptPasswordLength();
   }
   console.log(passwordLength);
   return passwordLength;
};

function generatePassword() {
   console.log("Inside generatePassword");
   presentPrompts();
   var passwordLength = promptPasswordLength();
   var calculateCriteriaLength = function (passwordLength) {
      // Determine count of selected criteria
      var countedSelectedCriteria = 0;
      for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
         if (criteria[i].selected === YES) {
            countedSelectedCriteria++;
         }
      }

      // Determine each Criteria Characters' group size
      var equalSize = Math.floor(passwordLength / countedSelectedCriteria);
      // Adjust criteria size of password Length to compensate for Math.floor
      var adjustedSize = passwordLength - equalSize * (countedSelectedCriteria - 1);

      // Controls processing of groups with equal and different size of characters (due to use of Math.floor)
      var auxIndex = 1;
      // Loop to process object criteria array and assign max number of random characters per criteria selected
      for (var i = 0; i < NUMBER_OF_CRITERIA; i++) {
         // Process only if criteria was selected.
         if (criteria[i].selected == YES) {
            // Process all criteria except last one.
            if (auxIndex < countedSelectedCriteria) {
               criteria[i].totalCharsInPwd = equalSize;
            } else {
               // Process last criteria.
               criteria[i].totalCharsInPwd = adjustedSize;
            }
            auxIndex++;
         }
      }

      var password = "";
   };
}

// Write password to the #password input
function writePassword() {
   var password = generatePassword();
   var passwordText = document.querySelector("#password");

   passwordText.value = password;
}

//debugger;

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

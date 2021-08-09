// Assignment Code
var generateBtn = document.querySelector("#generate");

const CRITERIA_NUMBER = 4;

var criteria = [
   {
      name: "upper-case",
      selected: false,
   },
   {
      name: "lower-case",
      selected: false,
   },
   {
      name: "special-characters",
      selected: false,
   },
   {
      name: "numeric",
      selected: false,
   },
];

// Presents prompts in a Loop
var presentPrompts = function () {
   console.log("Inside presentPrompts");
   debugger;
   for (var i = 0; i < CRITERIA_NUMBER; i++) {
      criteria[i].selected = window.confirm("Do you want to use " + criteria[i].name + " characters in the password?");
   }
};

var promptPasswordLength = function () {
   console.log("Prompt Password Length");

   const PWD_LENGTH_MIN = 8;
   const PWD_LENGTH_MAX = 128;

   var passwordLength = parseInt(
      window.prompt(
         "What length do you need your password to be? Minimum is 8 characters long. Maximum is 128 characters long."
      )
   );
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

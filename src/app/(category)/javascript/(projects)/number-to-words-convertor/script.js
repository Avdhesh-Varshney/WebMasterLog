// An array that maps digits to their corresponding names
var digit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

// An array that represents different denominations (e.g., Thousand, Million, Billion, Trillion)
var denominations = ["", "Thousand", "Million", "Billion", "Trillion"];

// An array that represents special names for numbers between 10 and 19
var tens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

// An array that represents tens places (e.g., Ten, Twenty, Thirty, Forty)
var ties = ["Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

// Getting the HTML elements by their IDs
let inputBox = document.getElementById('input-box');
let outputBox = document.getElementsByTagName('p')[0];

// Variable to store the user input
var input;

// Function that gets called when the user submits the input
function getValue() {
    // Getting the input from the input box
    input = inputBox.value;

    // Conditions to check the validity of the input
    // Checks if the input contains only digits
    // and if its length is not greater than 15
    if (!/^\d+$/.test(input) && input.length > 0) {
        outputBox.innerHTML = "Invalid input. Please enter only digits.";
        outputBox.style.color = 'red';
        return;
    } else if (input.length > 15) {
        outputBox.innerHTML = "Too Large Number.";
        outputBox.style.color = 'red';
        return;
    }

    // Resetting the output box style and content
    outputBox.style.color = 'black';
    outputBox.innerHTML = "";

    // Padding the input with leading zeros until its length is divisible by 3
    while (input.length % 3 !== 0) {
        input = "0" + input;
    }

    // Reversing the input string
    input = reverseString(input);

    // Checking if the input is zero
    if (input === "000")
        outputBox.innerHTML = "Zero";
    else
        // Calling the conversion function with initial index and level values
        outputBox.innerHTML = convert(0, 0);
}

// Function to concatenate two strings
function add(s1, s2) {
    if (s1.length && s2.length)
        return s1 + " " + s2;
    return s1 + s2;
}

// Main recursive function for converting the input to words
function convert(idx, level) {
    // Base case: if the index is greater than or equal to the input length, return an empty string
    if (idx >= input.length)
        return "";

    let cur = ""; // Variable to store the current word representation of the digits at the current index

    let od = parseInt(input[idx]); // One's digit
    let td = parseInt(input[idx + 1]); // Ten's digit
    let hd = parseInt(input[idx + 2]); // Hundred's digit

    // Handling the hundred's digit
    if (hd)
        cur = add(cur, add(digit[hd], "Hundred"));

    // Handling the ten's and one's digits
    if (td) {
        if (td == 1)
            cur = add(cur, tens[od]);
        else {
            cur = add(cur, ties[td - 1]);
            if (od) cur = add(cur, digit[od]);
        }
    } else if (od)
        cur = add(cur, digit[od]);

    // Adding the appropriate denomination based on the current level
    if (cur != "")
        cur = add(cur, denominations[level]);

    // Recursively calling the convert function with updated index and level values
    return add(convert(idx + 3, level + 1), cur);
}

// Function to reverse a string
function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

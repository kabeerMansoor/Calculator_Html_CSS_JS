let string = "";
let isOff = false; // Flag to indicate OFF state
let buttons = document.querySelectorAll('.keys'); //Select all the elements which contains class "keys"
const screen = document.querySelector('.screen'); //Select the element which contains class "screen"
let memoryValue = 0;

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;
        
        if (isOff) {
            if (buttonText === 'OFF') {
                // Toggle OFF state
                isOff = !isOff;
                // Re-enable keys
                buttons.forEach(button => {
                    button.disabled = false;
                });
                
                screen.placeholder = "Use me for any type of calculation :";
            }
            return; 
        }
        //if user press "=" then result display on screen(input text):
        if (buttonText === '=') {
            try {
                string = eval(string);
                screen.value = string;
            } catch (error) {
                screen.value = 'Error';
            }
        } 

        //If user press "C" all text disappears all items are deleted:
        else if (buttonText === 'C') {
            string = "";
            screen.value = string;
        } 
        
        //If user press "OFF" no key should works except OFF key:
        else if (buttonText === 'OFF') {
            // Toggle OFF state
            isOff = !isOff;
            // Disable keys except OFF
            buttons.forEach(button => {
                if (buttonText !== 'OFF') {
                    button.disabled = true;
                }
            });
            // Clear input and placeholder
            string = "";
            screen.value = string;
            screen.placeholder = "";
        } 
        
        //Calculate root for any number:
        else if (buttonText === '√') {
            try {
                string = Math.sqrt(eval(string));
                screen.value = string;
            } catch (error) {
                screen.value = 'Error';
            }
        }
        
        //By pressing "DEL" key user should able to remove last number from screen:
        else if (buttonText === 'DEL') {
            string = string.slice(0, -1); // Remove the last character
            screen.value = string;
        }
        
        //Press "MRC" button for "Memory Recall.
        else if (buttonText === 'MRC') {
            string += memoryValue;
            screen.value = string;
        } 
        
        //Press M+ to add the result to memory.
        else if (buttonText === 'M+') {
            memoryValue += parseFloat(eval(string));
        } 
        
        //Press M- to subtract the result from memory.
        else if (buttonText === 'M-') {
            memoryValue -= parseFloat(eval(string));
        } else {
            string += buttonText;
            screen.value = string;
        }
    });
});

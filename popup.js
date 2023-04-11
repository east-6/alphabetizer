// When the DOM content is loaded, get all the required elements from the webpage
document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('inputText');
    const alphabetizeButton = document.getElementById('alphabetizeButton');
    const sortOrder = document.getElementById('sortOrder');
    const caseSensitivity = document.getElementById('caseSensitivity');
    const delimiter = document.getElementById('delimiter');
    const removeEmptyLines = document.getElementById('removeEmptyLines');
    const sortByNumber = document.getElementById('sortByNumber');
    const textTransform = document.getElementById('textTransform');
    const addListNumbering = document.getElementById('addListNumbering');
    const infoText = document.getElementById('infoText');

    // This function updates the text in the infoText element based on the input text.
    function updateInfoText() {
      const text = inputText.value;
      const lines = text.split('\n');
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const characters = text.replace(/\s/g, '').length;

      // Update the text content of infoText with the number of characters, words, and lines
      infoText.textContent = `Characters: ${characters} - Words: ${words.length} - Lines: ${lines.length}`;
    }

    // This function sorts the input text according to the selected options and modifies it accordingly.
    function alphabetize() {
      // Get the value of the custom text to be added to each line
      const customText = document.getElementById('customText').value;

      let text = inputText.value;
      let lines = text.split(delimiter.value || '\n');

      // Remove empty lines if the option is selected
      if (removeEmptyLines.checked) {
        lines = lines.filter(line => line.trim().length > 0);
      }

      // Modify each line based on the selected text transformation option
      if (textTransform.value !== 'none') {
        lines = lines.map(line => {
          switch (textTransform.value) {
            case 'upper':
              return line.toUpperCase();
            case 'lower':
              return line.toLowerCase();
            case 'trim':
              return line.trim();
            default:
              return line;
          }
        });
      }

      // Sort the lines based on the selected sorting options
      lines.sort((a, b) => {
        if (sortByNumber.checked) {
          const numA = parseFloat(a);
          const numB = parseFloat(b);

          // If the lines can be converted to numbers, compare them numerically
          if (!isNaN(numA) && !isNaN(numB)) {
            return sortOrder.value === 'asc' ? numA - numB : numB - numA;
          }
        }

        // Otherwise, compare the lines alphabetically, either case-sensitive or not
        const options = {
          sensitivity: caseSensitivity.value === 'sensitive' ? 'case' : 'base',
          numeric: sortByNumber.checked,
        };

        return sortOrder.value === 'asc' ? a.localeCompare(b, 'tr', options) : b.localeCompare(a, 'tr', options);
      });

      // Add list numbering if the option is selected
      if (addListNumbering.checked) {
        lines = lines.map((line, index) => `${index + 1}. ${line}`);
      }

      // Add the custom text to each line, either before or after the line, based on the selected option
      const customTextPosition = document.getElementById('customTextPosition').checked;
      if (customText) {
        if (customTextPosition) {
          lines = lines.map(line => `${line}${customText}`);
        } else {
          lines = lines.map(line => `${customText}${line}`);
        }
      }
    
      // Join the modified lines with the delimiter and set the value of the input text to the result
      inputText.value = lines.join(delimiter.value || '\n');
      // Update the info text with the new statistics of the modified text
      updateInfoText();
    }
    
    // Add an event listener to the alphabetizeButton to run the alphabetize function when clicked
    alphabetizeButton.addEventListener('click', alphabetize);
    // Add an event listener to the inputText to run the updateInfoText function whenever the input is changed
    inputText.addEventListener('input', updateInfoText);
    
    // Get the settings button and container elements from the webpage
    const settingsButton = document.getElementById('settingsButton');
    const settingsContainer = document.getElementById('settingsContainer');
    
    // Add an event listener to the settingsButton to toggle the visibility of the settingsContainer when clicked
    settingsButton.addEventListener('click', () => {
      settingsContainer.classList.toggle('hidden');
    });
});
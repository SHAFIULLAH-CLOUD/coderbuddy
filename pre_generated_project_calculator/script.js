// Calculator Core Logic
// --------------------------------------------------
// Wrapped in IIFE to avoid polluting global scope
// --------------------------------------------------
(() => {
    // --------------------------------------------------
    // Element References & State
    // --------------------------------------------------
    /** @type {HTMLInputElement|null} */
    const display = document.getElementById('display');
    /** @type {NodeListOf<HTMLElement>} */
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let previousValue = null; // number
    let operator = null; // '+', '-', '*', '/' or null
    let resetDisplay = false; // flag to clear currentInput on next digit entry

    // --------------------------------------------------
    // Utility Functions
    // --------------------------------------------------
    /**
     * Update the calculator display.
     * @param {string|number} value
     */
    function updateDisplay(value) {
        if (display) {
            display.value = String(value);
        }
    }

    /**
     * Reset all state and clear the display.
     */
    function clearAll() {
        currentInput = '';
        previousValue = null;
        operator = null;
        resetDisplay = false;
        updateDisplay('0');
    }

    /**
     * Perform a basic arithmetic operation.
     * Returns a number or the string 'Error' for invalid operations.
     * @param {number|string} a
     * @param {number|string} b
     * @param {string} op
     * @returns {number|string}
     */
    function calculate(a, b, op) {
        const numA = typeof a === 'number' ? a : parseFloat(a);
        const numB = typeof b === 'number' ? b : parseFloat(b);
        if (isNaN(numA) || isNaN(numB)) return 'Error';
        switch (op) {
            case '+':
                return numA + numB;
            case '-':
                return numA - numB;
            case '*':
                return numA * numB;
            case '/':
                return numB === 0 ? 'Error' : numA / numB;
            default:
                return 'Error';
        }
    }

    // --------------------------------------------------
    // Input Handlers
    // --------------------------------------------------
    /**
     * Append a digit or decimal point to the current input.
     * @param {string} digit
     */
    function appendDigit(digit) {
        if (resetDisplay) {
            currentInput = '';
            resetDisplay = false;
        }
        if (digit === '.' && currentInput.includes('.')) return; // prevent multiple dots
        // Allow leading dot by prefixing a zero for user‑friendliness
        if (digit === '.' && currentInput === '') {
            currentInput = '0';
        }
        currentInput += digit;
        updateDisplay(currentInput);
    }

    /**
     * Store the selected operator and prepare for the next number.
     * @param {string} op
     */
    function setOperator(op) {
        // If there is a pending calculation, compute it first
        if (previousValue !== null && operator && currentInput !== '') {
            const result = calculate(previousValue, currentInput, operator);
            if (result === 'Error' || isNaN(result)) {
                updateDisplay('Error');
                resetDisplay = true;
                previousValue = null;
                operator = null;
                currentInput = '';
                return;
            }
            previousValue = result;
        } else if (currentInput !== '') {
            previousValue = parseFloat(currentInput);
        }
        operator = op;
        resetDisplay = true; // next digit starts a fresh input
        // Show the stored value (or 0 if none) for visual feedback
        updateDisplay(previousValue !== null ? previousValue : '0');
    }

    /**
     * Execute the pending operation when '=' is pressed.
     */
    function performEquals() {
        if (operator === null || previousValue === null) {
            // Nothing to compute – just ensure the display reflects the current input
            if (currentInput !== '') updateDisplay(currentInput);
            return;
        }
        const rightOperand = currentInput !== '' ? currentInput : previousValue;
        const result = calculate(previousValue, rightOperand, operator);
        if (result === 'Error' || isNaN(result)) {
            updateDisplay('Error');
            resetDisplay = true;
        } else {
            updateDisplay(result);
            // Prepare for a possible chain of operations (e.g., 5 + 2 = -> 7, then + 3 =)
            previousValue = result;
            resetDisplay = true;
        }
        // Reset operator but keep previousValue for chaining
        operator = null;
        currentInput = '';
    }

    /**
     * Click handler for calculator buttons.
     * @param {MouseEvent} event
     */
    function handleButtonClick(event) {
        const value = event.target.dataset.value;
        if (!value) return;
        if (value === 'C') {
            clearAll();
        } else if (value === '=') {
            performEquals();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            // Digit or decimal point
            appendDigit(value);
        }
    }

    // --------------------------------------------------
    // Keyboard Support
    // --------------------------------------------------
    /**
     * Keydown handler to map keyboard input to calculator actions.
     * @param {KeyboardEvent} e
     */
    function handleKeyDown(e) {
        const key = e.key;
        if (/[0-9]/.test(key)) {
            appendDigit(key);
            e.preventDefault();
        } else if (key === '.') {
            appendDigit('.');
            e.preventDefault();
        } else if (['+', '-', '*', '/'].includes(key)) {
            setOperator(key);
            e.preventDefault();
        } else if (key === 'Enter' || key === '=') {
            performEquals();
            e.preventDefault();
        } else if (key === 'Backspace') {
            clearAll();
            e.preventDefault();
        } else if (key === 'Escape') {
            clearAll();
            e.preventDefault();
        }
    }

    // --------------------------------------------------
    // Event Listeners – Button clicks & Keyboard
    // --------------------------------------------------
    buttons.forEach(btn => btn.addEventListener('click', handleButtonClick));
    document.addEventListener('keydown', handleKeyDown);

    // --------------------------------------------------
    // Initialise display
    // --------------------------------------------------
    updateDisplay('0');
})();

# SimpleCalc

A lightweight, vanilla‑JavaScript calculator that runs entirely in the browser. **SimpleCalc** provides the essential arithmetic operations with an intuitive button layout, keyboard shortcuts, and graceful error handling – all without any build steps or external dependencies.

---

## Tech Stack

- **HTML5** – Semantic markup for the calculator UI.
- **CSS3** – Flexbox layout, responsive design, and visual styling.
- **JavaScript (ES2021)** – Core logic for expression evaluation, event handling, and keyboard support.

---

## Features

- Basic arithmetic: addition, subtraction, multiplication, division.
- Decimal numbers and chaining of operations.
- Clear (C) and backspace (⌫) functionality.
- Percentage (`%`) handling (interpreted as `/100`).
- Sign toggle (±) for the current number.
- Keyboard shortcuts for all buttons (e.g., `1‑9`, `0`, `+`, `-`, `*`, `/`, `Enter` for `=`).
- Real‑time display of the current expression and result.
- Graceful handling of division by zero and malformed expressions with user‑friendly error messages.
- Responsive layout that works on desktop and mobile browsers.

---

## Setup / Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SimpleCalculator
   ```
2. **Open the app**
   - Double‑click `index.html` **or** open it in any modern browser (Chrome, Firefox, Edge, Safari, etc.).
   - No build step, server, or package manager is required – the app is pure client‑side.

---

## Usage Guide

### Button Layout
```
┌─────┬─────┬─────┬─────┐
│  C  │  ⌫  │  %  │  ÷  │
├─────┼─────┼─────┼─────┤
│  7  │  8  │  9  │  ×  │
├─────┼─────┼─────┼─────┤
│  4  │  5  │  6  │  -  │
├─────┼─────┼─────┼─────┤
│  1  │  2  │  3  │  +  │
├─────┼─────┼─────┼─────┤
│  ±  │  0  │  .  │  =  │
└─────┴─────┴─────┴─────┘
```
- **C** – Clear the entire expression.
- **⌫** – Delete the last character (backspace).
- **%** – Percentage (interpreted as `/100`).
- **÷, ×, -, +** – Arithmetic operators.
- **±** – Toggle sign of the current number.
- **.** – Decimal point.
- **=** – Evaluate the expression.

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0‑9` | Enter corresponding digit |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Operators (`*` = multiplication, `/` = division) |
| `Enter` or `=` | Evaluate (`=`) |
| `Backspace` | Delete last character |
| `Escape` | Clear all (`C`) |
| `Shift + %` | Percentage |
| `Ctrl + ±` | Toggle sign |

### Error Handling
- **`Error: Division by zero`** – Shown when the expression attempts to divide by zero.
- **`Error: Invalid expression`** – Shown for malformed input (e.g., two operators in a row).
- Errors replace the result display until the user clears or edits the expression.

---

## Responsive Design Note

The calculator uses a flexible Flexbox grid and media queries to adapt to different screen sizes. On mobile devices the buttons and display scale down while remaining easily tappable, ensuring a smooth experience on both portrait and landscape orientations.

---

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Markup – layout of the calculator UI and display area. |
| `styles.css` | Styling – Flexbox grid, responsive adjustments, and visual theme. |
| `script.js` | Core JavaScript – expression parsing, evaluation, event handling, and keyboard support. |
| `README.md` | Project documentation (this file). |
| `LICENSE` | MIT license placeholder. |

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome‑feature`).
3. Make your changes, ensuring the calculator still works by opening `index.html`.
4. Commit with a clear message and push to your fork.
5. Open a pull request against the `main` branch.

Please keep the code style consistent (ES2021, 2‑space indentation) and avoid adding external dependencies.

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

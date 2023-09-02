// script.js
function parseFraction(input) {
    // Check if the input contains a slash '/' indicating a fraction
    if (input.includes('/')) {
        const parts = input.split('/');
        if (parts.length === 2) {
            const numerator = parseFloat(parts[0]);
            const denominator = parseFloat(parts[1]);

            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                return numerator / denominator;
            }
        }
    }

    // If not a valid fraction, parse as a float
    return parseFloat(input);
}

function derivative(equation, x) {
    const h = 1e-6; // Small value for numerical differentiation
    const xPlusH = x + h;
    const xMinusH = x - h;
    const f1 = eval(equation.replace(/z/g, xPlusH));
    const f2 = eval(equation.replace(/z/g, xMinusH));
    return (f1 - f2) / (2 * h);
}

function newtonRaphson() {
    let equation = document.getElementById('equation').value;
    equation = equation.replace(/\^/g, '**'); // Replace ^ with **
    equation = equation.replace(/exp\(([^)]+)\)/g, 'Math.exp($1)'); // Convert exp(x) to Math.exp(x)
    equation = equation.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    equation = equation.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    equation = equation.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    equation = equation.replace(/log10\(([^)]+)\)/g, 'Math.log10($1)');

    const initialGuessInput = document.getElementById('initialGuess').value;
    const decimalPlaces = parseInt(document.getElementById("decimalPlaces").value);
    const tolerance = Math.pow(10, -decimalPlaces);

    // Parse initial guess as a fraction or decimal
    const initialGuess = parseFraction(initialGuessInput);

    let x = initialGuess;
    let root;
    let iterations = 0;

    const iterationTable = document.getElementById("iterationTable").getElementsByTagName('tbody')[0];
    iterationTable.innerHTML = '';

    while (true) {
        const f = eval(equation.replace(/z/g, x));
        const fPrime = derivative(equation, x); // Evaluate the derivative

        root = x - f / fPrime;

        const newRow = iterationTable.insertRow();
        const iterationCell = newRow.insertCell(0);
        const xCell = newRow.insertCell(1);
        const f_xCell = newRow.insertCell(2);
        const f_x_primeCell = newRow.insertCell(3);
        const rootCell = newRow.insertCell(4);

        iterationCell.textContent = iterations + 1;
        xCell.textContent = x.toFixed(decimalPlaces);
        f_xCell.textContent = f.toFixed(decimalPlaces);
        f_x_primeCell.textContent = fPrime.toFixed(decimalPlaces);
        rootCell.textContent = root.toFixed(decimalPlaces);

        if (Math.abs(root - x) < tolerance) {
            break;
        }

        x = root;
        iterations++;
    }

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Root: ${root.toFixed(decimalPlaces)}<br>Iterations: ${iterations}`;
}

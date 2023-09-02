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

function findRoot() {
    let equation = document.getElementById('equation').value;
    equation = equation.replace(/\^/g, '**'); // Replace ^ with **
    equation = equation.replace(/exp\(([^)]+)\)/g, 'Math.exp($1)'); // Convert exp(x) to Math.exp(x)
    equation = equation.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    equation = equation.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    equation = equation.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    equation = equation.replace(/log10\(([^)]+)\)/g, 'Math.log10($1)');

    const lowerBoundInput = document.getElementById('lowerBound').value;
    const upperBoundInput = document.getElementById('upperBound').value;
    const decimalPlaces = parseInt(document.getElementById("decimalPlaces").value);
    const tolerance = Math.pow(10, -decimalPlaces);

    // Parse lower and upper bounds as fractions or decimals
    const lowerBound = parseFraction(lowerBoundInput);
    const upperBound = parseFraction(upperBoundInput);

    let a = lowerBound;
    let b = upperBound;
    let root;
    let iterations = 0;

    const iterationTable = document.getElementById("iterationTable").getElementsByTagName('tbody')[0];
    iterationTable.innerHTML = '';

    while ((b - a) / 2 > tolerance) {
        root = (a + b) / 2;
        const fa = eval(equation.replace(/z/g, a));
        const fb = eval(equation.replace(/z/g, b)); // Calculate f(b)
        const froot = eval(equation.replace(/z/g, root));

        const newRow = iterationTable.insertRow();
        const iterationCell = newRow.insertCell(0);
        const aCell = newRow.insertCell(1);
        const bCell = newRow.insertCell(2);
        const faCell = newRow.insertCell(3);
        const fbCell = newRow.insertCell(4); // Added f(b) cell
        const rootCell = newRow.insertCell(5);
        const frootCell = newRow.insertCell(6);

        iterationCell.textContent = iterations + 1;
        aCell.textContent = a.toFixed(decimalPlaces);
        bCell.textContent = b.toFixed(decimalPlaces);
        faCell.textContent = fa.toFixed(decimalPlaces);
        fbCell.textContent = fb.toFixed(decimalPlaces); // Display f(b)
        rootCell.textContent = root.toFixed(decimalPlaces);
        frootCell.textContent = froot.toFixed(decimalPlaces);

        if (fa * froot < 0) {
            b = root;
        } else {
            a = root;
        }
        iterations++;
    }

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Root: ${root.toFixed(decimalPlaces)}<br>Iterations: ${iterations}`;
}

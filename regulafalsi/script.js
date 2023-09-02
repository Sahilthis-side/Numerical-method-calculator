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
    let equation = document.getElementById("equation").value;
    equation = equation.replace(/\^/g, '**'); // Replace ^ with **
    equation = equation.replace(/exp\(([^)]+)\)/g, 'Math.exp($1)'); // Convert exp(x) to Math.exp(x)
    equation = equation.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    equation = equation.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    equation = equation.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    equation = equation.replace(/log10\(([^)]+)\)/g, 'Math.log10($1)');
    const lowerBoundInput = document.getElementById("lowerBound").value;
    const upperBoundInput = document.getElementById("upperBound").value;
    const decimalPlaces = parseInt(document.getElementById("decimalPlaces").value);

    const f = (z) => eval(equation);

    const lowerBound = parseFraction(lowerBoundInput);
    const upperBound = parseFraction(upperBoundInput);

    let a = lowerBound;
    let b = upperBound;
    let root;
    let iterations = 0;
    const tolerance = Math.pow(10, -decimalPlaces);

    const iterationTable = document.getElementById("iterationTable").getElementsByTagName('tbody')[0];
    iterationTable.innerHTML = '';

    while (Math.abs(b - a) > tolerance) {
        const fa = f(a);
        const fb = f(b);
        root = (a * fb - b * fa) / (fb - fa);
        const fRoot = f(root);

        const newRow = iterationTable.insertRow();
        const iterationCell = newRow.insertCell(0);
        const aCell = newRow.insertCell(1);
        const bCell = newRow.insertCell(2);
        const faCell = newRow.insertCell(3);
        const fbCell = newRow.insertCell(4);
        const rootCell = newRow.insertCell(5);
        const fRootCell = newRow.insertCell(6);

        iterationCell.textContent = iterations + 1;
        aCell.textContent = a.toFixed(decimalPlaces);
        bCell.textContent = b.toFixed(decimalPlaces);
        faCell.textContent = fa.toFixed(decimalPlaces);
        fbCell.textContent = fb.toFixed(decimalPlaces);
        rootCell.textContent = root.toFixed(decimalPlaces);
        fRootCell.textContent = fRoot.toFixed(decimalPlaces);

        if (fa * fRoot < 0) {
            b = root;
        } else {
            a = root;
        }
        iterations++;
    }

    const resultElement = document.getElementById("result");
    const formattedRoot = decimalPlaces === 0 ? root.toFixed(0) : root.toFixed(decimalPlaces);
    resultElement.innerHTML = `Root: ${formattedRoot}<br>Iterations: ${iterations}`;
}

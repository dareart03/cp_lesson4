import { MiniMaple } from "./miniMaple.js";

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    document.getElementById('demoButton').onclick = runDiff;
}

function runDiff() {
    const expr = document.getElementById('expr').value;
    const variable = document.getElementById('var').value;
    const maple = new MiniMaple();
    const container = document.getElementById('container');

    try {
        const result = maple.diff(expr, variable);
        container.innerHTML = `<p><b>d/d${variable}(${expr}) =</b> ${result}</p>`;
    } catch (err) {
        container.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    }
}

const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const f = document.getElementById("f");
const pValue = document.getElementById("pValue");
let p1, p2, f1, f2;
let s = 1;
let p = 0;

fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/enparalelovzla')
    .then(r => r.json())
    .then(d => {
        p1 = d.price;
        f1 = d.last_update;
        console.log(p1, f1);
        h();  // Llama a la función h() después de obtener los datos
    })
    .catch(error => console.error('Error fetching parallel dollar data:', error));

fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
    .then(r => r.json())
    .then(d => {
        p2 = d.monitors.usd.price;
        f2 = `${d.datetime.date}<br>${d.datetime.time}`;
        console.log(p2, f2);
    })
    .catch(error => console.error('Error fetching BCV dollar data:', error));

function h() {
    if (s == 1) {
        c.innerHTML = "PARALELO";
        f.innerHTML = f1;
        b.value = p1;
        a.value = 1;
        s = 0;
        p = p1;
    } else {
        c.innerHTML = "BCV";
        f.innerHTML = f2;
        a.value = 1;
        b.value = p2;
        s = 1;
        p = p2;
    }
    updatePValue();
}

function updatePValue() {
    // Obtiene el valor de b y calcula el 5% adicional
    const currentValueB = parseFloat(b.value);
    const valueWith5Percent = currentValueB * 1.05;
    pValue.innerText = `+5% = ${valueWith5Percent.toFixed(2)}`;
}

function i(m) {
    m == 1 ? b.value = (p * a.value).toFixed(2) : a.value = (b.value / p).toFixed(2);
    updatePValue();
}

a.addEventListener("input", () => { i(1); });

b.addEventListener("input", () => { i(0); });
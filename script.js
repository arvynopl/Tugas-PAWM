document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const nim = document.getElementById('nim').value;
    
    if (name && nim) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userNIM', nim);
        window.location.href = 'page-home.html';
    } else {
        alert('Tolong masukkan nama dan NIM Anda!');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName',);
    const userNIM = localStorage.getItem('userNIM');

    if (userName && userNIM) {
        document.getElementById('welcomeMessage').textContent = `Halo, ${userName} yang ber-NIM ${userNIM}!`;
    } else {
        document.getElementById('welcomeMessage').textContent = 'Selamat datang, silahkan sign-in!';
    }
});

function showAlert(element) {
    const title = element.getAttribute('data-title');
    alert(`Mohon maaf, lab virtual "${title}" saat ini masih berada dalam tahap pengembangan.`);
}

function redirectToLab(element) {
    const title = element.getAttribute('data-title');
    if (title === "Persamaan Kuadrat") {
        window.location.href = "page-virtual-lab.html";
    }
}

function searchLabs() {
    const searchInput = document.querySelector('.search-bar').value.toLowerCase();
    const labCards = document.querySelectorAll('.lab-card');

    labCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateValues() {
    const a = parseFloat(document.getElementById('a-slider').value);
    const b = parseFloat(document.getElementById('b-slider').value);
    const c = parseFloat(document.getElementById('c-slider').value);

    document.getElementById('a-value').value = a;
    document.getElementById('b-value').value = b;
    document.getElementById('c-value').value = c;

    updateEquation(a, b, c);
    plotGraph(a, b, c);
}

function updateSlider(type) {
    const value = parseFloat(document.getElementById(`${type}-value`).value);
    document.getElementById(`${type}-slider`).value = value;
    updateValues();
}

function updateEquation(a, b, c) {
    let equation = `y = ${a}x² `;
    equation += b >= 0 ? `+ ${b}x ` : `- ${Math.abs(b)}x `;
    equation += c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    document.getElementById('quadratic-equation').textContent = equation;
}


function plotGraph(a, b, c) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const scale = 25;

    ctx.clearRect(0, 0, width, height);

    drawAxes(ctx, width, height, scale);

    ctx.beginPath();
    for (let xPixel = 0; xPixel < width; xPixel++) {
        const x = (xPixel - (width / 2)) / scale;
        const y = (a * x * x) + (b * x) + c;
        const yPixel = height / 2 - (y * scale);

        if (xPixel === 0) {
            ctx.moveTo(xPixel, yPixel);
        } else {
            ctx.lineTo(xPixel, yPixel);
        }
    }
    ctx.strokeStyle = '#2F6EB1';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawAxes(ctx, width, height, scale) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    const xStep = scale;
    for (let xPixel = 0; xPixel <= width; xPixel += xStep) {
        const x = (xPixel - width / 2) / scale;
        ctx.fillText(x.toFixed(0), xPixel, height / 2 + 15);
        ctx.beginPath();
        ctx.moveTo(xPixel, height / 2 - 5);
        ctx.lineTo(xPixel, height / 2 + 5);
        ctx.stroke();
    }

    const yStep = scale;
    for (let yPixel = 0; yPixel <= height; yPixel += yStep) {
        const y = (height / 2 - yPixel) / scale;
        if (y !== 0) {
            ctx.fillText(y.toFixed(0), width / 2 + 10, yPixel);
        }
        ctx.beginPath();
        ctx.moveTo(width / 2 - 5, yPixel);
        ctx.lineTo(width / 2 + 5, yPixel);
        ctx.stroke();
    }
}

updateValues();

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
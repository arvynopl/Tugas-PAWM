// Elemen DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Fungsi Autentikasi
function handleSignIn(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const nim = document.getElementById('nim').value.trim();
    
    if (!name || !nim) {
        alert('Tolong masukkan nama dan NIM Anda!');
        return;
    }

    // Menyimpan data user
    localStorage.setItem('userName', name);
    localStorage.setItem('userNIM', nim);
    
    // Mengalihkan ulang ke homepage
    window.location.href = 'page-home.html';
}

// Fungsi Navigasi
function toggleMenu() {
    navLinks.classList.toggle('show');
}

// Fungsi Navigasi Lab
function redirectToLab(element) {
    const labTitle = element.getAttribute('data-title');
    if (labTitle === "Persamaan Kuadrat") {
        window.location.href = "page-virtual-lab.html";
    }
}

function showAlert(element) {
    const labTitle = element.getAttribute('data-title');
    alert(`Mohon maaf, lab virtual "${labTitle}" saat ini masih berada dalam tahap pengembangan.`);
}

// Pesan Selamat Datang
function updateWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (!welcomeMessage) return;

    const userName = localStorage.getItem('userName');
    const userNIM = localStorage.getItem('userNIM');

    if (userName && userNIM) {
        welcomeMessage.textContent = `Halo, ${userName} yang ber-NIM ${userNIM}!`;
    }
}

// Fungsi Search
function searchLabs() {
    const searchInput = document.getElementById('labSearch');
    const labCards = document.querySelectorAll('.lab-card');
    
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    
    labCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
}

// Fungsi Virtual Lab
class QuadraticLab {
    constructor() {
        // Pengaturan canvas
        this.canvas = document.getElementById('graphCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.scale = 25;

        // Inisialisasi grafik
        this.initializeControls();
        this.updateValues();
    }

    initializeControls() {
        // Menambahkan event listener untuk slider dan input
        ['a', 'b', 'c'].forEach(coef => {
            const slider = document.getElementById(`${coef}-slider`);
            const input = document.getElementById(`${coef}-value`);
            
            if (slider && input) {
                slider.addEventListener('input', () => this.updateValues());
                input.addEventListener('change', () => this.updateSlider(coef));
            }
        });
    }

    updateValues() {
        const a = parseFloat(document.getElementById('a-slider').value);
        const b = parseFloat(document.getElementById('b-slider').value);
        const c = parseFloat(document.getElementById('c-slider').value);

        document.getElementById('a-value').value = a;
        document.getElementById('b-value').value = b;
        document.getElementById('c-value').value = c;

        this.updateEquation(a, b, c);
        this.plotGraph(a, b, c);
    }

    updateSlider(type) {
        const value = parseFloat(document.getElementById(`${type}-value`).value);
        document.getElementById(`${type}-slider`).value = value;
        this.updateValues();
    }

    updateEquation(a, b, c) {
        let equation = `y = ${a}x² `;
        equation += b >= 0 ? `+ ${b}x ` : `- ${Math.abs(b)}x `;
        equation += c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        
        document.getElementById('quadratic-equation').textContent = equation;
    }

    plotGraph(a, b, c) {
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);

        // Menggambar sumbu
        this.drawAxes();

        // Menggambar fungsi kuadratik
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#2F6EB1';
        this.ctx.lineWidth = 2;

        for (let px = 0; px < width; px++) {
            const x = (px - width / 2) / this.scale;
            const y = a * x * x + b * x + c;
            const py = height / 2 - (y * this.scale);

            if (px === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }

        this.ctx.stroke();
    }

    drawAxes() {
        const { width, height } = this.canvas;
        
        // Menggambar sumbu x dan y
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;

        // Sumbu x
        this.ctx.moveTo(0, height / 2);
        this.ctx.lineTo(width, height / 2);

        // Sumbu y
        this.ctx.moveTo(width / 2, 0);
        this.ctx.lineTo(width / 2, height);

        this.ctx.stroke();

        // Menggambar penanda skala
        this.drawScaleMarkers();
    }

    drawScaleMarkers() {
        const { width, height } = this.canvas;
        
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        
        // Penanda skala sumbu x
        for (let x = -10; x <= 10; x++) {
            const px = width / 2 + x * this.scale;
            this.ctx.beginPath();
            this.ctx.moveTo(px, height / 2 - 5);
            this.ctx.lineTo(px, height / 2 + 5);
            this.ctx.stroke();
            if (x !== 0) {
                this.ctx.fillText(x.toString(), px, height / 2 + 10);
            }
        }
        
        // Penanda skala sumbu y
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';
        for (let y = -10; y <= 10; y++) {
            const py = height / 2 - y * this.scale;
            this.ctx.beginPath();
            this.ctx.moveTo(width / 2 - 5, py);
            this.ctx.lineTo(width / 2 + 5, py);
            this.ctx.stroke();
            if (y !== 0) {
                this.ctx.fillText(y.toString(), width / 2 - 10, py);
            }
        }
    }
}

// Inisialisasi event listener
document.addEventListener('DOMContentLoaded', () => {
    updateWelcomeMessage();
    
    // Inisialisasi lab kuadratik pada page virtual lab
    if (document.getElementById('graphCanvas')) {
        new QuadraticLab();
    }
});
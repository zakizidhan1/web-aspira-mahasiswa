// Key for LocalStorage
const STORAGE_KEY = 'aspirasi_mahasiswa_data';

// Initialize data if not exists
if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

// Get all aspirations
function getAspirasi() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Save new aspiration
function saveAspirasi(aspirasi) {
    const data = getAspirasi();
    data.unshift(aspirasi); // Add to the beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Format date nicely
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Handle Form Submission (Used in form.html)
document.addEventListener('DOMContentLoaded', () => {
    const aspirasiForm = document.getElementById('aspirasiForm');
    
    if (aspirasiForm) {
        aspirasiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get values
            const judul = document.getElementById('judul').value;
            const kategori = document.getElementById('kategori').value;
            const deskripsi = document.getElementById('deskripsi').value;
            const isAnonim = document.getElementById('anonim').checked;
            
            // Create object
            const newAspirasi = {
                id: Date.now().toString(),
                judul,
                kategori,
                deskripsi,
                pengirim: isAnonim ? 'Anonim' : 'Mahasiswa',
                tanggal: new Date().toISOString(),
                status: 'Menunggu' // Default status
            };
            
            // Save
            saveAspirasi(newAspirasi);
            
            // Show alert
            const alertBox = document.getElementById('alertSuccess');
            alertBox.style.display = 'block';
            
            // Reset form
            aspirasiForm.reset();
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'daftar.html';
            }, 2000);
        });
    }

    // Render List (Used in index.html)
    const aspirasiContainer = document.getElementById('aspirasiContainer');
    
    if (aspirasiContainer) {
        const data = getAspirasi();
        
        if (data.length === 0) {
            aspirasiContainer.innerHTML = `
                <div class="empty-state">
                    <h3>Belum ada aspirasi</h3>
                    <p>Jadilah yang pertama untuk menyuarakan pendapatmu!</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        data.forEach(item => {
            const badgeClass = `badge-${item.kategori.toLowerCase()}`;
            
            html += `
                <div class="glass-panel aspirasi-card">
                    <span class="badge ${badgeClass}">${item.kategori}</span>
                    <h3>${item.judul}</h3>
                    <p style="margin-top:10px;">${item.deskripsi}</p>
                    
                    <div class="aspirasi-meta">
                        <span>Oleh: <strong>${item.pengirim}</strong></span>
                        <span>${formatDate(item.tanggal)}</span>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.8rem;">
                        Status: <strong style="color: var(--secondary-color);">${item.status}</strong>
                    </div>
                </div>
            `;
        });
        
        aspirasiContainer.innerHTML = html;
    }
});

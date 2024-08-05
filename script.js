// script.js

class Tiket {
    constructor(kategori, harga, stok) {
        this.kategori = kategori;
        this.harga = harga;
        this.stok = stok;
    }

    pesan(jumlah) {
        if (jumlah <= this.stok) {
            this.stok -= jumlah;
            return jumlah * this.harga;
        } else {
            alert("Stok tidak mencukupi!");
            return 0;
        }
    }
}

let tiketList = [
    new Tiket("VIP", 3000000, 50),
    new Tiket("Gold", 2000000, 100),
    new Tiket("Silver", 1000000, 200)
];

function loadTiket() {
    const tiketListElement = document.getElementById('tiket-list');
    const kategoriSelect = document.getElementById('kategori');

    tiketListElement.innerHTML = '';
    kategoriSelect.innerHTML = '';

    tiketList.forEach((tiket, index) => {
        // Display available tickets
        const tiketElement = document.createElement('div');
        tiketElement.className = 'kategori-tiket';
        tiketElement.innerHTML = `<strong>${tiket.kategori}</strong> - Harga: Rp${tiket.harga} - Stok: ${tiket.stok}`;
        tiketListElement.appendChild(tiketElement);

        // Populate dropdown options
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${tiket.kategori} - Rp${tiket.harga}`;
        kategoriSelect.appendChild(option);
    });
}

function pesanTiket() {
    const kategoriIndex = document.getElementById('kategori').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const namaPemesan = document.getElementById('nama').value;

    if (!namaPemesan) {
        alert("Masukkan nama pemesan.");
        return;
    }

    if (!jumlah || jumlah < 1) {
        alert("Masukkan jumlah tiket yang valid.");
        return;
    }

    const totalHarga = tiketList[kategoriIndex].pesan(jumlah);

    if (totalHarga > 0) {
        document.getElementById('total-harga').innerHTML = `Total harga: Rp${totalHarga}`;
        document.getElementById('metode-pembayaran').style.display = 'block';
    }

    loadTiket(); // Refresh the ticket list to reflect changes
}

function bayar(metode) {
    const totalHargaElement = document.getElementById('total-harga');
    const totalHarga = parseInt(totalHargaElement.textContent.split('Rp')[1]);
    const qrisImage = document.getElementById('qris-image');
    const namaPemesan = document.getElementById('nama').value;
    const kategoriIndex = document.getElementById('kategori').value;
    const tiket = tiketList[kategoriIndex];

    if (metode === 'E-Wallet') {
        const noEwallet = prompt("Masukkan nomor e-wallet:");
        alert(`Pembayaran sebesar Rp${totalHarga} berhasil melalui E-Wallet nomor ${noEwallet}.`);
        qrisImage.style.display = 'none'; // Hide QRIS image if shown
    } else if (metode === 'QRIS') {
        qrisImage.style.display = 'block'; // Show QRIS image
        alert("Silakan scan QRIS berikut untuk menyelesaikan pembayaran.");
    }

    // Generate kwitansi
    document.getElementById('kwitansi-detail').innerHTML = `
        <p><strong>Nama Pemesan:</strong> ${namaPemesan}</p>
        <p><strong>Kategori Tiket:</strong> ${tiket.kategori}</p>
        <p><strong>Jumlah Tiket:</strong> ${document.getElementById('jumlah').value}</p>
        <p><strong>Total Harga:</strong> Rp${totalHarga}</p>
        <p><strong>Jam Konser:</strong> 19:00 WIB</p>
    `;
    document.getElementById('kwitansi').style.display = 'block';

    // Reset the form and hide the payment options after showing the QRIS image
    totalHargaElement.innerHTML = '';
    document.getElementById('metode-pembayaran').style.display = 'none';
    document.getElementById('jumlah').value = '';
    document.getElementById('nama').value = '';

    loadTiket(); // Ensure the ticket availability is refreshed
}

document.addEventListener('DOMContentLoaded', loadTiket);

# Tugas 8 Pertemuan 9

Nama: **Ahmad Rian Syaifullah Ritonga**  
NIM: **H1D022010**  
Shift Baru: **D**

## Getting Started CRUD Mahasiswa in IONIC Framework

1. Halaman View Data Mahasiswa
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between;">
<img src="/assets/images/view-1.png" alt="List Produk" style="width: 48%; max-width: 300px;"/>
</div>

### Penjelasan

- Dihalaman home kita dapat melihat ada data mahasiswa beserta jurusannya dan di samping itu terdapat tombol eidt dan hapus
- jika kita lihat di header halaman ada tombol untuk tambahkan mahasiswa

2. Halaman Tambah Mahasiswa
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between;">
<img src="/assets/images/create-1.png" alt="List Produk" style="width: 48%; max-width: 300px;"/>
<img src="/assets/images/create-2.png" alt="List Produk" style="width: 48%; max-width: 300px;"/>
</div>

### Penjelasan

- kode diatas adalah cara untuk menambahkan data dengan cara untuk menambahkan data mahasiswa dengan mengisi nama dan jurusan
- Fungsi ini pertama-tama memeriksa apakah nilai this.nama dan this.jurusan sudah terisi. Jika kedua variabel tersebut tidak kosong (this.nama != '' && this.jurusan != ''), proses penambahan data akan dilanjutkan.
- Jika ada data yang masih kosong, pesan kesalahan akan dicetak di konsol (console.log('gagal tambah mahasiswa karena masih ada data yg kosong')), dan proses penambahan data dihentikan.
- jika sudah mengisi data maka akan langsung muncul di halaman utama atau home

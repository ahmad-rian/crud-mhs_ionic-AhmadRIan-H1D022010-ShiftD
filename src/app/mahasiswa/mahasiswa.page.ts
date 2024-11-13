import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, AlertController } from '@ionic/angular';

interface Mahasiswa {
  id?: number;
  nama: string;
  jurusan: string;
}

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: Mahasiswa[] = [];
  modalTambah = false;
  modalEdit = false;
  isLoading = false;
  
  mahasiswaForm: Mahasiswa = {
    nama: '',
    jurusan: ''
  };

  editForm: Mahasiswa = {
    id: undefined,
    nama: '',
    jurusan: ''
  };

  constructor(
    private api: ApiService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getMahasiswa();
  }

  getMahasiswa() {
    this.isLoading = true;
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        this.dataMahasiswa = res as Mahasiswa[];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching data:', err);
        this.showAlert('Error', 'Gagal mengambil data mahasiswa');
        this.isLoading = false;
      },
    });
  }

  resetForms() {
    this.mahasiswaForm = {
      nama: '',
      jurusan: ''
    };
    this.editForm = {
      id: undefined,
      nama: '',
      jurusan: ''
    };
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.modalEdit = false;
    if (isOpen) {
      this.resetForms();
    }
  }

  openModalEdit(isOpen: boolean, id: number | undefined) {
    if (id === undefined) {
      this.showAlert('Error', 'ID mahasiswa tidak valid');
      return;
    }
    this.modalEdit = isOpen;
    this.modalTambah = false;
    if (isOpen) {
      this.ambilMahasiswa(id);
    }
  }

  cancel() {
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetForms();
  }

  async tambahMahasiswa() {
    if (!this.isFormValid(this.mahasiswaForm)) {
      await this.showAlert('Peringatan', 'Semua field harus diisi');
      return;
    }

    this.isLoading = true;
    this.api.tambah(this.mahasiswaForm, 'tambah.php').subscribe({
      next: async (hasil: any) => {
        this.isLoading = false;
        await this.showAlert('Sukses', 'Berhasil menambah mahasiswa');
        this.getMahasiswa();
        this.modalTambah = false;
        this.resetForms();
      },
      error: async (err: any) => {
        this.isLoading = false;
        console.error('Error adding data:', err);
        await this.showAlert('Error', 'Gagal menambah mahasiswa');
      }
    });
  }

  async editMahasiswa() {
    if (!this.isFormValid(this.editForm)) {
      await this.showAlert('Peringatan', 'Semua field harus diisi');
      return;
    }

    if (!this.editForm.id) {
      await this.showAlert('Error', 'ID mahasiswa tidak valid');
      return;
    }

    this.isLoading = true;
    this.api.edit(this.editForm, 'edit.php').subscribe({
      next: async (hasil: any) => {
        this.isLoading = false;
        await this.showAlert('Sukses', 'Berhasil mengubah data mahasiswa');
        this.getMahasiswa();
        this.modalEdit = false;
        this.resetForms();
      },
      error: async (err: any) => {
        this.isLoading = false;
        console.error('Error editing data:', err);
        await this.showAlert('Error', 'Gagal mengubah data mahasiswa');
      }
    });
  }

  async hapusMahasiswa(id: number | undefined) {
    if (id === undefined) {
      await this.showAlert('Error', 'ID mahasiswa tidak valid');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.isLoading = true;
            this.api.hapus(id, 'hapus.php?id=').subscribe({
              next: async (res: any) => {
                this.isLoading = false;
                await this.showAlert('Sukses', 'Berhasil menghapus data');
                this.getMahasiswa();
              },
              error: async (err: any) => {
                this.isLoading = false;
                console.error('Error deleting data:', err);
                await this.showAlert('Error', 'Gagal menghapus data');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  ambilMahasiswa(id: number) {
    this.isLoading = true;
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        this.editForm = {
          id: hasil.id,
          nama: hasil.nama,
          jurusan: hasil.jurusan
        };
        this.isLoading = false;
      },
      error: async (err: any) => {
        this.isLoading = false;
        console.error('Error fetching data:', err);
        await this.showAlert('Error', 'Gagal mengambil data mahasiswa');
        this.modalEdit = false;
      }
    });
  }

  private isFormValid(form: Mahasiswa): boolean {
    return Boolean(form.nama?.trim() && form.jurusan?.trim());
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
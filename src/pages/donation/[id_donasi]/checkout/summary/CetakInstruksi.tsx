import styles from './styles.module.css';

function CetakInstruksi() {
  return (
    <>
      <div className={styles.badan}>
        <div className={styles.subBadan}>
          <div>
            <img src="https://cnt.id/logo-full.png" width={200}></img>
          </div>
          <div className={styles.rataKanan}>
            <p className={styles.textBesarKanan}>Kode Donasi : 128373632</p>
            <p>Create 24 Januari 2023</p>
            <p>Due 25 Januari 2023 14:52</p>
          </div>
        </div>
        <div className={styles.pEmpat}>
          <p className={styles.judulBank}>Transfer Bank BCA</p>
        </div>
        <div className={styles.hrs}></div>
        <div className={styles.bodynotif}>
          <div>
            <p>Bapak/Ibu Tyo Terhormat</p>
            <p>Silahkan Selesaikan Donasi Anda</p>
          </div>
          <div className={styles.rataKanan}>
            <p>Total Donasi</p>
            <p className={styles.textBesarKanan}>Rp.50.000</p>
          </div>
        </div>
        <div className={styles.pEmpat}>
          <p className={styles.rincianDonasi}>Rincian Donasi</p>
          <p>Program : Bantu Dusun Bosen Maju Memiliki Masjid</p>
          <p>Tanggal Pembayaran : 24 Jan 2023</p>
          <p className={styles.paddingBottom}>
            Pembayaran : Bank BCA 1393652946 an. Citra Niaga Teknologi
          </p>
          <p className={styles.perhatian}>Perhatian</p>
          <p>
            Silahkan lakukan pembayaran sebelum 25 Januari 2023 14.52 Apabila
            melewati batas waktu, donasi otomatis dibatalkan.
          </p>
          <p className={styles.paddingTop}>Salam Hangat</p>
          <p className={styles.boldAja}>Citra Niaga Teknologi</p>
        </div>
      </div>
    </>
  );
}

export default CetakInstruksi;

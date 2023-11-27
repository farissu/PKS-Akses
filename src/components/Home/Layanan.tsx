import { useRouter } from "next/router";
import { useContext } from "react";
import { PrefixContext } from "../context/PrefixContext";
import Link from "next/link";
import Image from "next/image";

const Layanan = ({ category, company }: any) => {
  const prefix = useContext(PrefixContext);

  const router = useRouter();
  const ref = router.query.source ?? '';

  const urlGambarDefault = "/default.png"; // Ganti dengan URL gambar default yang diinginkan

  const handleGambarError = (event: any) => {
    event.target.src = urlGambarDefault;
  };

  const layananItems = [
    { name: "kelas", imageSrc: "/kelas.png", width: 72, height: 72, marginTop: '-5px', marginLeft: '27px', textMarginTop: '0px', textMarginLeft: '42px' },
    { name: "event", imageSrc: "/event.png", width: 44, height: 44, marginTop: '0px', marginLeft: '25px', textMarginTop: '8px', textMarginLeft: '30px' },
    { name: "ajak teman", imageSrc: "/teman.png", width: 75, height: 75, marginTop: '-8px', marginLeft: '5px', textMarginTop: '1px', textMarginLeft: '15px' },
    { name: "sapa pks", imageSrc: "/sapa.png", width: 50, height: 50, marginTop: '-4px', marginLeft: '15px', textMarginTop: '10px', textMarginLeft: '15px' },
    { name: "aspirasi", imageSrc: "/aspirasi.png", width: 35, height: 35, marginTop: '13px', marginLeft: '42px', textMarginTop: '7px', textMarginLeft: '38px' },
    { name: "berbagi", imageSrc: "/berbagi.png", width: 70, height: 70, marginTop: '14px', marginLeft: '14px', textMarginTop: '-1px', textMarginLeft: '28px' },
    { name: "kenal bcad", imageSrc: "/kenal.png", width: 43, height: 43, marginTop: '20px', marginLeft: '20px', textMarginTop: '6px', textMarginLeft: '15px' },
    { name: "mutabaah", imageSrc: "/mutabaah.png", width: 43, height: 43, marginTop: '17px', marginLeft: '17px', textMarginTop: '0px', textMarginLeft: '17px' },
  ];

  return (
    <section className="py-9 pt-4 max-w-sm">
      <p style={{ marginLeft: '45px', marginTop: '-15px', marginBottom: '20px', color: '#2D4356', fontSize: '13px', opacity: "0.5" }}>
        Temukan berbagai manfaat di <span style={{ fontWeight: 'bold', color: '#000' }}>PKS</span>Akses
        <br />lalu berikan manfaat untuk sekitarmu!
      </p>

      <div className="grid grid-cols-4 max-w-sm">
        {layananItems.map((item, index) => (
          <Link key={index} href={`/page/${item.name}`} passHref>
            <div style={{ marginBottom: '20px' }}>
              <Image
                src={`${item.imageSrc}`}
                alt={item.name}
                width={item.width}
                height={item.height}
                style={{ margin: `0 ${item.marginLeft}`, marginTop: item.marginTop }}
              />
              <p style={{  marginTop: item.textMarginTop, marginLeft: item.textMarginLeft, color: '#2D4356', fontSize: '13px', opacity: "0.5" }}>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Layanan;
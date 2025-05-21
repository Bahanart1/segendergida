'use client';
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpeg" alt="Seneger Gıda Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-xl font-bold">Seneger Gıda</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-yellow-600">Anasayfa</a>
            <a href="#about" className="hover:text-yellow-600">Hakkımızda</a>
            <a href="#products" className="hover:text-yellow-600">Ürünler</a>
            <a href="#contact" className="hover:text-yellow-600">İletişim</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center text-center" style={{ backgroundImage: "url('/seneger.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 px-4">
          <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-4">Seneger Gıda</h2>
          <p className="text-white text-lg md:text-xl max-w-xl mx-auto mb-6">Doğadan sofralarınıza; taze, doğal ve güvenilir gıda ürünleri.</p>
          <a href="#products" className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-yellow-600 transition">Ürünleri Keşfet</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image src="/seneger.jpg" alt="Hakkımızda Resmi" width={600} height={400} className="rounded-lg shadow" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Hakkımızda</h3>
            <p className="text-lg leading-relaxed">
              Seneger Gıda, Amasya merkezli bir aile şirketidir ve geleneksel Türk mutfağının lezzetlerini modern üretim teknikleriyle birleştirerek müşterilerine sunmaktadır. Kurucusu Ayşe Seneger, evde başladığı mantı, börek ve kurabiye üretimini, KOSGEB desteğiyle kurduğu imalathanede büyüterek 25 kişiye istihdam sağlamıştır. Eşi, gıda mühendisi Ayhan Seneger&#39;in de desteğiyle şirket kısa sürede Türkiye&#39;nin birçok şehrine ve Avrupa&#39;ya ürün gönderen bir marka haline gelmiştir.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white px-4">
        <h3 className="text-4xl font-bold text-center mb-12">Ürünlerimiz</h3>
        <div className="flex gap-6 overflow-x-auto px-4 scrollbar-thin">
          {[
            { name: "Börek", description: "Kat kat açılmış hamurla hazırlanan, içi bol ve nefis börek çeşitlerimiz.", image: "/borek.jpeg" },
            { name: "Mantı", description: "Özel tariflerle hazırlanmış, geleneksel Türk mantısı.", image: "/manti.png" },
            { name: "Erişte", description: "Doğal ve ev yapımı yöntemlerle üretilmiş eriştelerimiz.", image: "/eriste.jpeg" },
            { name: "Kurabiye", description: "Ev yapımı, katkısız, ağızda dağılan kurabiyelerimiz.", image: "/kurabiye.jpeg" },
            { name: "Reçel", description: "Mevsiminde toplanmış meyvelerle hazırlanmış doğal reçeller.", image: "/recel.jpeg" }
          ].map((product) => (
            <div key={product.name} className="min-w-[280px] bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <Image src={product.image} alt={`${product.name} Resmi`} width={280} height={180} className="rounded mb-3" />
              <h4 className="text-xl font-semibold">{product.name}</h4>
              <p className="text-sm mt-2">{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">Bize Ulaşın</h3>
            <p className="text-lg mb-6">Ürünlerimiz ve hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.</p>
            <a href="mailto:iletisim@senegergida.com" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-full transition">Mail Gönder</a>
          </div>
          <div className="w-full h-80">
            <iframe
              src="https://www.google.com/maps?q=Seneger+Bakery,+Aşağı,+Atatürk+Caddesi+No+18,+05000+Ziyaret/Amasya+Merkez/Amasya&hl=tr&z=17&output=embed"
              width="100%"
              height="100%"
              className="rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-white px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6">Vizyonumuz</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            Seneger Gıda olarak, Anadolu&#39;nun zengin mutfak kültürünü koruyarak, sağlıklı ve doğal ürünleri hem yurt içinde hem de yurt dışında daha geniş kitlelere ulaştırmayı hedefliyoruz. Kalite, güven ve müşteri memnuniyeti ilkelerimiz doğrultusunda, geleneksel lezzetleri modern dünyaya tanıtmak için çalışıyoruz.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-sm text-gray-500 border-t">
        © 2025 Seneger Gıda. Tüm hakları saklıdır.
      </footer>
    </main>
  );
}

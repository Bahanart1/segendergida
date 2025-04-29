import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-gray-800 font-sans">
      {/* Navbar rendered fixed on top */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="Seneger Gıda Logo"
              width={50}
              height={50}
            />
            <span
              className="text-2xl font-extrabold text-white tracking-wide"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Seneger Gıda
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-lg">
            <a href="#" className="text-white hover:text-yellow-300 transition">Anasayfa</a>
            <a href="#about" className="text-white hover:text-yellow-300 transition">Hakkımızda</a>
            <a href="#products" className="text-white hover:text-yellow-300 transition">Ürünler</a>
            <a href="#contact" className="text-white hover:text-yellow-300 transition">İletişim</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex flex-col items-center justify-center text-center pt-28 p-8"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "110% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          imageRendering: "auto",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-white">Seneger Gıda</h1>
          <p className="text-xl max-w-xl text-white">
            Doğadan sofralarınıza; taze, doğal ve güvenilir gıda ürünleri.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="flex flex-col md:flex-row items-center gap-10 p-10 md:p-20 bg-gray-50">
        <div className="flex-1">
          <Image
            src="/about.jpg"
            alt="Hakkımızda Resmi"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Hakkımızda</h2>
          <p className="text-lg leading-relaxed">
            Seneger Gıda, Amasya merkezli bir aile şirketidir ve geleneksel Türk mutfağının lezzetlerini modern üretim teknikleriyle birleştirerek müşterilerine sunmaktadır. Kurucusu Ayşe Seneger, evde başladığı mantı, börek ve kurabiye üretimini, KOSGEB desteğiyle kurduğu imalathanede büyüterek 25 kişiye istihdam sağlamıştır. Eşi, gıda mühendisi Ayhan Seneger'in de desteğiyle şirket kısa sürede Türkiye'nin birçok şehrine ve Avrupa'ya ürün gönderen bir marka haline gelmiştir.
          </p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10">Ürünlerimiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10">
          {[
            { name: "Börek", description: "Kat kat açılmış hamurla hazırlanan, içi bol ve nefis börek çeşitlerimiz." },
            { name: "Mantı", description: "Özel tariflerle hazırlanmış, geleneksel Türk mantısı." },
            { name: "Erişte", description: "Doğal ve ev yapımı yöntemlerle üretilmiş eriştelerimiz." }
          ].map((product) => (
            <div key={product.name} className="border rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <Image
                src="/products.jpg"
                alt={`${product.name} Resmi`}
                width={300}
                height={200}
                className="rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="flex flex-col md:flex-row items-center gap-10 p-10 md:p-20 bg-yellow-50">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Bize Ulaşın</h2>
          <p className="text-lg mb-6">
            Ürünlerimiz ve hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.
          </p>
          <a
            href="mailto:iletisim@senegergida.com"
            className="inline-block bg-yellow-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-yellow-600 transition"
          >
            Mail Gönder
          </a>
        </div>
        <div className="flex-1 w-full h-96">
          <iframe
            src="https://www.google.com/maps?q=Seneger+Bakery,+Aşağı,+Atatürk+Caddesi+No+18,+05000+Ziyaret/Amasya+Merkez/Amasya&hl=tr&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-gray-50 text-center px-10">
        <h2 className="text-4xl font-bold mb-8">Vizyonumuz</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Seneger Gıda olarak, Anadolu'nun zengin mutfak kültürünü koruyarak, sağlıklı ve doğal ürünleri hem yurt içinde hem de yurt dışında daha geniş kitlelere ulaştırmayı hedefliyoruz. Kalite, güven ve müşteri memnuniyeti ilkelerimiz doğrultusunda, geleneksel lezzetleri modern dünyaya tanıtmak için çalışıyoruz.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100">
        © 2025 Seneger Gıda. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

 export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Active section detection
      const sections = ['home', 'about', 'products', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6); }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
      <main className="bg-gradient-to-br from-gray-50 via-white to-yellow-50 text-gray-900 font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 sm:gap-4 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <Image 
                  src="/logo.jpeg" 
                  alt="Seneger Gıda Logo" 
                  width={40} 
                  height={40} 
                  className="relative rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 sm:w-[50px] sm:h-[50px]" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent group-hover:from-yellow-600 group-hover:to-orange-600 transition-all duration-500">
                  Seneger Gıda
                </h1>
                <div className="h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {[
                { id: "home", label: "Anasayfa", icon: "🏠" },
                { id: "about", label: "Hakkımızda", icon: "👥" },
                { id: "products", label: "Ürünler", icon: "🍽️" },
                { id: "contact", label: "İletişim", icon: "📞" }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-4 xl:px-6 py-2 xl:py-3 rounded-2xl font-semibold text-xs xl:text-sm transition-all duration-500 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-400/30'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <span className="flex items-center gap-1 xl:gap-2">
                    <span className="text-sm xl:text-lg">{item.icon}</span>
                    <span className="hidden xl:inline">{item.label}</span>
                  </span>
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse"></div>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection('contact')}
                className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-1 xl:gap-2 text-xs xl:text-sm">
                  <span className="hidden xl:inline">İletişime Geç</span>
                  <span className="xl:hidden">İletişim</span>
                  <svg className="w-3 h-3 xl:w-4 xl:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <div className={`w-5 h-0.5 sm:w-6 sm:h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-5 h-0.5 sm:w-6 sm:h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 sm:w-6 sm:h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl mt-4 p-4 sm:p-6 space-y-2 sm:space-y-3">
              {[
                { id: "home", label: "Anasayfa", icon: "🏠" },
                { id: "about", label: "Hakkımızda", icon: "👥" },
                { id: "products", label: "Ürünler", icon: "🍽️" },
                { id: "contact", label: "İletişim", icon: "📞" }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-semibold text-left transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <span className="text-base sm:text-lg">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
              
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>İletişime Geç</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section 
        id="home"
        className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
            }}
          />
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-300/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg mb-6 sm:mb-8 border border-yellow-200/50">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Amasya&apos;nın Gururu</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
              Seneger <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Gıda</span>
            </h1>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-transparent to-yellow-400 rounded-full"></div>
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
            </div>
          </div>
          
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <p className="text-gray-700 text-base sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-4 sm:px-0">
              Geleneksel Türk mutfağının en lezzetli örneklerini, modern üretim teknikleriyle sofralarınıza taşıyoruz
            </p>
          </div>
          
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '0.9s' }}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
              <a 
                href="#products" 
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl text-sm sm:text-base"
              >
                <span>Ürünleri Keşfet</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a 
                href="#contact" 
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm text-gray-800 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-lg border border-gray-200/50 text-sm sm:text-base"
              >
                <span>İletişime Geç</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10 px-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 text-center">
            {[
              { number: "25+", label: "Çalışan" },
              { number: "5+", label: "Ürün Kategorisi" },
              { number: "100%", label: "Doğal" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 shadow-lg border border-yellow-200/50"
                style={{
                  animationDelay: `${1.2 + index * 0.1}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s ease-out'
                }}
              >
                <div className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center bg-white/90 backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 bg-gradient-to-br from-gray-50 via-white to-yellow-50 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f59e0b\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-1">
              <Image 
                src="/seneger.jpg" 
                alt="Hakkımızda Resmi" 
                width={600} 
                height={400} 
                className="rounded-2xl transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Hakkımızda</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
                Geleneksel Lezzetler, Modern Kalite
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 font-light">
              Seneger Gıda, Amasya merkezli bir aile şirketidir ve geleneksel Türk mutfağının lezzetlerini modern üretim teknikleriyle birleştirerek müşterilerine sunmaktadır. Kurucusu Ayşe Seneger, evde başladığı mantı, börek ve kurabiye üretimini, KOSGEB desteğiyle kurduğu imalathanede büyüterek 25 kişiye istihdam sağlamıştır.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 font-light">
              Eşi, gıda mühendisi Ayhan Seneger&apos;in de desteğiyle şirket kısa sürede Türkiye&apos;nin birçok şehrine ve Avrupa&apos;ya ürün gönderen bir marka haline gelmiştir.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">25+ Çalışan</h4>
                <p className="text-sm text-gray-600">Aile ortamında büyüyen ekip</p>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Avrupa&apos;ya</h4>
                <p className="text-sm text-gray-600">Uluslararası ihracat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-32 bg-gradient-to-br from-white via-gray-50 to-yellow-50 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23f59e0b\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/%3E%3C/g%3E%3C/svg%3E')"}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-3 rounded-full mb-8">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Ürünlerimiz</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight mb-6">
              Lezzetli Ürünlerimiz
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Product Categories */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { 
                  name: "Börek", 
                  description: "Kat kat açılmış hamurla hazırlanan, içi bol ve nefis börek çeşitlerimiz.", 
                  image: "/borek.jpeg",
                  gradient: "from-amber-400 to-orange-500",
                  features: ["Çeşitli içler", "Taze hamur", "Ev yapımı"],
                  price: "₺15-25"
                },
                { 
                  name: "Mantı", 
                  description: "Özel tariflerle hazırlanmış, geleneksel Türk mantısı.", 
                  image: "/manti.png",
                  gradient: "from-red-400 to-pink-500",
                  features: ["El yapımı", "Özel sos", "Geleneksel"],
                  price: "₺20-30"
                },
                { 
                  name: "Erişte", 
                  description: "Doğal ve ev yapımı yöntemlerle üretilmiş eriştelerimiz.", 
                  image: "/eriste.jpeg",
                  gradient: "from-yellow-400 to-amber-500",
                  features: ["Doğal", "Ev yapımı", "Taze"],
                  price: "₺12-18"
                },
                { 
                  name: "Kurabiye", 
                  description: "Ev yapımı, katkısız, ağızda dağılan kurabiyelerimiz.", 
                  image: "/kurabiye.jpeg",
                  gradient: "from-green-400 to-emerald-500",
                  features: ["Katkısız", "Çeşitli", "Taze"],
                  price: "₺8-15"
                },
                { 
                  name: "Reçel", 
                  description: "Mevsiminde toplanmış meyvelerle hazırlanmış doğal reçeller.", 
                  image: "/recel.jpeg",
                  gradient: "from-purple-400 to-pink-500",
                  features: ["Doğal meyve", "Şekersiz", "Ev yapımı"],
                  price: "₺18-25"
                }
              ].map((product, index) => (
                <div 
                  key={product.name} 
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-3xl">
                    {product.image === "/kurabiye.jpeg" || product.image === "/recel.jpeg" ? (
                      <div className={`w-full h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="relative z-10 text-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            {product.name === "Kurabiye" ? (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            ) : (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white">{product.name}</h3>
                          <p className="text-white/80 text-sm mt-2">Görsel yakında</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    ) : (
                      <Image 
                        src={product.image} 
                        alt={`${product.name} Resmi`} 
                        width={400} 
                        height={250} 
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
                      <span className={`text-lg font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                        {product.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <h4 className="text-xl lg:text-2xl font-black text-gray-800 mb-3 lg:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 font-light text-sm lg:text-base">
                      {product.description}
                    </p>
                    <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 lg:gap-3">
                          <div className={`w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r ${product.gradient} rounded-full`}></div>
                          <span className="text-xs lg:text-sm text-gray-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-12 lg:mt-16 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-white/20">
                <h5 className="text-2xl sm:text-3xl font-black text-gray-800 mb-4 lg:mb-6">Tüm Ürünlerimizi Keşfedin</h5>
                <p className="text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                  Geleneksel Türk mutfağının en lezzetli örneklerini, modern üretim teknikleriyle hazırlıyoruz. 
                  Her ürünümüz, geleneksel tariflerin korunarak çağdaş kalite standartlarında üretilmektedir.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl lg:rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Katalog İndir
                  </button>
                  <button className="bg-white/80 hover:bg-white text-gray-800 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl lg:rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-md border border-gray-200 flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hemen Ara
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f59e0b\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-yellow-400/30">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-yellow-300">İletişim</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Bize <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Ulaşın</span>
              </h3>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
              Ürünlerimiz ve hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.
            </p>
            
            <div className="space-y-4 lg:space-y-6">
              <a 
                href="mailto:iletisim@senegergida.com" 
                className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl lg:rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl text-sm sm:text-base"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Mail Gönder</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
      <div>
                    <p className="text-white font-bold text-base sm:text-lg">0533 333 33 33</p>
                    <p className="text-gray-300 text-xs sm:text-sm">7/24 Destek Hattı</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105">
              <iframe
                src="https://www.google.com/maps?q=Seneger+Bakery,+Aşağı,+Atatürk+Caddesi+No+18,+05000+Ziyaret/Amasya+Merkez/Amasya&hl=tr&z=17&output=embed"
                width="100%"
                height="300"
                className="rounded-2xl lg:rounded-3xl transition-transform duration-700 group-hover:scale-110 sm:h-[350px] lg:h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-white via-gray-50 to-yellow-50 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23f59e0b\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z\"/%3E%3C/g%3E%3C/svg%3E')"}}></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Vizyonumuz</span>
      </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
              Geleceğe Bakış
            </h3>
            
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl lg:rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 font-light max-w-4xl mx-auto">
                  Seneger Gıda olarak, Anadolu&apos;nun zengin mutfak kültürünü koruyarak, sağlıklı ve doğal ürünleri hem yurt içinde hem de yurt dışında daha geniş kitlelere ulaştırmayı hedefliyoruz. Kalite, güven ve müşteri memnuniyeti ilkelerimiz doğrultusunda, geleneksel lezzetleri modern dünyaya tanıtmak için çalışıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23f59e0b\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/%3E%3C/g%3E%3C/svg%3E')"}}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Image src="/logo.jpeg" alt="Seneger Gıda Logo" width={20} height={20} className="rounded-full sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">Seneger Gıda</h4>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Geleneksel Türk mutfağının lezzetlerini modern üretim teknikleriyle birleştiren, kaliteli ve güvenilir gıda ürünleri üreticisi.
              </p>
            </div>
            
            <div className="space-y-4 lg:space-y-6">
              <h5 className="text-lg sm:text-xl font-bold text-white">Hızlı Linkler</h5>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { href: "#", label: "Anasayfa" },
                  { href: "#about", label: "Hakkımızda" },
                  { href: "#products", label: "Ürünler" },
                  { href: "#contact", label: "İletişim" }
                ].map((link) => (
                  <a 
                    key={link.label}
                    href={link.href}
                    className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 transform text-sm sm:text-base"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 lg:space-y-6 sm:col-span-2 lg:col-span-1">
              <h5 className="text-lg sm:text-xl font-bold text-white">İletişim Bilgileri</h5>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">0533 333 33 33</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">iletisim@senegergida.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">Amasya Merkez, Türkiye</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2025 Seneger Gıda. Tüm hakları saklıdır.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
 }

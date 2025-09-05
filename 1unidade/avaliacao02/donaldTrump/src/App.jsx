import React, { useState, useEffect, useRef } from 'react';

// --- Ícones em SVG ---
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-10 h-10 text-red-500 mb-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"></path>
  </svg>
);


// --- Hook Customizado para Animação de Scroll ---
const useIntersectionObserver = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// Componente genérico para seções que aparecem com animação
const AnimatedSection = ({ children, id, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`py-20 transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </section>
  );
};

// --- Componentes da Página ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-wider" style={{ fontFamily: "'Marvel', sans-serif" }}>
          <a href="#hero" className="hover:text-red-500 transition-colors">MARVEL</a>
        </h1>
        <nav className="hidden md:flex space-x-8">
          <a href="#universe" className="text-white hover:text-red-500 transition-colors">Universo</a>
          <a href="#sagas" className="text-white hover:text-red-500 transition-colors">Sagas</a>
          <a href="#heroes" className="text-white hover:text-red-500 transition-colors">Heróis</a>
          <a href="#quotes" className="text-white hover:text-red-500 transition-colors">Frases</a>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="hero" className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <div className="text-center z-10 p-4">
      <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontFamily: "'Marvel', sans-serif" }}>
        Universo Marvel
      </h2>
      <p className="mt-4 text-xl md:text-2xl font-light text-gray-200">
        Uma Jornada Épica de Heróis e Vilões
      </p>
    </div>
    <a href="#universe" className="absolute bottom-10 animate-bounce z-10">
      <ChevronDownIcon />
    </a>
  </section>
);

const Universe = () => (
  <AnimatedSection id="universe" className="bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Mais que Histórias em Quadrinhos</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">Criado por visionários como Stan Lee, Jack Kirby e Steve Ditko, o Universo Marvel nasceu nas páginas dos quadrinhos nos anos 60, apresentando heróis complexos e humanos que cativaram o mundo.</p>
          <p className="text-gray-600 mb-4 leading-relaxed">Do Quarteto Fantástico aos Vingadores, a Marvel construiu uma tapeçaria interconectada de histórias sobre poder, responsabilidade e sacrifício.</p>
          <p className="text-gray-600 leading-relaxed">Hoje, esse universo expandiu-se para o cinema com o Marvel Cinematic Universe (MCU), tornando-se um dos maiores fenômenos da cultura pop global, unindo gerações de fãs em uma saga contínua e espetacular.</p>
        </div>
        <div className="order-1 md:order-2">
          <img src="https://images.pexels.com/photos/7382431/pexels-photo-7382431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Action figures de heróis da Marvel" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const TimelineItem = ({ year, title, description, color, reverse = false }) => (
  <div className={`mb-8 flex justify-between ${reverse ? 'flex-row-reverse' : ''} items-center w-full`}>
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-red-600 shadow-xl w-8 h-8 rounded-full"></div>
    <div className={`order-1 ${color} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
      <p className={`font-bold ${reverse ? 'text-white' : 'text-red-600'}`}>{year}</p>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-sm leading-snug tracking-wide">{description}</p>
    </div>
  </div>
);

const Sagas = () => (
  <AnimatedSection id="sagas" className="bg-white">
    <div className="container mx-auto px-6">
      <h3 className="text-center text-4xl font-bold text-gray-800 mb-16">Sagas que Definiram Gerações</h3>
      <div className="relative wrap overflow-hidden h-full after:content-[''] after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5 after:bg-gray-200 after:-ml-px">
          <TimelineItem year="1961" title="O Início de uma Era" description="O Quarteto Fantástico #1 é lançado, dando início à Era Marvel dos Quadrinhos com heróis realistas e falhos." color="bg-gray-100" />
          <TimelineItem year="2008" title="Início do MCU" description="Com 'Homem de Ferro', a Marvel Studios dá o primeiro passo para construir um universo cinematográfico interligado." color="bg-red-600 text-white" reverse={true} />
          <TimelineItem year="2012" title="Os Vingadores se Reúnem" description="O filme 'Os Vingadores' une os heróis pela primeira vez nas telas, um marco histórico para o cinema." color="bg-gray-100" />
          <TimelineItem year="2019" title="A Saga do Infinito" description="'Vingadores: Ultimato' conclui uma jornada de 22 filmes, tornando-se um evento cinematográfico global." color="bg-red-600 text-white" reverse={true} />
      </div>
    </div>
  </AnimatedSection>
);

const Heroes = () => {
    const images = [
        { name: "Homem de Ferro", url: "https://images.pexels.com/photos/16298410/pexels-photo-16298410/free-photo-of-homem-de-ferro-homem-brinquedo-figura.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Capitão América", url: "https://images.pexels.com/photos/13364951/pexels-photo-13364951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Thor", url: "https://images.pexels.com/photos/7715332/pexels-photo-7715332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Hulk", url: "https://images.pexels.com/photos/5343265/pexels-photo-5343265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Pantera Negra", url: "https://images.pexels.com/photos/10661168/pexels-photo-10661168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Homem-Aranha", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTccMtbnDYaDEnYII-nDJmqMUh79iP7bomhlA&s" },
    ];

    return (
        <AnimatedSection id="heroes" className="bg-gray-50">
            <div className="container mx-auto px-6">
                <h3 className="text-center text-4xl font-bold text-gray-800 mb-12">Galeria de Heróis Lendários</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((hero) => (
                        <div key={hero.name} className="overflow-hidden rounded-lg shadow-lg group relative">
                            <img src={hero.url} alt={`Imagem do ${hero.name}`} className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                                <h4 className="text-white text-xl font-bold p-4">{hero.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const Quotes = () => {
  const quotes = [
      { text: "Com grandes poderes vêm grandes responsabilidades.", author: "- Ben Parker (Homem-Aranha)" },
      { text: "Eu sou o Homem de Ferro.", author: "- Tony Stark (Homem de Ferro)" },
      { text: "Vingadores... Avante!", author: "- Steve Rogers (Capitão América)" },
      { text: "Não se mede o valor de uma vida por sua duração, mas por sua doação.", author: "- Odin (Thor)" },
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <AnimatedSection id="quotes" className="bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <QuoteIcon />
          <p className="text-2xl md:text-3xl font-light text-white italic leading-relaxed">"{quotes[currentQuoteIndex].text}"</p>
          <p className="mt-6 text-lg font-semibold text-gray-200">{quotes[currentQuoteIndex].author}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; {new Date().getFullYear()} Universo Marvel. Todos os direitos reservados à Marvel Entertainment.</p>
      <p className="text-sm text-gray-400 mt-2">Este é um site de demonstração feito por um fã para fins educacionais.</p>
    </div>
  </footer>
);


// --- Componente Principal da Aplicação ---
export default function App() {
  useEffect(() => {
    // Adiciona a fonte 'Marvel' ao cabeçalho do documento
    const linkMarvel = document.createElement('link');
    linkMarvel.href = 'https://fonts.googleapis.com/css2?family=Marvel:wght@400;700&display=swap';
    linkMarvel.rel = 'stylesheet';
    
    // Adiciona a fonte 'Inter'
    const linkInter = document.createElement('link');
    linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap';
    linkInter.rel = 'stylesheet';

    document.head.appendChild(linkMarvel);
    document.head.appendChild(linkInter);
    
    // Adiciona a classe de scroll-smooth ao HTML
    document.documentElement.classList.add('scroll-smooth');
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white">
      <Header />
      <main>
        <Hero />
        <Universe />
        <Sagas />
        <Heroes />
        <Quotes />
      </main>
      <Footer />
    </div>
  );
}




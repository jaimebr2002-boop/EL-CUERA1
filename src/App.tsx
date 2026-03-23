import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Clock, Star, ChevronLeft, ChevronRight, Instagram, Facebook, Fish, Beef, Wine, Leaf } from 'lucide-react';

const menuData = [
  {
    category: "Acompañamiento",
    items: [
      { name: "Ración de pan", price: "1,50 €" }
    ]
  },
  {
    category: "Ensaladas",
    items: [
      { name: "Ensalada de tomate asturiano y cebolla", price: "12,00 €" },
      { name: "Ensalada mixta", price: "15,00 €" },
      { name: "Cogote de bonito sobre tomate caramelizado", price: "18,00 €" },
      { name: "Ensalada de gambas caramelizadas", price: "18,00 €", specialty: true },
      { name: "Mix de espárragos a la brasa (horno Josper) con cogote de bonito y vinagreta", price: "20,00 €" },
      { name: "Tronco de bonito en escabeche con pimiento confitado", price: "19,00 €" },
      { name: "Salpicón de merluza, langostinos y mango", price: "22,00 €" }
    ]
  },
  {
    category: "Platos para compartir – Fríos",
    items: [
      { name: "Sardina ahumada (unidad)", price: "4,00 €" },
      { name: "Pastel de cabracho", price: "11,00 €" },
      { name: "Queso de Porrúa con higos", price: "12,00 €" },
      { name: "Boquerones en vinagre (elaboración propia)", price: "13,00 €" },
      { name: "Carpaccio de carne roja con virutas de queso", price: "16,00 €" },
      { name: "Cecina de buey con virutas de micuit", price: "17,00 €" },
      { name: "Carpaccio de bacalao ahumado con tomate", price: "18,00 €" },
      { name: "Trucha ahumada del río Bedón (Llanes) 100gr", price: "20,00 €" },
      { name: "Anchoas del Cantábrico (8 unidades)", price: "21,00 €" },
      { name: "Jamón Ibérico de Bellota", price: "25,00 €" },
      { name: "Queso de Porrúa", price: "9,00 €" },
      { name: "Queso de Cabrales", price: "11,00 €" },
      { name: "Queso Gamoneu", price: "12,00 €" },
      { name: "Queso de Pría (tres leches)", price: "11,00 €" },
      { name: "Tabla de quesos", price: "20,00 €" }
    ]
  },
  {
    category: "Platos para compartir – Calientes",
    items: [
      { name: "Mejillones a la sidra", price: "12,00 €" },
      { name: "Croquetas de jamón", price: "14,00 €" },
      { name: "Bocartes a la brasa", price: "14,00 €" },
      { name: "Queso de Porrúa a la plancha sobre juliana de puerros y calabacín", price: "16,00 €" },
      { name: "Callos caseros de ternera con patatinas", price: "16,00 €" },
      { name: "Chipirones a la plancha con cebolla caramelizada", price: "19,00 €" },
      { name: "Alcachofas confitadas a la plancha", price: "20,00 €" },
      { name: "Calamares fritos (frescos)", price: "20,00 €" },
      { name: "Tortilla de bacalao", price: "23,00 €" },
      { name: "Callos de bacalao", price: "23,00 €" },
      { name: "Foie con manzana y salsa de pasas al Pedro Ximénez", price: "23,00 €" },
      { name: "Pulpo de pedrero a la brasa con alioli", price: "24,00 €", specialty: true },
      { name: "Zamburiñas a la plancha", price: "25,00 €" },
      { name: "Almejas salvajes a la plancha", price: "30,00 €" },
      { name: "Gambas rojas de Palamós (350gr)", price: "38,00 €" }
    ]
  },
  {
    category: "Mariscos",
    items: [
      { name: "Nécora (unidad)", price: "12,00 €" },
      { name: "Parrillada de marisco (2 personas)", price: "99,00 €" },
      { name: "Bogavante", price: "70,00 €/kg" },
      { name: "Percebes", price: "Consultar" },
      { name: "Quisquilla", price: "Consultar" }
    ]
  },
  {
    category: "Primeros",
    items: [
      { name: "Sopa de pescado", price: "11,00 €" },
      { name: "Fabada degustación", price: "13,00 €", specialty: true },
      { name: "Fabada", price: "18,00 €", specialty: true },
      { name: "Pote asturiano \"Casa Siglo\"", price: "18,00 €" }
    ]
  },
  {
    category: "Platos por encargo",
    items: [
      { name: "Arroz con bogavante (mínimo 2 raciones)", price: "32,00 €/ración" },
      { name: "Arroz marinero (mínimo 2 raciones)", price: "27,00 €/ración" }
    ]
  },
  {
    category: "Pescados – Todos salvajes",
    items: [
      { name: "Rollo de bonito (en temporada)", price: "23,00 €" },
      { name: "Calamares en tinta", price: "25,00 €" },
      { name: "Kokotxas de bacalao en salsa verde", price: "27,00 €" },
      { name: "Lomo de bacalao asado con pimientos y patatas confitadas", price: "27,00 €" },
      { name: "Merluza \"del pinchu\" a la plancha", price: "27,00 €" },
      { name: "Merluza \"del pinchu\" a la sidra", price: "29,00 €", specialty: true },
      { name: "Pescados a la plancha", price: "Consultar precios", specialty: true }
    ]
  },
  {
    category: "Carnes",
    items: [
      { name: "Cachopo de ternera con pisto de piquillo", price: "25,00 €", specialty: true },
      { name: "Solomillo de carne roja", price: "27,00 €" },
      { name: "Entrecot de carne roja", price: "28,00 €" },
      { name: "Solomillo de carne roja al foie", price: "31,00 €", specialty: true },
      { name: "Chuletón de carne roja (selección Trasacar)", price: "58,00 €/kg" }
    ]
  },
  {
    category: "Menú Degustación",
    items: []
  },
  {
    category: "Postres",
    items: [
      { name: "Tarta chocolate Orbayu", price: "8,00 €" },
      { name: "Tarta de queso con frutos del bosque", price: "6,50 €" },
      { name: "Sopa de kiwi con mousse de queso", price: "6,50 €" },
      { name: "Helado de plátano con chocolate caliente", price: "6,50 €" },
      { name: "Helado de arroz con leche", price: "6,50 €" },
      { name: "Helado de turrón", price: "6,50 €" },
      { name: "Sorbete de Gin Tonic", price: "6,50 €" },
      { name: "Arroz con leche", price: "6,50 €" },
      { name: "Coulant de chocolate", price: "6,50 €" },
      { name: "Flan de dulce de leche", price: "6,50 €" },
      { name: "Tocinillo de cielo con sopa de manzana ácida", price: "6,50 €" }
    ]
  }
];

const reviews = [
  { name: "Mary Cris", text: "Excelente servicio, desde que entras te reciben muy amablemente, enseguida te colocan en la mesa y te ofrecen la carta y si pides sugerencias lo hacen con un trato increíble. Hemos pedido la fabada degustación y espárragos con bonito, todo riquísimo." },
  { name: "Faty Aline", text: "Fuimos a comer al Restaurante El Cuera en Llanes y salimos encantados. La comida estaba deliciosa, bien presentada y con muy buena calidad. Pero lo que más nos sorprendió fue la atención del camarero Cristóbal: profesional, amable y siempre atento." },
  { name: "Vanessa Cruz", text: "Caminando por Llanes buscando donde comer… todo lleno pero aquí nos dejaron beber algo mientras se levantaba una mesa! Qué buena comida! Las ostras, la fabada, queso y el cachopo! Excelente atención y buen servicio. Recomendable." },
  { name: "Alvaro", text: "Un restaurante de 10, la comida de 10 y la atención al cliente como no podía ser menos, de 10. La persona que nos atendió en la mesa, una bellísima persona, nos recomendó productos estupendos." },
  { name: "Maite Canteli", text: "Cocina excelente con muy buen producto. Zamburiñas, rollo de bonito y solomillo todo riquísimo. Y la tarta de queso espectacular!!!" },
  { name: "Antonio Collar Martínez", text: "Tomamos un aperitivo en la barra con unos pinchos de tortilla de otro planeta, poco hecha y con cebolla caramelizada. Pasamos al comedor y la atención fue excelente." },
  { name: "Jose Angel", text: "Fuimos a cenar 2 amigos y yo, nos gustó tanto que reservamos mesa para comer al día siguiente. Es visita obligada. Un trato excelente del producto y un servicio muy agradable. 10 de 10 todo." },
  { name: "Maria M.", text: "Nos EN-CAN-TÓ! Es un sitio al que volvería seguro, la comida de gran calidad. Estuvimos en la terraza de atrás, muy buen servicio y muy tranquilos. Para volver!" },
  { name: "Raul", text: "Cenamos de lujo en el centro de Llanes en una espectacular terraza con poco ruido. Destacaría el chuletón. Un placer, muchas gracias." },
  { name: "Pedro A.", text: "Para quitarse el sombrero. Magnífica carta tanto de mariscos como de pescado y carnes. Entrantes variados y de calidad." },
  { name: "Kike S", text: "Muy buena sidrería en el centro de Llanes, excelente producto bien cocinado. Mejor reservar antes, suele estar lleno. 100% recomendable." },
  { name: "Anghela Paz", text: "Restaurante con una cocina muy rica, productos de calidad y bonita decoración. Cenamos en la terraza cubierta con el menú de degustación. Una experiencia de 40€ por persona que merece mucho la pena." },
  { name: "Martin Settecerze", text: "Excelente experiencia de principio a fin, el lugar y la comida espectacular. Por ahora el mejor cachopo que he comido. El trato por parte del dueño muy bueno. 100% recomendable." },
  { name: "Francisco Garcia", text: "Siendo sincero, cuando me senté y vi los precios me dije: vaya palo. Pero cuando llegó la comida, me pareció hasta barato. Producto de una calidad excepcional y una cocina al nivel del producto." },
  { name: "MARIO AYLLON", text: "Una experiencia increíble. Volvimos después de muchos años a revivir un bonito momento y fue de esas veces que supera con creces lo que guardabas en tu memoria." }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Carta', href: '#carta' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Visítanos', href: '#visitanos' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isMobileMenuOpen ? 'bg-white shadow-md py-3' : isScrolled ? 'bg-cream/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className={`font-serif text-2xl md:text-3xl font-bold tracking-tight relative z-[60] pointer-events-auto ${isMobileMenuOpen || isScrolled ? 'text-black' : 'bg-gradient-to-b from-[#E6C27A] via-[#D4AF37] to-[#997A15] text-transparent bg-clip-text drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'}`}>
            El Cuera
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-sans text-sm uppercase tracking-wider font-bold hover:text-[#D4AF37] transition-colors ${isScrolled ? 'text-black' : 'text-[#F5EFE6] drop-shadow-md'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="tel:619183315" className="bg-[#8A0303] hover:bg-[#660000] text-white px-6 py-2.5 rounded-full font-sans text-sm uppercase tracking-wider font-bold transition-all shadow-[0_4px_0_#4A0000] hover:shadow-[0_2px_0_#4A0000] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]">
              Reservar
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`p-2 focus:outline-none transition-colors relative z-[60] pointer-events-auto ${isMobileMenuOpen || isScrolled ? 'text-black' : 'text-white'}`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full z-40 bg-white border-t border-gray-100 overflow-hidden shadow-2xl transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-4 py-8 space-y-2 flex flex-col items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-4 text-black hover:text-maroon font-sans text-lg uppercase tracking-widest font-bold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="w-16 h-px bg-gray-200 my-6"></div>
          <a 
            href="tel:619183315" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full max-w-[250px] text-center bg-[#8A0303] hover:bg-[#660000] text-white px-6 py-4 rounded-full font-sans text-base uppercase tracking-widest font-bold transition-all shadow-[0_4px_0_#4A0000] active:shadow-none active:translate-y-[4px]"
          >
            Reservar Mesa
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294685/625249214_18079883921013263_1628261639004744950_n._ti6na4.jpg" 
          alt="Restaurante El Cuera" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Golden hour warm overlay + lighter center for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/50 via-black/40 to-amber-400/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
        >
          Cocina Asturiana <br className="hidden md:block" /><span className="italic font-artisan">de Verdad</span>
        </motion.h1>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[2px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8 shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        />
        
        <div className="relative max-w-2xl mx-auto mb-12">
          {/* Light glow behind text to ensure dark taupe is readable */}
          <div className="absolute inset-0 bg-cream/80 blur-2xl rounded-full scale-125 -z-10"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-[#3D3530] font-sans leading-loose font-medium"
          >
            Producto fresco, recetas de siempre, sabor que no se olvida. En el corazón de Llanes desde hace más de 30 años.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="tel:619183315" className="w-full sm:w-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#A6192E] to-[#7A0010] hover:from-[#8A0015] hover:to-[#5C000C] text-white px-10 py-4 rounded-full font-sans text-sm uppercase tracking-widest font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-[#FF4D6A]/30">
            <Phone size={18} className="text-white" />
            Reservar Mesa
          </a>
          <a href="#carta" className="w-full sm:w-auto bg-black/30 backdrop-blur-sm border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 text-[#D4AF37] px-10 py-4 rounded-full font-sans text-sm uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Ver Carta
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-texture scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="separator mb-6 text-maroon">
              <span className="font-artisan italic text-xl">Desde 1990</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-dark-brown mb-6">Nuestra Historia</h2>
            <div className="space-y-4 text-dark-brown/80 font-sans text-lg leading-relaxed">
              <p>
                Sidrería Restaurante El Cuera lleva más de 30 años siendo un referente de la cocina asturiana en Llanes. Ubicados en la Plaza Parres Sobrino, en pleno corazón de la villa, somos mucho más que un restaurante: somos una experiencia.
              </p>
              <p>
                Desde nuestras fabadas y cachopos hasta los pescados salvajes del día y el marisco de primera, cada plato lleva el sello de la tradición asturiana y el respeto por el producto.
              </p>
              <p>
                Nuestra terraza, con vistas al río Carrocedo y al Cuera, es uno de los rincones más especiales de Llanes. Ven a conocernos, y descubre por qué nuestros clientes repiten año tras año.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive">
                  <Fish size={24} />
                </div>
                <span className="font-sans font-semibold text-dark-brown text-sm uppercase tracking-wider">Producto fresco del día</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive">
                  <Beef size={24} />
                </div>
                <span className="font-sans font-semibold text-dark-brown text-sm uppercase tracking-wider">Carnes a la brasa</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive">
                  <Wine size={24} />
                </div>
                <span className="font-sans font-semibold text-dark-brown text-sm uppercase tracking-wider">Sidra de calidad</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive">
                  <Leaf size={24} />
                </div>
                <span className="font-sans font-semibold text-dark-brown text-sm uppercase tracking-wider">Cocina de mercado</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294430/62525193_344659879770458_4542545377198342144_n_dnftyu.jpg" 
                alt="Interior del restaurante" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-maroon rounded-2xl -z-0 opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-olive rounded-full -z-0 opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);

  return (
    <section id="carta" className="py-24 bg-cream scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="separator mb-4 text-maroon justify-center max-w-xs mx-auto"
          >
            <span className="font-artisan italic text-xl">Para degustar</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-dark-brown mb-4"
          >
            Nuestra Carta
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-brown/60 font-sans text-sm uppercase tracking-widest"
          >
            Todos los precios con IVA (10%) no incluido
          </motion.p>
        </div>

        <div className="flex flex-wrap mb-12 pb-4 border-b border-dark-brown/10 gap-2 md:gap-4 justify-center">
          {menuData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`whitespace-nowrap font-sans text-xs md:text-sm uppercase tracking-wider font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all ${
                activeCategory === cat.category 
                  ? 'bg-maroon text-white shadow-md' 
                  : 'bg-transparent text-dark-brown/70 hover:bg-maroon/10 hover:text-dark-brown'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
            >
              {activeCategory === "Menú Degustación" ? (
                <div className="col-span-1 md:col-span-2 bg-dark-brown text-cream p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-maroon/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <h3 className="text-3xl font-serif mb-2 text-white">Menú Degustación</h3>
                    <p className="text-maroon font-sans font-bold text-xl mb-6">40,00 € <span className="text-sm font-normal text-cream/70">por persona</span></p>
                    <p className="text-sm text-cream/70 uppercase tracking-widest mb-8">(Mínimo 2 personas — bodega no incluida)</p>
                    
                    <div className="space-y-4 font-artisan text-lg italic text-cream/90 mb-10">
                      <p>• Ensalada de gambas caramelizadas</p>
                      <p>• Queso de Porrúa a la plancha sobre juliana de puerros, calabacines y sus mojos</p>
                      <p>• Lomo de bacalao asado con fritada de pimientos y patatas</p>
                      <p>• Entrecot de carne roja</p>
                      <p>• Helado</p>
                    </div>
                    
                    <a href="tel:619183315" className="inline-block bg-maroon hover:bg-maroon-dark text-white px-8 py-3 rounded-full font-sans text-sm uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Reservar Menú
                    </a>
                  </div>
                </div>
              ) : (
                menuData.find(c => c.category === activeCategory)?.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col border-b border-dark-brown/10 pb-4">
                    <div className="flex justify-between items-baseline gap-2 md:gap-4">
                      <h4 className="font-serif text-base md:text-lg text-dark-brown font-medium leading-tight flex-shrink">
                        {item.name}
                      </h4>
                      <div className="flex-grow border-b border-dotted border-dark-brown/30 mx-2 relative top-[-6px] hidden sm:block"></div>
                      <span className="font-sans font-bold text-maroon whitespace-nowrap flex-shrink-0">{item.price}</span>
                    </div>
                    {item.specialty && (
                      <div className="flex items-center gap-1 mt-1 text-olive">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-sans uppercase tracking-wider font-semibold">Especialidad de la casa</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294430/652651084_18097444552981375_2254835839713123793_n._morofe.webp",
    "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294430/655959899_18171196153397724_7796198791382828417_n._wcqdrv.webp",
    "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294430/651019250_18061226486362081_2374628134880556415_n._n9enl9.webp",
    "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294974/655153560_18109405840837679_6091636408557324446_n._hpnfos.webp",
    "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294973/654915631_18098431498777388_1094038157308924779_n._a7bme2.webp",
    "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774294430/639463848_18410621482120217_3608127775700660424_n._snkayj.webp"
  ];

  return (
    <section id="galeria" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-dark-brown mb-4"
          >
            Nuestros Platos
          </motion.h2>
          <div className="w-24 h-1 bg-maroon mx-auto rounded-full mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-brown/60 font-sans text-sm uppercase tracking-widest"
          >
            Una muestra de nuestra cocina
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={src} 
                alt={`Plato ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="resenas" className="py-24 bg-texture-dark text-cream overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-white mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <div className="w-24 h-1 bg-maroon mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <button onClick={prevReview} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-cream/10 hover:bg-maroon text-white flex items-center justify-center transition-colors z-10">
            <ChevronLeft size={24} />
          </button>
          
          <div className="overflow-hidden px-4 md:px-12 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-cream/5 backdrop-blur-sm border border-cream/10 p-8 md:p-12 rounded-2xl text-center"
              >
                <div className="flex justify-center gap-1 mb-6 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="font-artisan italic text-xl md:text-2xl text-cream/90 leading-relaxed mb-8">
                  "{reviews[currentIndex].text}"
                </p>
                <p className="font-sans font-bold uppercase tracking-widest text-sm text-white">
                  — {reviews[currentIndex].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={nextReview} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-cream/10 hover:bg-maroon text-white flex items-center justify-center transition-colors z-10">
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-maroon w-6' : 'bg-cream/30 hover:bg-cream/60'}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://www.google.com/maps/place/Sidrer%C3%ADa+Restaurante+El+Cuera/@43.4198165,-4.7552954,17z/data=!3m1!5s0xd49eae3938a653b:0xc2a038e48e892ccf!4m17!1m8!3m7!1s0xd49eae395bb9615:0x701bf491bde28405!2sSidrer%C3%ADa+Restaurante+El+Cuera!8m2!3d43.4197284!4d-4.7553007!10e2!16s%2Fg%2F1tgd7vqn!3m7!1s0xd49eae395bb9615:0x701bf491bde28405!8m2!3d43.4197284!4d-4.7553007!9m1!1b1!16s%2Fg%2F1tgd7vqn?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-cream text-dark-brown hover:bg-white px-6 py-3 rounded-full font-sans text-xs md:text-sm uppercase tracking-wider font-bold transition-all shadow-lg hover:shadow-xl text-center"
          >
            Deja tu reseña en Google Maps
          </a>
          <a 
            href="https://www.tripadvisor.es/UserReviewEdit-g608994-d3169988-El_Cuera-Llanes_Asturias.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent border border-cream text-cream hover:bg-cream/10 px-6 py-3 rounded-full font-sans text-xs md:text-sm uppercase tracking-wider font-bold transition-all text-center"
          >
            Deja tu reseña en TripAdvisor
          </a>
        </div>
      </div>
    </section>
  );
};

const VisitUs = () => {
  return (
    <section id="visitanos" className="py-24 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-dark-brown mb-10">Visítanos</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shrink-0 mt-1">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-dark-brown/60 mb-1">Dirección</h4>
                  <p className="font-serif text-xl text-dark-brown">Pl. Parres Sobrino, 33500<br />Llanes, Asturias</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shrink-0 mt-1">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-dark-brown/60 mb-1">Teléfono</h4>
                  <p className="font-serif text-xl text-dark-brown">619 18 33 15</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shrink-0 mt-1">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-dark-brown/60 mb-1">Horario</h4>
                  <p className="font-sans font-semibold text-dark-brown mb-1">Lunes a Domingo</p>
                  <p className="font-serif text-lg text-dark-brown">Comida: 12:00 – 15:30</p>
                  <p className="font-serif text-lg text-dark-brown">Cena: 20:00 – 23:30</p>
                </div>
              </div>
            </div>
            
            <a href="tel:619183315" className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-white px-8 py-4 rounded-full font-sans text-sm uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Phone size={18} />
              Llamar ahora
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.123!2d-4.7552954!3d43.4198165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd49eae395bb9615%3A0x701bf491bde28405!2sSidrer%C3%ADa+Restaurante+El+Cuera!5e0!3m2!1ses!2ses!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación Sidrería Restaurante El Cuera"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Reserve = () => {
  return (
    <section className="py-24 bg-maroon relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-white mb-6"
        >
          ¿Listo para vivir la experiencia?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-cream/90 font-artisan italic mb-10"
        >
          Las reservas se realizan por teléfono. Te esperamos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a href="tel:619183315" className="inline-flex items-center gap-3 bg-white text-maroon hover:bg-cream px-10 py-5 rounded-full font-sans text-lg md:text-xl uppercase tracking-widest font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mb-8">
            <Phone size={24} />
            Llamar al 619 18 33 15
          </a>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-cream/70 font-sans uppercase tracking-widest"
        >
          Abierto todos los días de 12:00 a 15:30 y de 20:00 a 23:30
        </motion.p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1A0F09] text-cream/70 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <a href="#inicio" className="font-serif text-3xl font-bold text-white tracking-tight">
            El Cuera
          </a>
          <div className="w-12 h-0.5 bg-maroon mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-white mb-6">Contacto</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>Pl. Parres Sobrino, 33500</li>
              <li>Llanes, Asturias</li>
              <li className="pt-2"><a href="tel:619183315" className="hover:text-white transition-colors">Tel: 619 18 33 15</a></li>
              <li className="pt-2">L-D: 12:00–15:30 | 20:00–23:30</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-white mb-6">Navegación</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#carta" className="hover:text-white transition-colors">Carta</a></li>
              <li><a href="#resenas" className="hover:text-white transition-colors">Reseñas</a></li>
              <li><a href="#visitanos" className="hover:text-white transition-colors">Visítanos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-white mb-6">Síguenos</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.instagram.com/restauranteelcuerallanes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-maroon hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/ElCuera/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-maroon hover:text-white transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/10 font-sans text-xs tracking-wider">
          <p>© 2025 Sidrería Restaurante El Cuera – Llanes, Asturias</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-maroon selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <VisitUs />
        <Reserve />
      </main>
      <Footer />
    </div>
  );
}

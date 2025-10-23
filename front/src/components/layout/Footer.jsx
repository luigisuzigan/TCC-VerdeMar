import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    empresa: [
      { label: 'Sobre Nós', path: '/sobre' },
      { label: 'Contato', path: '/contato' },
    ],
    imoveis: [
      { label: 'Explorar Imóveis', path: '/explorar' },
      { label: 'Casas de Luxo', path: '/explorar?type=Casa' },
      { label: 'Apartamentos', path: '/explorar?type=Apartamento' },
      { label: 'Chalés', path: '/explorar?type=Chalé' },
    ],
    suporte: [
      { label: 'Central de Ajuda', path: '/ajuda' },
      { label: 'Termos de Uso', path: '/termos' },
      { label: 'Política de Privacidade', path: '/privacidade' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                VerdeMar
              </h2>
            </Link>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-sm">
              Encontre o imóvel dos seus sonhos em todo o Brasil. 
              Conectamos você às melhores oportunidades imobiliárias em localizações privilegiadas.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="tel:+5511999999999" 
                className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Phone size={18} />
                <span>(11) 99999-9999</span>
              </a>
              <a 
                href="mailto:contato@verdemar.com" 
                className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Mail size={18} />
                <span>contato@verdemar.com</span>
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin size={18} />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Imóveis</h3>
            <ul className="space-y-3">
              {footerLinks.imoveis.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Fique por dentro das novidades</h3>
            <p className="text-blue-100 mb-6">
              Receba as melhores ofertas de imóveis diretamente no seu email
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400 mr-2">Siga-nos:</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 text-slate-400">
              <span>&copy; {currentYear} VerdeMar. Feito com</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>no Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

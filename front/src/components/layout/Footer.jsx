import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary-900)] text-white py-10">
      <div className="container text-center">
        <p className="mb-2 text-sm">© 2025 Ondas de Oportunidades. Todos os direitos reservados.</p>
        <p className="mb-6 text-sm text-gray-300">
          Contato: (XX) XXXX-XXXX | info@ondasdeoportunidades.com
        </p>
        
        <div className="flex justify-center gap-6">
          <a 
            href="#" 
            className="text-white hover:text-[var(--color-secondary-500)] transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-[var(--color-secondary-500)] transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-[var(--color-secondary-500)] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
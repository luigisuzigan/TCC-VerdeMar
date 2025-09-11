export default function Footer() {
  return (
    <footer className="bg-ocean-950 text-white py-12">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-sm text-neutral-300">
            © 2025 Verde Mar. Todos os direitos reservados.
          </p>
          <p className="text-sm text-neutral-300">
            Contato: (XX) XXXX-XXXX | contato@verdemar.com.br
          </p>
          
          {/* Social Links Placeholder */}
          <div className="flex gap-6 pt-2">
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors duration-300"
              aria-label="Facebook"
            >
              <span className="sr-only">Facebook</span>
              <div className="w-6 h-6 bg-neutral-400 hover:bg-white rounded transition-colors duration-300" />
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <span className="sr-only">Instagram</span>
              <div className="w-6 h-6 bg-neutral-400 hover:bg-white rounded transition-colors duration-300" />
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <div className="w-6 h-6 bg-neutral-400 hover:bg-white rounded transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
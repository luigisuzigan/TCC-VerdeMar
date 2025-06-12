import './index.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; 2025 Ondas de Oportunidades. Todos os direitos reservados.</p>
                <p>Contato: (XX) XXXX-XXXX | info@ondasdeoportunidades.com</p>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

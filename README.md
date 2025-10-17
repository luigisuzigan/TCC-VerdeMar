# 🏖️ VerdeMar - Plataforma de Imóveis Litorâneos

Plataforma moderna de anúncios imobiliários focada em propriedades de praia em Santa Catarina.

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## 📚 Documentação Completa

**🎯 Leia o [GUIA_COMPLETO.md](./GUIA_COMPLETO.md)** - Toda a documentação do projeto está lá!

## 🚀 Quick Start

```bash
# 1. Backend
cd back
npm install
npm install axios
npx prisma migrate dev
npx prisma db seed
npm run dev

# 2. Frontend (novo terminal)
cd front
npm install
npm run dev
```

Acesse: **http://localhost:5173**

## 📂 Estrutura

```
TCC-VerdeMar/
├── back/           # API (Node.js + Express + Prisma)
├── front/          # Frontend (React + Vite + Tailwind)
├── Tutoriais/      # Guias técnicos específicos
└── GUIA_COMPLETO.md # 📘 DOCUMENTAÇÃO PRINCIPAL
```

## ✨ Principais Features

- 🏠 **Exploração de Imóveis** com filtros avançados
- 🗺️ **Google Maps** integrado com autocomplete
- 📸 **Galeria de fotos** com modal interativo
- 💰 **Sistema de preços** e comparação
- 👤 **Autenticação** JWT
- 🔒 **Roles**: User, Seller, Admin
- 📱 **Design responsivo**

## 🛠️ Tecnologias

### Frontend
- React 18 + Vite 6
- Tailwind CSS 4
- React Router Dom 7
- @react-google-maps/api
- Axios + Lucide Icons

### Backend
- Node.js + Express
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- JWT Authentication

## 📖 Documentação

- **[GUIA_COMPLETO.md](./GUIA_COMPLETO.md)** - Documentação completa e oficial
- `Tutoriais/` - Guias técnicos específicos (backend, testes, etc.)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 License

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Igreja Pleno - uKleitin**

---

**📘 Leia o [GUIA_COMPLETO.md](./GUIA_COMPLETO.md) para todos os detalhes!**

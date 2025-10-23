# 🏖️ VerdeMar - Plataforma de Imóveis Litorâneos

Plataforma moderna de anúncios imobiliários focada em propriedades de praia em Santa Catarina.

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## 📚 Documentação Completa

**🎯 Leia o [GUIA_COMPLETO.md](./GUIA_COMPLETO.md)** - Toda a documentação do projeto está lá!

## 🚀 Quick Start

### Opção 1: Usando Scripts Automáticos (Recomendado para Windows)

```bash
# 1. Instalar dependências do Backend
cd back
npm install

# 2. Gerar Prisma Client (OBRIGATÓRIO - só precisa fazer 1x)
node node_modules\prisma\build\index.js generate

# 3. Popular banco com dados iniciais (opcional - só 1x)
node quick-seed.js

# 4. Iniciar o servidor (duplo clique ou via terminal)
start-backend.bat

# 5. Frontend (novo terminal)
cd ..\front
npm install
npm run dev
```

### Opção 2: Usando NPM (Se npx estiver habilitado)

```bash
# 1. Backend
cd back
npm install

# 2. Gerar Prisma Client (OBRIGATÓRIO)
npx prisma generate

# 3. Popular banco (opcional)
npm run seed

# 4. Iniciar servidor
npm run seed

# 5. Frontend (novo terminal)
cd front
npm install
npm run dev
```

### ⚠️ Passos Importantes

1. **Prisma Client**: SEMPRE execute `npx prisma generate` ou `node node_modules\prisma\build\index.js generate` após instalar dependências
2. **Banco de dados**: O projeto usa MySQL na nuvem (já configurado no `.env`)
3. **Seed**: Execute apenas 1x para popular dados iniciais
4. **Google Maps API**: Configure para mostrar locais próximos - veja [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)
5. **PowerShell**: Se encontrar erro de execução de scripts, use `node` diretamente ou CMD ao invés de PowerShell

Acesse: **http://localhost:5173**

### 🆘 Problemas ao iniciar?
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Soluções de problemas comuns
- **[GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)** - Como configurar Google Maps API

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

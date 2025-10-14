# Script de Seed - Propriedades de Teste

## 🎯 Objetivo

Este script cria 6 imóveis de teste no banco de dados para demonstração e desenvolvimento.

## 📦 Imóveis Criados

### 1. Casa Moderna com Vista para o Mar
- **Tipo**: Casa
- **Preço**: R$ 1.850.000
- **Área**: 250m²
- **Quartos**: 4 | **Banheiros**: 3
- **Imagem**: `/Teste/Imóvel1.jpg`
- **Destaque**: ⭐ SIM

### 2. Apartamento Luxuoso Centro
- **Tipo**: Apartamento
- **Preço**: R$ 980.000
- **Área**: 120m²
- **Quartos**: 3 | **Banheiros**: 3
- **Imagem**: `/Teste/Imóvel2.jpg`
- **Destaque**: ⭐ SIM

### 3. Cobertura Duplex Frente Mar
- **Tipo**: Cobertura
- **Preço**: R$ 3.200.000
- **Área**: 350m²
- **Quartos**: 4 | **Banheiros**: 5
- **Imagem**: `/Teste/Imóvel3.jpg`
- **Destaque**: ⭐ SIM

### 4. Casa Confortável em Condomínio
- **Tipo**: Casa
- **Preço**: R$ 750.000
- **Área**: 180m²
- **Quartos**: 3 | **Banheiros**: 2
- **Imagem**: `/Teste/Imóvel4.jpg`

### 5. Casa de Praia com Piscina
- **Tipo**: Casa
- **Preço**: R$ 1.200.000
- **Área**: 220m²
- **Quartos**: 4 | **Banheiros**: 3
- **Imagem**: `/Teste/Imóvel1.jpg` + fotos de praia

### 6. Apartamento Compacto e Moderno
- **Tipo**: Kitnet
- **Preço**: R$ 350.000
- **Área**: 45m²
- **Quartos**: 1 | **Banheiros**: 1
- **Imagem**: `/Teste/Imóvel2.jpg`

## 🚀 Como Usar

### Executar o Script

```bash
cd back
node src/scripts/seedProperties.js
```

### Resultado Esperado

```
🌱 Iniciando seed de propriedades de teste...

✅ Usando usuário existente: admin@verdemar.com

📦 Criando propriedades de teste...

✅ Casa criado: "Casa Moderna com Vista para o Mar"
   💰 Preço: R$ 1.850.000
   📍 Local: Florianópolis, SC
   📐 Área: 250m² | 🛏️  4 quartos | 🚿 3 banheiros
   🖼️  Imagens: 4 fotos
   ⭐ Rating: 4.8 (12 avaliações)

... (mais 5 imóveis)

🎉 Seed concluído! 6 propriedades criadas com sucesso!
```

## 🔄 Limpar e Recriar

O script automaticamente remove propriedades de teste anteriores antes de criar novas.

Para evitar isso, comente estas linhas:

```javascript
// Linhas 186-191
await prisma.property.deleteMany({
  where: {
    title: {
      in: testProperties.map(p => p.title)
    }
  }
});
```

## 📊 Dados Incluídos

Cada imóvel possui:
- ✅ Título e descrição completos
- ✅ Localização (endereço, cidade, estado, coordenadas)
- ✅ Características (área, quartos, banheiros, hóspedes)
- ✅ Comodidades em JSON (piscina, academia, etc.)
- ✅ Múltiplas imagens
- ✅ Rating e contagem de avaliações
- ✅ Status de publicado e destaque

## 🖼️ Imagens Utilizadas

As imagens referenciadas estão em:
```
front/public/Teste/
  - Imóvel1.jpg
  - Imóvel2.jpg
  - Imóvel3.jpg
  - Imóvel4.jpg
  - Praia1.jpg
  - Praia2.jpg
  - Praia3.jpg
```

## 🎯 Próximos Passos

Após executar o seed:

1. **Testar no Frontend**
   ```bash
   cd front
   npm run dev
   ```

2. **Acessar Páginas**
   - Home: http://localhost:5173
   - Explorar: http://localhost:5173/explorar
   - Detalhes: http://localhost:5173/property/:id

3. **Testar Filtros**
   - Buscar por "Casa"
   - Filtrar por faixa de preço
   - Filtrar por cidade "Florianópolis"
   - Ordenar por preço

## 🐛 Troubleshooting

### Erro: "User not found"
O script cria automaticamente um usuário ADMIN se não existir.

### Erro: "Database connection failed"
Verifique se o banco de dados está rodando e a variável `DATABASE_URL` está correta no `.env`.

### Imagens não aparecem
Certifique-se de que as imagens estão na pasta `front/public/Teste/`.

## 📝 Notas

- Todos os imóveis são criados em **Florianópolis, SC**
- Todos estão marcados como **publicados** (`published: true`)
- 3 imóveis são **destaques** (`featured: true`)
- Cada imóvel tem avaliações e visualizações fictícias
- As coordenadas GPS são aproximadas da região de Florianópolis

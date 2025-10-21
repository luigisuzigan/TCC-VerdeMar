# 📋 Parâmetros dos Imóveis - VerdeMar

## 📖 Documentação Completa dos Campos do Modelo `Property`

Esta documentação detalha todos os parâmetros que cada imóvel possui no sistema VerdeMar.

---

## 🆔 Identificação e Propriedade

### `id` (String, UUID)
- **Descrição**: Identificador único do imóvel
- **Gerado automaticamente**: Sim (UUID v4)
- **Obrigatório**: Sim
- **Exemplo**: `"550e8400-e29b-41d4-a716-446655440000"`

### `userId` (String, UUID)
- **Descrição**: ID do usuário dono do imóvel
- **Obrigatório**: Sim
- **Relacionamento**: FK → `User.id`
- **Exemplo**: `"123e4567-e89b-12d3-a456-426614174000"`

---

## 📝 Informações Básicas

### `title` (String)
- **Descrição**: Título/nome do imóvel
- **Obrigatório**: Sim
- **Limite**: 1-120 caracteres
- **Exemplo**: `"Apartamento Luxuoso Vista Mar - 3 Quartos"`
- **Uso**: Exibido como título principal nos cards e página de detalhes

### `description` (String)
- **Descrição**: Descrição detalhada do imóvel
- **Obrigatório**: Não
- **Limite**: Até 800 caracteres
- **Exemplo**: `"Apartamento completamente mobiliado com vista panorâmica para o mar. Localizado em condomínio de alto padrão com academia, piscina e área gourmet."`
- **Uso**: Exibido na página de detalhes

### `category` (String) - **NOVO CAMPO**
- **Descrição**: Categoria principal do imóvel
- **Obrigatório**: Sim
- **Valores permitidos**:
  - `"Residencial"`
  - `"Comercial"`
  - `"Industrial"`
  - `"Terreno"`
  - `"Especial"`
- **Exemplo**: `"Residencial"`
- **Uso**: Filtro de primeiro nível (pasta/categoria)
- **Interface**: Dropdown/Select no formulário

### `type` (String)
- **Descrição**: Tipo específico do imóvel (subcategoria)
- **Obrigatório**: Sim
- **Padrão**: `"Apartamento"`
- **Valores permitidos por categoria**:

#### 🏠 Residenciais
  - `"Casa"`
  - `"Sobrado"`
  - `"Apartamento"`
  - `"Kitnet / Studio / Loft"`
  - `"Cobertura"`
  - `"Condomínio residencial"`
  - `"Chácara"`
  - `"Sítio / Fazenda"`

#### 🏢 Comerciais
  - `"Sala comercial / Escritório"`
  - `"Loja / Ponto comercial"`
  - `"Prédio comercial"`
  - `"Galpão comercial"`
  - `"Hotel / Pousada"`

#### 🏭 Industriais
  - `"Galpão industrial"`
  - `"Condomínio industrial"`
  - `"Terreno industrial"`
  - `"Fábrica / Armazém"`

#### 📍 Terrenos / Lotes
  - `"Terreno residencial"`
  - `"Terreno comercial"`
  - `"Terreno misto"`
  - `"Terreno rural"`
  - `"Terreno em condomínio"`

#### ⭐ Outros / Especiais
  - `"Loteamento"`
  - `"Área / Gleba"`
  - `"Empreendimento em construção"`
  - `"Imóvel de uso misto"`

- **Exemplo**: `"Apartamento"`
- **Uso**: Filtros de busca detalhados e categorização específica
- **Interface**: Dropdown dependente da `category` selecionada

### `style` (String, Opcional) - **NOVO CAMPO**
- **Descrição**: Estilo arquitetônico/construtivo do imóvel
- **Obrigatório**: Não
- **Valores sugeridos**:
  - `"Moderno"` - Arquitetura contemporânea, linhas retas, minimalista
  - `"Clássico"` - Arquitetura tradicional, elegante
  - `"Rústico"` - Madeira, pedras, estilo country/fazenda
  - `"Industrial"` - Concreto aparente, tijolo à vista, loft
  - `"Minimalista"` - Design clean, poucos detalhes
  - `"Colonial"` - Estilo português/brasileiro tradicional
  - `"Contemporâneo"` - Mix moderno com toques tradicionais
  - `"Tropical"` - Materiais naturais, integração com natureza
  - `"Container"` - Construção com containers marítimos
  - `"Steel Frame"` - Construção em estrutura metálica leve
  - `"Madeira"` - Predominância de madeira na estrutura
  - `"Sustentável"` - Eco-friendly, green building
  - `"Luxo"` - Alto padrão, acabamentos premium
  - `"Compacto"` - Otimizado para espaços pequenos
  - `"Loft"` - Pé-direito alto, espaços integrados
- **Exemplo**: `"Moderno"`
- **Uso**: Filtro visual no Home e página Explorar, diferencial do imóvel
- **Interface**: Select/Tags no formulário, cards visuais no Home

**Por que este campo é importante:**
- 🎨 **Marketing Visual**: Permite criar seção "Estilos em Destaque" no Home
- 🔍 **Diferenciação**: Cliente busca por preferência estética
- 📸 **Curadoria**: Facilita agrupar imóveis por estilo para campanhas
- ⭐ **Destaque**: Imóveis com estilos únicos (Container, Sustentável) ganham visibilidade

---

## 💰 Valores e Preços

### `price` (Float)
- **Descrição**: Preço do imóvel
- **Obrigatório**: Sim
- **Formato**: Número decimal (até 2 casas)
- **Mínimo**: 0
- **Exemplo**: `850000.00` (R$ 850.000,00)
- **Uso**: Exibido formatado, usado em filtros de faixa de preço

### `currency` (String)
- **Descrição**: Moeda do preço
- **Obrigatório**: Sim
- **Padrão**: `"BRL"`
- **Valores sugeridos**: `"BRL"`, `"USD"`, `"EUR"`
- **Exemplo**: `"BRL"`
- **Uso**: Formatação do preço na interface

---

## 💵 Valores Estimados e Custos Mensais (OPCIONAIS)

> **💡 Importante**: Estes campos são **totalmente opcionais** e devem ser preenchidos apenas se o proprietário/admin tiver essas informações. São úteis para dar ao comprador uma visão completa dos custos mensais do imóvel.

### `condoFee` (Float, Opcional)
- **Descrição**: Valor mensal do condomínio
- **Obrigatório**: Condicional (veja tabela de campos condicionais)
- **Formato**: Número decimal
- **Exemplo**: `450.00` (R$ 450,00/mês)
- **Uso**: Cálculo de custos totais mensais, filtros
- **Quando preencher**: Se o imóvel estiver em condomínio fechado
- **Aplicável para**: Apartamentos, Coberturas, Condomínios fechados, Salas comerciais em prédios
- **Não aplicável para**: Casas sem condomínio, Terrenos, Galpões

### `iptu` (Float, Opcional)
- **Descrição**: Valor **anual** do IPTU (Imposto Predial e Territorial Urbano)
- **Obrigatório**: Não
- **Formato**: Número decimal
- **Exemplo**: `1200.00` (R$ 1.200,00/ano → R$ 100,00/mês)
- **Uso**: Cálculo de custos mensais totais (divide por 12)
- **Quando preencher**: Se souber o valor do IPTU do imóvel
- **Aplicável para**: Todos os tipos de imóveis
- **Observação**: Valor é anual, mas exibido mensalmente (IPTU/12) na interface

### `homeInsurance` (Float, Opcional) - **NOVO CAMPO**
- **Descrição**: Valor mensal estimado do seguro residencial
- **Obrigatório**: Não
- **Formato**: Número decimal
- **Exemplo**: `80.00` (R$ 80,00/mês)
- **Uso**: Cálculo de custos mensais totais, transparência financeira
- **Quando preencher**: Se houver seguro ou valor estimado
- **Aplicável para**: Todos os tipos residenciais
- **Valores típicos**: R$ 50-200/mês (dependendo do valor do imóvel)
- **Observação**: Campo informativo, não obrigatório

### `monthlyCosts` (Float, Calculado Automaticamente) - **NOVO CAMPO**
- **Descrição**: Custo mensal total estimado (condoFee + iptu/12 + homeInsurance)
- **Obrigatório**: Não (calculado automaticamente)
- **Formato**: Número decimal
- **Exemplo**: `630.00` (R$ 450 + R$ 100 + R$ 80)
- **Cálculo**: `condoFee + (iptu / 12) + homeInsurance`
- **Uso**: Exibição de custo total mensal para o comprador
- **Quando exibir**: Se pelo menos um dos campos (condoFee, iptu, homeInsurance) estiver preenchido
- **Observação**: Campo calculado no backend ou frontend, não armazenado no banco

---

## 📍 Localização

### `address` (String)
- **Descrição**: Endereço completo (rua, número, complemento)
- **Obrigatório**: Sim (padrão: `""`)
- **Exemplo**: `"Rua das Flores, 123, Apto 501"`
- **Uso**: Exibido na página de detalhes
- **Observação**: Pode ser ocultado por privacidade até contato

### `city` (String)
- **Descrição**: Cidade do imóvel
- **Obrigatório**: Sim
- **Exemplo**: `"Florianópolis"`
- **Uso**: **Filtros de busca** (campo principal de localização), exibição
- **Indexado**: Sim (para performance)

### `state` (String)
- **Descrição**: Estado/UF do imóvel
- **Obrigatório**: Sim 
- **Exemplo**: `"Santa Catarina"` ou `"SC"`
- **Uso**: Filtros avançados, breadcrumb
- **Sugestão**: Usar sigla (2 letras) para padronização

### `country` (String)
- **Descrição**: País do imóvel
- **Obrigatório**: Sim
- **Exemplo**: `"Brasil"`
- **Uso**: Filtros internacionais (futuro), exibição
- **Sugestão**: Padronizar em português

### `neighborhood` (String, Opcional)
- **Descrição**: Bairro do imóvel
- **Obrigatório**: Não
- **Exemplo**: `"Lagoa da Conceição"`
- **Uso**: Filtros de localização mais específicos, exibição nos cards
- **Observação**: Campo importante para busca por região

### `zipCode` (String, Opcional)
- **Descrição**: CEP do imóvel
- **Obrigatório**: Sim
- **Formato**: `"XXXXX-XXX"` (Brasil) ou sem máscara
- **Exemplo**: `"88015-000"` ou `"88015000"`
- **Uso**: Busca de endereço via API, cálculo de distâncias

### `latitude` (Float, Opcional)
- **Descrição**: Coordenada de latitude para exibição no mapa
- **Obrigatório**: Sim (recomendado para mapa)
- **Formato**: Decimal (-90 a +90)
- **Exemplo**: `-27.5954`
- **Uso**: **Exibição no mapa**, filtro por área geográfica

### `longitude` (Float, Opcional)
- **Descrição**: Coordenada de longitude para exibição no mapa
- **Obrigatório**: Sim (recomendado para mapa)
- **Formato**: Decimal (-180 a +180)
- **Exemplo**: `-48.5480`
- **Uso**: **Exibição no mapa**, filtro por área geográfica

> **⚠️ IMPORTANTE**: Para o imóvel aparecer no mapa, `latitude` e `longitude` devem estar preenchidos!

---

## 🏗️ Características do Imóvel

> **⚠️ IMPORTANTE**: Os campos abaixo têm obrigatoriedade **condicional** baseada no `type` do imóvel. Veja a seção "Campos Condicionais por Tipo" no final deste documento.

### `area` (Int)
- **Descrição**: Área total do imóvel em metros quadrados (m²)
- **Obrigatório**: Sim (para todos os tipos)
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `120` (120 m²)
- **Uso**: Filtros de área (min/max), exibição
- **Observação**: Área útil ou total conforme padrão local

### `beds` (Int)
- **Descrição**: Número de quartos/dormitórios
- **Obrigatório**: Condicional (veja tabela abaixo)
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `3` (3 quartos)
- **Uso**: Filtros de quartos, ícone na listagem
- **Valores comuns**: 0 (studio), 1, 2, 3, 4, 5+
- **Não aplicável para**: Terrenos, Salas comerciais, Galpões

### `baths` (Int)
- **Descrição**: Número de banheiros
- **Obrigatório**: Condicional (veja tabela abaixo)
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `2` (2 banheiros)
- **Uso**: Filtros de banheiros, ícone na listagem
- **Observação**: Inclui lavabos
- **Não aplicável para**: Terrenos

### `suites` (Int)
- **Descrição**: Número de suítes (quartos com banheiro privativo)
- **Obrigatório**: Não (opcional)
- **Formato**: Número inteiro
- **Padrão**: `0`
- **Mínimo**: 0
- **Exemplo**: `1` (1 suíte)
- **Uso**: Filtros de suítes, diferencial do imóvel
- **Observação**: Suítes já estão incluídas em `beds`
- **Não aplicável para**: Terrenos, Salas comerciais, Galpões, Kitnets

### `parkingSpaces` (Int)
- **Descrição**: Número de vagas de garagem/estacionamento
- **Obrigatório**: Condicional (veja tabela abaixo)
- **Formato**: Número inteiro
- **Padrão**: `0`
- **Mínimo**: 0
- **Exemplo**: `2` (2 vagas)
- **Uso**: Filtros de vagas, ícone na listagem
- **Observação**: Vagas cobertas e descobertas somadas

---

## 🏢 Campos Específicos de Condomínio e Estrutura

### `floor` (Int, Opcional)
- **Descrição**: Andar do imóvel (para imóveis verticais)
- **Obrigatório**: Condicional (veja tabela abaixo)
- **Formato**: Número inteiro
- **Exemplo**: `7` (7º andar)
- **Uso**: Filtros, preferências de localização no prédio
- **Aplicável para**: Apartamentos, Coberturas, Salas comerciais em prédios
- **Não aplicável para**: Casas, Sobrados, Terrenos, Galpões

### `totalFloors` (Int, Opcional)
- **Descrição**: Total de andares do prédio (ou da casa, para sobrados)
- **Obrigatório**: Condicional (veja tabela abaixo)
- **Formato**: Número inteiro
- **Exemplo**: `12` (prédio de 12 andares)
- **Uso**: Contexto da posição do imóvel
- **Aplicável para**: Apartamentos, Coberturas, Condomínios, Salas comerciais em prédios
- **Para Sobrados**: Representa número de andares da própria casa (ex: 2 andares)

### `yearBuilt` (Int, Opcional)
- **Descrição**: Ano de construção do imóvel
- **Obrigatório**: Não
- **Formato**: Número inteiro (4 dígitos)
- **Exemplo**: `2018`
- **Uso**: Filtros de idade, avaliação de conservação
- **Aplicável para**: Todos os tipos

### `propertyCondition` (Enum, Opcional)
- **Descrição**: Estado de conservação do imóvel
- **Obrigatório**: Não
- **Valores**: `"Novo"`, `"Seminovo"`, `"Usado"`, `"Reformado"`
- **Exemplo**: `"Novo"`
- **Uso**: Filtros de condição, expectativa de manutenção
- **Aplicável para**: Todos os tipos exceto Terrenos

### `lotSize` (Int, Opcional) - **NOVO CAMPO**
- **Descrição**: Área total do terreno/lote em metros quadrados
- **Obrigatório**: Não
- **Formato**: Número inteiro
- **Exemplo**: `500` (500 m² de terreno)
- **Uso**: Importante para casas, sobrados, chácaras, terrenos
- **Quando usar**: 
  - **Casas/Sobrados**: Área do lote (diferente da área construída)
  - **Terrenos**: Igual ao campo `area`
  - **Apartamentos**: Não aplicável (deixar `null`)
- **Aplicável para**: Casas, Sobrados, Chácaras, Sítios, Fazendas, Terrenos
- **Não aplicável para**: Apartamentos, Coberturas, Kitnets, Salas comerciais
- **Observação**: Para terrenos, `lotSize` = `area`. Para casas, `lotSize` >= `area`

---

## 🛋️ Comodidades e Amenidades

### `amenities` (String - JSON Array)
- **Formato**: Array JSON | **Exemplo**: `["Piscina", "WiFi", "2 Vagas"]`

**🏊 Lazer:** Piscina • Piscina Aquecida • Hidromassagem/Jacuzzi • Academia • Sauna • Spa • Churrasqueira • Área Gourmet • Forno Pizza • Jardim • Varanda • Sacada • Terraço • Deck • Gazebo • Quadra Poliesportiva • Quadra Tênis • Campo Futebol • Playground • Salão Jogos • Salão Festas • Cinema/Home Theater • Brinquedoteca

**🌐 Tecnologia:** WiFi • Fibra Óptica • TV Cabo • Smart TV • Som Integrado • Automação • Interfone • Vídeo Porteiro • Portão Eletrônico

**❄️ Climatização:** Ar-condicionado • AC Central • AC Split • Aquecedor • Aquecedor Gás • Aquecedor Solar • Ventilador Teto • Lareira • Lareira Lenha • Lareira Gás

**🚗 Garagem:** Garagem Coberta • Garagem Descoberta • 1 Vaga • 2 Vagas • 3 Vagas • 4+ Vagas • Vaga Visitantes • Carregador Elétrico

**🍳 Cozinha:** Cozinha Equipada • Cozinha Planejada • Cozinha Gourmet • Ilha/Bancada • Geladeira • Freezer • Fogão • Cooktop • Forno Elétrico • Forno Gás • Micro-ondas • Lava-louças • Máquina Lavar • Máquina Secar • Adega • Coifa • Purificador Água

**🔒 Segurança:** Portaria 24h • Segurança 24h • Câmeras • CFTV • Alarme • Cerca Elétrica • Muros Altos • Grades • Porta Blindada • Cofre

**♿ Acessibilidade:** Elevador • Elevador Social • Elevador Serviço • Acessível Cadeirantes • Rampa • Banheiro Adaptado • Corrimãos

**🐕 Pets:** Aceita Pets • Aceita Cães • Aceita Gatos • Pet Place • Playground Infantil • Área Kids

**🏢 Condomínio:** Salão Festas • Academia • Piscina • Coworking • Bicicletário • Lavanderia • Depósito • Zelador

**🌊 Utilidades:** Caixa d'água • Cisterna • Aquecimento Solar • Bomba • Gerador • Energia Solar

**🛏️ Quartos:** Suíte Master • Closet • Banheira • Box Blindex • Ducha • Armários Embutidos • Guarda-roupas

**🏠 Acabamentos:** Pé-direito Alto • Piso Frio • Piso Laminado • Piso Madeira • Porcelanato • Gesso/Sancas • Molduras • Papel Parede • Pintura Nova

> **💡 Sugestão**: Criar categorias de amenidades para melhor organização
- `"Automação Residencial / Smart Home"`
- `"Interfone"`
- `"Vídeo Porteiro"`
- `"Portão Eletrônico"`

#### ❄️ Climatização
- `"Ar-condicionado"`
- `"Ar-condicionado Central"`
- `"Ar-condicionado Split"`
- `"Aquecedor"`
- `"Aquecedor a Gás"`
- `"Aquecedor Solar"`
- `"Ventilador de Teto"`
- `"Lareira"`
- `"Lareira a Lenha"`
- `"Lareira a Gás"`

#### 🚗 Estacionamento e Garagem
- `"Garagem Coberta"`
- `"Garagem Descoberta"`
- `"1 Vaga"`
- `"2 Vagas"`
- `"3 Vagas"`
- `"4+ Vagas"`
- `"Vaga para Visitantes"`
- `"Carregador para Carro Elétrico"`

#### � Cozinha e Eletrodomésticos
- `"Cozinha Equipada"`
- `"Cozinha Planejada"`
- `"Cozinha Gourmet"`
- `"Ilha / Bancada Americana"`
- `"Geladeira"`
- `"Freezer"`
- `"Fogão"`
- `"Cooktop"`
- `"Forno Elétrico"`
- `"Forno a Gás"`
- `"Micro-ondas"`
- `"Lava-louças"`
- `"Máquina de Lavar Roupa"`
- `"Máquina de Secar Roupa"`
- `"Adega Climatizada"`
- `"Coifa / Depurador"`
- `"Purificador de Água"`
- `"Filtro de Água"`

#### 🔒 Segurança
- `"Portaria 24h"`
- `"Segurança 24h"`
- `"Câmeras de Segurança"`
- `"Circuito Fechado de TV (CFTV)"`
- `"Alarme"`
- `"Cerca Elétrica"`
- `"Muros Altos"`
- `"Grades nas Janelas"`
- `"Porta Blindada"`
- `"Cofre"`

#### ♿ Acessibilidade
- `"Elevador"`
- `"Elevador Social"`
- `"Elevador de Serviço"`
- `"Acessível para Cadeirantes"`
- `"Rampa de Acesso"`
- `"Banheiro Adaptado"`
- `"Corrimãos"`

#### 🐕 Pets e Família
- `"Aceita Pets"`
- `"Aceita Cães"`
- `"Aceita Gatos"`
- `"Pet Place / Área para Pets"`
- `"Playground Infantil"`
- `"Área Kids"`

#### 🏢 Condomínio e Infraestrutura
- `"Salão de Festas do Condomínio"`
- `"Academia do Condomínio"`
- `"Piscina do Condomínio"`
- `"Espaço Coworking"`
- `"Bicicletário"`
- `"Lavanderia Coletiva"`
- `"Depósito / Closet Privativo"`
- `"Zelador / Síndico"`

#### 🌊 Água e Utilidades
- `"Caixa d'água"`
- `"Cisterna"`
- `"Aquecimento Solar"`
- `"Bomba d'água"`
- `"Gerador"`
- `"Energia Solar / Painéis Fotovoltaicos"`

#### 🛏️ Quartos e Banheiros
- `"Suíte Master"`
- `"Closet"`
- `"Banheira"`
- `"Box Blindex"`
- `"Ducha"`
- `"Armários Embutidos"`
- `"Guarda-roupas Embutido"`

#### 🏠 Estrutura e Acabamentos
- `"Pé-direito Alto"`
- `"Piso Frio"`
- `"Piso Laminado"`
- `"Piso de Madeira"`
- `"Piso Porcelanato"`
- `"Gesso / Sancas"`
- `"Molduras / Rodatetos"`
- `"Papel de Parede"`
- `"Pintura Nova"`

---

## 🌤️ Condições Naturais e Características Ambientais

### `naturalConditions` (String - JSON Array) - **NOVO CAMPO**
- **Descrição**: Condições naturais e características ambientais do imóvel
- **Obrigatório**: Não (padrão: `"[]"`)
- **Formato**: Array JSON stringificado
- **Exemplo**: `'["Vista para o mar", "Ventilação cruzada", "Sol da manhã", "Brisa marítima"]'`
- **Uso**: Destaque de diferenciais naturais, conforto e bem-estar

#### 🌊 Vista e Localização
- `"Vista para o mar"`
- `"Vista panorâmica do mar"`
- `"Frente para o mar"`
- `"Pé na areia"`
- `"Vista para a praia"`
- `"Vista para a montanha"`
- `"Vista para o lago"`
- `"Vista para o rio"`
- `"Vista para a cidade"`
- `"Vista para a natureza"`
- `"Vista para o verde"`
- `"Vista para o parque"`
- `"Vista desobstruída"`
- `"Vista privilegiada"`

#### 💨 Ventilação e Circulação de Ar
- `"Ventilação natural"`
- `"Ventilação cruzada"`
- `"Brisa marítima"`
- `"Brisa constante"`
- `"Circulação de ar excelente"`
- `"Ambientes arejados"`
- `"Janelas amplas"`
- `"Portas de vidro"`

#### ☀️ Iluminação e Orientação Solar
- `"Sol da manhã"`
- `"Sol da tarde"`
- `"Sol o dia todo"`
- `"Muito sol"`
- `"Iluminação natural abundante"`
- `"Claridade natural"`
- `"Face norte"` (mais sol no Brasil)
- `"Face sul"` (mais sombra)
- `"Face leste"` (sol da manhã)
- `"Face oeste"` (sol da tarde)
- `"Claraboias / Luz zenital"`

#### 🌡️ Clima e Conforto Térmico
- `"Clima ameno"`
- `"Clima tropical"`
- `"Temperatura agradável"`
- `"Fresco no verão"`
- `"Quente no inverno"`
- `"Sombra natural de árvores"`
- `"Microclima agradável"`

#### 🌳 Natureza e Meio Ambiente
- `"Área verde"`
- `"Arborizado"`
- `"Jardim natural"`
- `"Mata nativa"`
- `"Árvores frutíferas"`
- `"Pomar"`
- `"Horta"`
- `"Contato com a natureza"`
- `"Fauna local"`
- `"Pássaros"`
- `"Borboletas"`
- `"Ecossistema preservado"`

#### 🏞️ Topografia e Terreno
- `"Terreno plano"`
- `"Terreno em declive"`
- `"Terreno em aclive"`
- `"Elevado / Ponto alto"`
- `"Vista de cima"`
- `"Solo firme"`
- `"Solo drenado"`

#### 🌅 Características Especiais
- `"Nascer do sol"`
- `"Pôr do sol"`
- `"Céu estrelado"`
- `"Noite tranquila"`
- `"Silêncio / Ambiente calmo"`
- `"Privacidade"`
- `"Área isolada"`
- `"Exclusividade"`

#### 🏖️ Proximidade com Praia (para imóveis à beira-mar)
- `"A 50m da praia"`
- `"A 100m da praia"`
- `"A 200m da praia"`
- `"A 500m da praia"`
- `"Caminhada até a praia"`
- `"Acesso direto à praia"`
- `"Praia privativa"`
- `"Som das ondas"`

#### 💧 Água e Recursos Naturais
- `"Água de nascente"`
- `"Poço artesiano"`
- `"Rio próximo"`
- `"Córrego"`
- `"Cachoeira próxima"`
- `"Lagos naturais"`

#### � Proximidade à Natureza
- `"Próximo a lago"`
- `"Próximo a lagoa"`
- `"Próximo a praça"`
- `"Próximo a parque"`
- `"Próximo a trilha"`
- `"Próximo a reserva ambiental"`
- `"Próximo a área de preservação"`
- `"Próximo a bosque"`
- `"Próximo a mata atlântica"`
- `"Próximo a serra"`
- `"Próximo a montanha"`
- `"Próximo a rio"`
- `"Próximo a praia"`
- `"Próximo a cachoeira"`
- `"Vista para área verde"`
- `"Rua arborizada"`
- `"Bairro com praças"`
- `"Ciclovia próxima"`
- `"Calçadão à beira-mar"`
- `"Orla próxima"`

#### �🌿 Sustentabilidade e Ecologia
- `"Casa sustentável"`
- `"Bioconstrução"`
- `"Materiais naturais"`
- `"Captação de água da chuva"`
- `"Compostagem"`
- `"Fossa ecológica"`
- `"Biodigestor"`
- `"Energia renovável"`
- `"Baixo impacto ambiental"`

---

## 📸 Mídia

### `images` (String - JSON Array)
- **Descrição**: Array de URLs das imagens do imóvel
- **Obrigatório**: Sim
- **Formato**: Array JSON stringificado
- **Exemplo**: `'["https://exemplo.com/img1.jpg", "https://exemplo.com/img2.jpg", "https://exemplo.com/img3.jpg"]'`
- **Uso**: Galeria de fotos, carrossel
- **Recomendações**:
  - Mínimo: 3 fotos
  - Ideal: 8-15 fotos
  - Formatos: JPG, PNG, WebP
  - Tamanho: Até 2MB por imagem
  - Resolução: Mínimo 1200x800px

### `mainImage` (String, Opcional)
- **Descrição**: URL da imagem principal/capa do imóvel
- **Obrigatório**: Não (pode usar primeira de `images`)
- **Formato**: URL completa
- **Exemplo**: `"https://exemplo.com/capa.jpg"`
- **Uso**: Thumbnail nos cards da listagem
- **Recomendação**: Imagem mais atrativa, com boa iluminação

---

## 📊 Métricas e Estatísticas

### `rating` (Float, Opcional)
- **Descrição**: Avaliação do imóvel feita por especialista
- **Obrigatório**: Não (padrão: `0`)
- **Formato**: Decimal (0.0 a 10.0)
- **Exemplo**: `8.5`
- **Uso**: Nota de qualidade do imóvel, ordenação por avaliação
- **Quem avalia**: Especialista/Corretor certificado
- **Critérios**: Localização, estado de conservação, infraestrutura, acabamentos, potencial de valorização

---

## ⚙️ Status e Controle

### `published` (Boolean)
- **Descrição**: Se o imóvel está publicado/visível
- **Obrigatório**: Sim
- **Padrão**: `false`
- **Valores**: `true` ou `false`
- **Uso**: Filtro principal (só mostra se `published = true`)
- **Observação**: Rascunhos ficam com `false`

---

## 🕒 Datas de Controle

### `createdAt` (DateTime)
- **Descrição**: Data/hora de criação do imóvel
- **Obrigatório**: Sim (gerado automaticamente)
- **Padrão**: Data/hora atual
- **Exemplo**: `"2025-10-17T14:30:00.000Z"`
- **Uso**: Ordenação "Mais Recentes", histórico

### `updatedAt` (DateTime)
- **Descrição**: Data/hora da última atualização
- **Obrigatório**: Sim (atualizado automaticamente)
- **Padrão**: Data/hora atual
- **Exemplo**: `"2025-10-17T15:45:00.000Z"`
- **Uso**: Auditoria, cache invalidation

---

## 🔗 Relacionamentos

### `user` (Relação → User)
- **Descrição**: Dono/anunciante do imóvel
- **Tipo**: Many-to-One (muitos imóveis para um usuário)
- **Cascade**: Deleta imóveis se usuário for deletado

### `favorites` (Relação → Favorite[])
- **Descrição**: Favoritos deste imóvel
- **Tipo**: One-to-Many (um imóvel tem muitos favoritos)

### `reviews` (Relação → Review[])
- **Descrição**: Avaliações deste imóvel
- **Tipo**: One-to-Many (um imóvel tem muitas avaliações)

---

## �️ Informações de Proximidade (Google Maps API) - **NOVA SEÇÃO**

### `nearbyPlaces` (String - JSON Object) - **NOVO CAMPO**
- **Descrição**: Informações REAIS sobre locais próximos obtidas via Google Maps Places API
- **Obrigatório**: Não (padrão: `"{}"`)
- **Formato**: Objeto JSON stringificado com locais reais do Google Maps
- **Fonte de Dados**: Google Maps Places API (Nearby Search)
- **Atualização**: Calculado automaticamente quando imóvel é cadastrado/editado
- **Raio de Busca**: Configurável (padrão: 2km)

**Exemplo**:
```json
{
  "schools": [
    {
      "placeId": "ChIJ...",
      "name": "Escola Municipal João da Silva",
      "distance": 487,
      "distanceText": "487m",
      "lat": -27.5984,
      "lng": -48.5484,
      "rating": 4.2,
      "types": ["school", "point_of_interest"]
    }
  ],
  "supermarkets": [
    {
      "placeId": "ChIJ...",
      "name": "Supermercado Angeloni",
      "distance": 320,
      "distanceText": "320m",
      "lat": -27.5994,
      "lng": -48.5494,
      "rating": 4.5,
      "types": ["supermarket", "food", "store"]
    }
  ],
  "hospitals": [],
  "pharmacies": [],
  "banks": [],
  "restaurants": [],
  "transit_stations": [],
  "parks": []
}
```

**Implementação Técnica**:

1. **Backend** - Criar serviço `src/services/nearbyPlacesService.js`:
```javascript
// Usa Google Maps Places API (Nearby Search)
// https://developers.google.com/maps/documentation/places/web-service/search-nearby

async function fetchNearbyPlaces(lat, lng, radius = 2000) {
  const categories = {
    schools: 'school',
    supermarkets: 'supermarket',
    hospitals: 'hospital',
    pharmacies: 'pharmacy',
    banks: 'bank',
    restaurants: 'restaurant',
    transit_stations: 'transit_station',
    parks: 'park'
  };
  
  // Para cada categoria, buscar os 5 mais próximos
  // Calcular distância real entre coordenadas
  // Retornar JSON organizado
}
```

2. **Frontend** - Exibir no PropertyDetails:
   - Seção "📍 O que há por perto"
   - Mapa interativo mostrando imóvel + locais próximos
   - Lista com distância e rating de cada local
   - Filtros por categoria (Escolas, Supermercados, etc.)

3. **Admin Panel** - Ao cadastrar imóvel:
   - Após informar latitude/longitude
   - Botão "Buscar locais próximos" → chama API
   - Preview dos locais encontrados
   - Salva automaticamente no campo `nearbyPlaces`

**Categorias Google Maps Places API**:
- `school` - Escolas
- `supermarket` - Supermercados
- `hospital` - Hospitais
- `pharmacy` - Farmácias
- `bank` - Bancos
- `restaurant` - Restaurantes
- `transit_station` - Transporte público
- `park` - Parques
- `shopping_mall` - Shopping centers
- `gym` - Academias

---

## 📋 Campos Condicionais por Tipo de Imóvel

Esta tabela define quais campos são **obrigatórios**, **opcionais** ou **não aplicáveis** para cada tipo de imóvel:

| Tipo de Imóvel | `beds` | `baths` | `suites` | `parkingSpaces` | `floor` | `totalFloors` | `condoFee` | `lotSize` | `homeInsurance` |
|----------------|:------:|:-------:|:--------:|:---------------:|:-------:|:-------------:|:----------:|:---------:|:---------------:|
| **🏢 Apartamento** | ✅ Obrig. | ✅ Obrig. | ⚠️ Opc. | ✅ Obrig. | ✅ Obrig. | ✅ Obrig. | ✅ Obrig. | ❌ N/A | ⚠️ Opc. |
| **🏠 Casa** | ✅ Obrig. | ✅ Obrig. | ⚠️ Opc. | ✅ Obrig. | ❌ N/A | ❌ N/A | ⚠️ Opc.* | ✅ Obrig. | ⚠️ Opc. |
| **🏘️ Sobrado** | ✅ Obrig. | ✅ Obrig. | ⚠️ Opc. | ✅ Obrig. | ❌ N/A | ⚠️ Opc.** | ⚠️ Opc.* | ✅ Obrig. | ⚠️ Opc. |
| **🏖️ Cobertura** | ✅ Obrig. | ✅ Obrig. | ⚠️ Opc. | ✅ Obrig. | ✅ Obrig. | ✅ Obrig. | ✅ Obrig. | ❌ N/A | ⚠️ Opc. |
| **📦 Kitnet/Studio/Loft** | ⚠️ Opc.*** | ✅ Obrig. | ❌ N/A | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ❌ N/A | ⚠️ Opc. |
| **🏘️ Condomínio residencial** | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ❌ N/A | ✅ Obrig. | ✅ Obrig. | ⚠️ Opc. | ⚠️ Opc. |
| **🌳 Chácara/Sítio/Fazenda** | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ❌ N/A | ❌ N/A | ❌ N/A | ✅ Obrig. | ⚠️ Opc. |
| **📍 Terreno (qualquer tipo)** | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A | ⚠️ Opc.**** | ✅ Obrig. | ❌ N/A |
| **🏢 Sala comercial/Escritório** | ❌ N/A | ⚠️ Opc. | ❌ N/A | ✅ Obrig. | ✅ Obrig. | ✅ Obrig. | ✅ Obrig. | ❌ N/A | ⚠️ Opc. |
| **🏪 Loja/Ponto comercial** | ❌ N/A | ⚠️ Opc. | ❌ N/A | ✅ Obrig. | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. | ⚠️ Opc. |
| **🏭 Galpão (ind./com.)** | ❌ N/A | ⚠️ Opc. | ❌ N/A | ✅ Obrig. | ❌ N/A | ❌ N/A | ❌ N/A | ✅ Obrig. | ⚠️ Opc. |
| **🏢 Prédio comercial** | ❌ N/A | ⚠️ Opc. | ❌ N/A | ✅ Obrig. | ❌ N/A | ✅ Obrig. | ❌ N/A | ⚠️ Opc. | ⚠️ Opc. |

**Legenda:**
- ✅ **Obrigatório**: Campo deve ser preenchido
- ⚠️ **Opcional**: Campo pode ser preenchido se aplicável
- ❌ **N/A (Não aplicável)**: Campo não deve ser exibido/preenchido

**Notas:**
- `*` **condoFee em Casas/Sobrados**: Obrigatório apenas se em condomínio fechado
- `**` **totalFloors em Sobrados**: Representa o número de andares da própria casa (ex: sobrado de 2 andares)
- `***` **beds em Kitnet/Studio**: Geralmente 0 ou 1
- `****` **condoFee em Terrenos**: Apenas se for "Terreno em condomínio"

**Campos Financeiros (Sempre Opcionais):**
- `iptu`: Opcional para todos os tipos
- `homeInsurance`: Opcional para tipos residenciais e comerciais (N/A para terrenos)

---

## 🎯 Regras de Validação Recomendadas

### **No Formulário de Cadastro/Edição:**

1. **Campos Dinâmicos**: Mostrar/ocultar campos baseado no `type` selecionado
2. **Validação em Tempo Real**: Validar obrigatoriedade ao mudar o tipo
3. **Mensagens Contextuais**: Ex: "Este campo não é aplicável para Terrenos"
4. **Valores Padrão**: Campos N/A devem ser `null` ou `0` no banco

### **Exemplos de Validação:**

```javascript
// Exemplo: Apartamento DEVE ter floor e condoFee
if (type === 'Apartamento') {
  if (!floor) errors.push('Andar é obrigatório para Apartamentos');
  if (!condoFee) errors.push('Valor do condomínio é obrigatório para Apartamentos');
}

// Exemplo: Casa NÃO deve ter floor
if (type === 'Casa' && floor !== null) {
  warnings.push('Campo "Andar" não se aplica a Casas');
}

// Exemplo: Terreno NÃO deve ter beds/baths
if (type.includes('Terreno')) {
  if (beds || baths || suites) {
    errors.push('Terrenos não devem ter quartos ou banheiros');
  }
}
```

---

## 💡 Campos Sugeridos para Implementação Futura

### **Campos adicionais que podem melhorar a plataforma:**

1. **`orientation` (String)** - Orientação solar
   - Valores: `"Norte"`, `"Sul"`, `"Leste"`, `"Oeste"`, `"Nordeste"`, `"Noroeste"`, `"Sudeste"`, `"Sudoeste"`
   - Relevante para: Apartamentos, Casas, Sobrados
   - Uso: Conforto térmico, iluminação natural

2. **`furnished` (Boolean)** - Imóvel mobiliado
   - Valores: `true` (mobiliado) ou `false` (sem móveis)
   - Relevante para: Todos os tipos residenciais
   - Uso: Filtro importante para inquilinos

3. **`hasElevator` (Boolean)** - Possui elevador
   - Relevante para: Apartamentos, Coberturas, Salas comerciais
   - Uso: Acessibilidade, conforto

4. **`petFriendly` (Boolean)** - Aceita animais de estimação
   - Relevante para: Todos os residenciais
   - Uso: Filtro crucial para proprietários de pets

5. **`ceilingHeight` (Float)** - Pé-direito em metros
   - Relevante para: Lofts, Galpões, Salas comerciais
   - Uso: Diferencial, requisito técnico (galpões)

6. **`hasLoadingDock` (Boolean)** - Possui doca de carga
   - Relevante para: Galpões, Lojas, Pontos comerciais
   - Uso: Requisito logístico

7. **`energyRating` (String)** - Classificação energética
   - Valores: `"A"`, `"B"`, `"C"`, `"D"`, `"E"`
   - Relevante para: Todos os tipos
   - Uso: Sustentabilidade, economia

8. **`hasSecuritySystem` (Boolean)** - Sistema de segurança
   - Relevante para: Todos os tipos
   - Uso: Diferencial de segurança

---

## 📊 Exemplo de Imóvel Completo (JSON)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  
  "title": "Apartamento Luxuoso Vista Mar - 3 Quartos",
  "description": "Apartamento completamente mobiliado com vista panorâmica para o mar. Localizado em condomínio de alto padrão com academia, piscina e área gourmet.",
  "category": "Residencial",
  "type": "Apartamento",
  "style": "Moderno",
  "price": 850000.00,
  "currency": "BRL",
  
  "address": "Rua das Flores, 123, Apto 501",
  "city": "Florianópolis",
  "state": "SC",
  "country": "Brasil",
  "neighborhood": "Lagoa da Conceição",
  "zipCode": "88015-000",
  "latitude": -27.5954,
  "longitude": -48.5480,
  
  "area": 120,
  "beds": 3,
  "baths": 2,
  "suites": 1,
  "parkingSpaces": 2,
  
  "condoFee": 450.00,
  "iptu": 1200.00,
  "homeInsurance": 95.00,
  "floor": 5,
  "totalFloors": 12,
  "lotSize": null,
  "yearBuilt": 2020,
  "propertyCondition": "Seminovo",
  
  "amenities": "[\"Piscina\", \"WiFi\", \"Ar-condicionado\", \"Churrasqueira\", \"Varanda\", \"Portaria 24h\"]",
  "naturalConditions": "[\"Vista para o mar\", \"Ventilação cruzada\", \"Sol da manhã\", \"Brisa marítima\"]",
  
  "images": "[\"https://exemplo.com/img1.jpg\", \"https://exemplo.com/img2.jpg\", \"https://exemplo.com/img3.jpg\"]",
  "mainImage": "https://exemplo.com/capa.jpg",
  
  "rating": 8.5,
  "viewCount": 154,
  
  "published": true,
  
  "createdAt": "2025-10-17T14:30:00.000Z",
  "updatedAt": "2025-10-17T15:45:00.000Z"
}
```

### 💰 Exemplo de Cálculo de Custos Mensais

Para o imóvel acima, o custo mensal total seria:

```javascript
const monthlyCosts = (condoFee || 0) + ((iptu || 0) / 12) + (homeInsurance || 0);
// monthlyCosts = 450.00 + (1200.00 / 12) + 95.00
// monthlyCosts = 450.00 + 100.00 + 95.00
// monthlyCosts = R$ 645,00/mês
```

**Observações:**
- `iptu` é anual, então dividimos por 12 para obter o valor mensal
- `condoFee` e `homeInsurance` já são valores mensais
- Se algum campo for `null`, use `0` no cálculo
- Exiba apenas se pelo menos um dos valores existir

---

## 🎯 Próximos Passos para Implementação

### ✅ **Já Implementado:**
1. ✅ **Campos novos adicionados**: `category`, `neighborhood`, `suites`, `parkingSpaces`, `condoFee`, `iptu`, `floor`, `totalFloors`, `yearBuilt`, `propertyCondition`
2. ✅ **Campos removidos**: `featured`, `reviewCount`, `guests`
3. ✅ **Rating atualizado**: Sistema 0-10 (avaliação de especialista)
4. ✅ **Schema Prisma atualizado**: Todos os campos novos incluídos

### 🔄 **Pendente de Implementação:**

#### **Backend:**
1. 📝 **Criar arquivo de configuração**: `back/src/config/propertyFieldsConfig.js`
   - Definir campos obrigatórios/opcionais por tipo
   - Exportar função `getFieldsForPropertyType(type)`

2. 🔒 **Atualizar validações**: `back/src/properties/routes.js`
   - Validação condicional baseada no tipo
   - Retornar erros específicos por campo/tipo
   - Impedir campos N/A de serem salvos

3. �️ **Implementar Google Maps API**: `back/src/services/nearbyPlacesService.js`
   - Buscar locais próximos automaticamente
   - Salvar em `nearbyPlaces` (JSON)

#### **Frontend:**
1. 🎨 **Criar formulário dinâmico**: `front/src/pages/Admin/Properties/PropertyForm.jsx`
   - Mostrar/ocultar campos baseado no tipo selecionado
   - Marcar campos obrigatórios dinamicamente
   - Adicionar tooltips explicativos

2. 🔍 **Atualizar filtros**: `front/src/components/Explorar/TopFilters.jsx`
   - Filtros por `category`, `suites`, `parkingSpaces`, `neighborhood`
   - Filtros por `condoFee`, `floor`, `yearBuilt`

3. � **Atualizar detalhes do imóvel**: `front/src/pages/PropertyDetails/index.jsx`
   - Exibir campos condicionalmente (não mostrar "Andar" para casas)
   - Seção "Custos" (condoFee + IPTU)
   - Seção "Estrutura do Prédio" (floor, totalFloors)

4. 🗂️ **Criar helper de campos**: `front/src/utils/propertyFieldsHelper.js`
   - Função para determinar quais campos exibir
   - Sincronizar com config do backend

---

## 📝 Notas Importantes

- ⚠️ **Campos obrigatórios** devem sempre ser validados
- 🔍 **Campos indexados** (`city`, `published`) melhoram performance de busca
- 📍 **Latitude/Longitude** são essenciais para funcionalidade do mapa
- 🏷️ **Amenidades** devem ser padronizadas para facilitar filtros
- 💰 **Preço** deve ser armazenado sem formatação (apenas número)
- 📸 **Imagens** devem ter URLs válidas e acessíveis

---

## 🔧 Implementação Técnica Recomendada

### **Arquivo de Configuração (✅ CRIADO):**

**Localização**: `back/src/config/propertyFieldsConfig.js`

```javascript
// back/src/config/propertyFieldsConfig.js

export const REQUIRED_FIELDS = {
  'Apartamento': ['floor', 'totalFloors', 'condoFee', 'beds', 'baths', 'parkingSpaces'],
  'Casa': ['beds', 'baths', 'parkingSpaces'],
  'Terreno residencial': ['area'],
  // ... outros tipos
};

export const HIDDEN_FIELDS = {
  'Casa': ['floor', 'totalFloors'],
  'Terreno residencial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  // ... outros tipos
};

export function validatePropertyFields(type, data) {
  const required = REQUIRED_FIELDS[type] || [];
  const hidden = HIDDEN_FIELDS[type] || [];
  
  const errors = [];
  
  // Verificar campos obrigatórios
  required.forEach(field => {
    if (!data[field] && data[field] !== 0) {
      errors.push(`Campo "${field}" é obrigatório para ${type}`);
    }
  });
  
  // Verificar campos que não devem existir
  hidden.forEach(field => {
    if (data[field]) {
      errors.push(`Campo "${field}" não se aplica a ${type}`);
    }
  });
  
  return errors;
}
```

### **Validações no Backend (✅ IMPLEMENTADO):**

**Localização**: `back/src/properties/routes.js`

As rotas `POST /api/properties` e `PUT /api/properties/:id` agora validam campos condicionalmente baseado no `type`.

### **Helper do Frontend (✅ CRIADO):**

**Localização**: `front/src/utils/propertyFieldsHelper.js`

Funções disponíveis:
- `shouldShowField(type, field)` - Determina se campo deve ser exibido
- `isFieldRequired(type, field)` - Determina se campo é obrigatório
- `getPropertyDetailsFields(type, property)` - Retorna campos formatados para PropertyDetails
- `formatters` - Objeto com funções de formatação de valores
- `fieldLabels` - Labels descritivos para cada campo

---

## 🎨 Guia de Implementação: Painel Admin - Criar/Editar Imóveis

### **📋 Passo a Passo Completo**

#### **1. Criar estrutura de pastas (se não existir)**

```
front/src/pages/Admin/Properties/
├── PropertyForm.jsx          # Formulário principal
├── PropertyList.jsx          # Lista de imóveis
├── PropertyFormSteps.jsx     # Formulário multi-etapas (opcional)
└── index.jsx                 # Export principal
```

---

#### **2. Implementar PropertyForm.jsx com Campos Condicionais**

```jsx
import { useState, useEffect } from 'react';
import { shouldShowField, isFieldRequired, PROPERTY_TYPES_BY_CATEGORY } from '../../../utils/propertyFieldsHelper';

function PropertyForm({ property, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: property?.category || 'Residencial',
    type: property?.type || 'Casa',
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || '',
    // ... outros campos
  });

  const [selectedCategory, setSelectedCategory] = useState(property?.category || 'Residencial');
  const [selectedType, setSelectedType] = useState(property?.type || 'Casa');

  // Atualizar tipos disponíveis quando categoria mudar
  const availableTypes = PROPERTY_TYPES_BY_CATEGORY[selectedCategory] || [];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Resetar type para primeiro da nova categoria
    const firstType = PROPERTY_TYPES_BY_CATEGORY[category][0];
    setSelectedType(firstType);
    setFormData(prev => ({
      ...prev,
      category,
      type: firstType
    }));
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFormData(prev => ({ ...prev, type }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      
      {/* SEÇÃO 1: Categoria e Tipo */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">1. Categoria e Tipo</h3>
        
        {/* Categoria */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Categoria *</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Terreno">Terreno</option>
            <option value="Especial">Especial</option>
          </select>
        </div>

        {/* Tipo (dinâmico baseado na categoria) */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Tipo *</label>
          <select 
            value={selectedType} 
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            {availableTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SEÇÃO 2: Informações Básicas */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">2. Informações Básicas</h3>
        
        {/* Título */}
        <input 
          type="text"
          placeholder="Título do imóvel"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        
        {/* Preço */}
        <input 
          type="number"
          placeholder="Preço"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          required
        />
      </div>

      {/* SEÇÃO 3: Características (CONDICIONAIS) */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">3. Características</h3>
        
        {/* Área - sempre exibir */}
        <div className="mb-4">
          <label>Área (m²) {isFieldRequired(selectedType, 'area') && '*'}</label>
          <input 
            type="number"
            value={formData.area || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
            required={isFieldRequired(selectedType, 'area')}
          />
        </div>

        {/* Quartos - condicional */}
        {shouldShowField(selectedType, 'beds') && (
          <div className="mb-4">
            <label>Quartos {isFieldRequired(selectedType, 'beds') && '*'}</label>
            <input 
              type="number"
              value={formData.beds || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, beds: e.target.value }))}
              required={isFieldRequired(selectedType, 'beds')}
            />
          </div>
        )}

        {/* Banheiros - condicional */}
        {shouldShowField(selectedType, 'baths') && (
          <div className="mb-4">
            <label>Banheiros {isFieldRequired(selectedType, 'baths') && '*'}</label>
            <input 
              type="number"
              value={formData.baths || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, baths: e.target.value }))}
              required={isFieldRequired(selectedType, 'baths')}
            />
          </div>
        )}

        {/* Suítes - condicional */}
        {shouldShowField(selectedType, 'suites') && (
          <div className="mb-4">
            <label>Suítes {isFieldRequired(selectedType, 'suites') && '*'}</label>
            <input 
              type="number"
              value={formData.suites || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, suites: e.target.value }))}
              required={isFieldRequired(selectedType, 'suites')}
            />
          </div>
        )}

        {/* Vagas - condicional */}
        {shouldShowField(selectedType, 'parkingSpaces') && (
          <div className="mb-4">
            <label>Vagas de Garagem {isFieldRequired(selectedType, 'parkingSpaces') && '*'}</label>
            <input 
              type="number"
              value={formData.parkingSpaces || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, parkingSpaces: e.target.value }))}
              required={isFieldRequired(selectedType, 'parkingSpaces')}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 4: Estrutura do Prédio (CONDICIONAIS) */}
      {(shouldShowField(selectedType, 'floor') || shouldShowField(selectedType, 'totalFloors')) && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">4. Estrutura do Prédio</h3>
          
          {/* Andar - condicional */}
          {shouldShowField(selectedType, 'floor') && (
            <div className="mb-4">
              <label>Andar {isFieldRequired(selectedType, 'floor') && '*'}</label>
              <input 
                type="number"
                value={formData.floor || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                required={isFieldRequired(selectedType, 'floor')}
              />
            </div>
          )}

          {/* Total de Andares - condicional */}
          {shouldShowField(selectedType, 'totalFloors') && (
            <div className="mb-4">
              <label>Total de Andares {isFieldRequired(selectedType, 'totalFloors') && '*'}</label>
              <input 
                type="number"
                value={formData.totalFloors || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, totalFloors: e.target.value }))}
                required={isFieldRequired(selectedType, 'totalFloors')}
              />
            </div>
          )}
        </div>
      )}

      {/* SEÇÃO 5: Custos (CONDICIONAIS) */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">5. Custos</h3>
        
        {/* Condomínio - condicional */}
        {shouldShowField(selectedType, 'condoFee') && (
          <div className="mb-4">
            <label>Condomínio (R$/mês) {isFieldRequired(selectedType, 'condoFee') && '*'}</label>
            <input 
              type="number"
              step="0.01"
              value={formData.condoFee || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, condoFee: e.target.value }))}
              required={isFieldRequired(selectedType, 'condoFee')}
            />
          </div>
        )}

        {/* IPTU - sempre opcional */}
        <div className="mb-4">
          <label>IPTU (R$/ano)</label>
          <input 
            type="number"
            step="0.01"
            value={formData.iptu || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, iptu: e.target.value }))}
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-4">
        <button type="submit" className="btn-primary">Salvar</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}

export default PropertyForm;
```

---

#### **3. Mensagens de Validação Dinâmicas**

Adicionar feedback visual quando campos obrigatórios não são preenchidos:

```jsx
{shouldShowField(selectedType, 'beds') && (
  <div className="mb-4">
    <label>
      Quartos {isFieldRequired(selectedType, 'beds') && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="number"
      value={formData.beds || ''}
      onChange={(e) => setFormData(prev => ({ ...prev, beds: e.target.value }))}
      required={isFieldRequired(selectedType, 'beds')}
      className={`border ${errors.beds ? 'border-red-500' : 'border-gray-300'}`}
    />
    {errors.beds && <p className="text-red-500 text-sm mt-1">{errors.beds}</p>}
  </div>
)}
```

---

#### **4. Tooltip Explicativo**

Adicionar tooltips para ajudar o admin a entender quando preencher cada campo:

```jsx
import { HelpCircle } from 'lucide-react'; // ou outro ícone

{shouldShowField(selectedType, 'floor') && (
  <div className="mb-4">
    <label className="flex items-center gap-2">
      Andar {isFieldRequired(selectedType, 'floor') && '*'}
      <HelpCircle 
        size={16} 
        className="text-gray-400 cursor-help" 
        title="Andar onde está localizado o imóvel (apenas para apartamentos e salas comerciais)"
      />
    </label>
    <input type="number" ... />
  </div>
)}
```

---

#### **5. Preview de Campos ao Mudar Tipo**

Mostrar aviso ao admin sobre quais campos serão exibidos:

```jsx
<div className="bg-blue-50 p-4 rounded-lg mb-6">
  <p className="font-medium text-blue-900">Campos obrigatórios para {selectedType}:</p>
  <ul className="list-disc list-inside text-blue-700 text-sm mt-2">
    {getFieldsConfig(selectedType).required.map(field => (
      <li key={field}>{fieldLabels[field]}</li>
    ))}
  </ul>
</div>
```

---

#### **6. Checklist de Implementação**

- [ ] Criar `PropertyForm.jsx` com campos condicionais
- [ ] Implementar mudança de categoria → atualiza tipos disponíveis
- [ ] Implementar mudança de tipo → mostra/oculta campos
- [ ] Adicionar validação de campos obrigatórios
- [ ] Adicionar tooltips explicativos
- [ ] Testar todos os tipos de imóveis
- [ ] Adicionar feedback visual (erros, avisos)
- [ ] Implementar upload de imagens
- [ ] Implementar seleção de amenidades
- [ ] Implementar busca de coordenadas (Google Maps API)

---

**✅ Arquivos Prontos:**
- `back/src/config/propertyFieldsConfig.js` ✅
- `back/src/properties/routes.js` ✅ (com validação condicional)
- `front/src/utils/propertyFieldsHelper.js` ✅

**🔜 Próximo Passo:** Implementar o formulário no painel admin seguindo o código acima!

---

**Criado em**: 17/10/2025  
**Última atualização**: 21/10/2025  
**Versão**: 2.0  
**Autor**: Sistema VerdeMar

---

## 📝 Histórico de Alterações

### v2.0 (21/10/2025)
- ✅ Adicionada seção "Campos Condicionais por Tipo de Imóvel"
- ✅ Documentada obrigatoriedade condicional de campos
- ✅ Criada tabela de referência rápida por tipo
- ✅ Adicionadas regras de validação
- ✅ Removido campo `guests` (não aplicável ao negócio)
- ✅ Expandida seção de campos específicos de condomínio

### v1.0 (17/10/2025)
- 🎉 Criação inicial do documento
- ✅ Documentação completa dos campos básicos

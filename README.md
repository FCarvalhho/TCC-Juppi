# 🚀 Juppi Platform — Monorepo Architecture & TCC Specification

![Java](https://img.shields.io/badge/Java-21_LTS-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.1-6DB33F?style=for-the-badge&logo=springboot)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_15%2F16-3ECF8E?style=for-the-badge&logo=supabase)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite)
![React Native](https://img.shields.io/badge/React_Native-0.88+-61DAFB?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_57-000000?style=for-the-badge&logo=expo)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker)

---

## 📌 Sobre o Projeto

A **Juppi** é uma plataforma de **Marketplace Esportivo bidirecional** projetada para conectar a oferta (gestores e proprietários de quadras/arenas) à demanda (atletas amadores e praticantes). O ecossistema visa sanar gargalos operacionais do mercado de locação esportiva, tais como a ociosidade de horários, a inadimplência (*no-show*), a falta de quórum para partidas e a complexidade na arrecadação individual de valores.

Este repositório contém a arquitetura **Monorepo** da solução, estruturada para garantir consistência de ambiente, facilidade de desenvolvimento em equipe e interoperabilidade entre diferentes IDEs e sistemas operacionais.

---

## 🛠️ Stack Tecnológica & Arquitetura

* **Backend Core:** Java 21 (LTS) + Spring Boot 4.1.1 + Gradle
* **BaaS / Persistência & Serviços:** Supabase (PostgreSQL 15/16 + Realtime WebSockets + Row Level Security + Gateway API Kong)
* **Frontend Web:** React 19 + Vite (Utilizado por Atletas e Gestores)
* **Frontend Mobile:** React Native 0.88+ + Expo SDK (Android & iOS — Utilizado por Atletas e Gestores)
* **Pacote Compartilhado:** `packages/shared` (DTOs, tipos TypeScript, validações e lógicas de estado reusáveis)
* **Infraestrutura Local:** Docker & Docker Compose

---

## 📁 Estrutura do Monorepo

```text
TCC-Juppi/
├── .editorconfig               # Padronização de formatação de código entre IDEs
├── .gitattributes              # Normalização de quebra de linha (LF/CRLF)
├── .gitignore                  # Regras globais de exclusão do Git
├── docker-compose.yml          # Infraestrutura unificada (PostgreSQL + Supabase + Backend)
├── README.md                   # Documentação oficial do repositório
├── backend/
│   └── serve/                  # Aplicação / API REST Spring Boot 4.1.1 (Java 21)
├── packages/
│   ├── mobile/                 # Aplicação Mobile (React Native + Expo)
│   ├── shared/                 # Código, tipos TypeScript e rotinas compartilhadas
│   └── web/                    # Aplicação Web (React 19 + Vite)
└── supabase/
    └── kong.yml                # Configuração do API Gateway / Proxy do Supabase local
```

---

## 📋 Matriz de Requisitos & Escopo do TCC

### 👥 Integrantes e Autores do Projeto
* **Felipe Borges Carvalho**
* **Kayque de Freitas**
* **Gabriel Braga Oliveira**

---

### 1. Histórias de Usuário (HU)

| ID | Descrição | Fonte |
| :--- | :--- | :--- |
| **HU 001** | O atleta enfrentou dificuldades para organizar partidas por falta de jogadores para completar o time ("falta de quórum"), exigindo do sistema uma funcionalidade para publicar e encontrar partidas abertas na região. | Pesquisa de Campo / Relatório Técnico |
| **HU 002** | O organizador da partida enfrentou problemas com inadimplência e cobrança, tendo que pagar o valor integral da quadra sozinho e cobrar os demais depois, exigindo do sistema a divisão automática do pagamento (*Split Payment*). | Pesquisa de Campo |
| **HU 003** | O atleta enfrentou demora no atendimento e falta de transparência nos horários disponíveis via WhatsApp, exigindo do sistema a consulta da grade horária e agendamento em tempo real por geolocalização. | Pesquisa de Campo |
| **HU 004** | O gestor da arena e o atleta enfrentaram prejuízos com cancelamentos de última hora sem pré-aviso (*no-show*), exigindo do sistema a retenção de sinal/caução como garantia da reserva. | Relatório Técnico / Pesquisa de Campo |
| **HU 005** | O proprietário da arena enfrentou grande ociosidade nas quadras em horários comerciais de menor movimento (*off-peak*), exigindo do sistema um mecanismo de precificação dinâmica com descontos automáticos. | Relatório Técnico |
| **HU 006** | O praticante enfrentou problemas de sobreposição de reservas (*double booking*) devido ao controle manual da arena em papel/agenda, exigindo do sistema o bloqueio automático de conflitos. | Pesquisa de Campo |
| **HU 007** | Os praticantes enfrentaram desequilíbrio técnico nas partidas, exigindo do sistema um algoritmo de sorteio automático de times com base no nível de habilidade cadastrado. | Relatório Técnico |
| **HU 008** | O gestor da arena enfrentou complexidade para organizar torneios locais e controlar inscrições/chaves manualmente, exigindo do sistema um módulo integrado de gestão de campeonatos. | Relatório Técnico |

---

### 2. Requisitos Funcionais — TCC Parte 1 (MVP)

#### Módulo 1: Identidade, Acesso e Perfis
* **RF 001 — CRUD do Atleta / Cliente** *(Prioridade: Essencial | Autor: Felipe Borges Carvalho)*
  * Permite o registro, autenticação (login/logout) e gerenciamento do perfil dos praticantes de esportes (dados pessoais, modalidades de interesse e foto de perfil).
* **RF 002 — CRUD do Proprietário / Gestor de Arena** *(Prioridade: Essencial | Autor: Felipe Borges Carvalho)*
  * Cadastro, autenticação e gestão de perfil dos donos e administradores de complexos esportivos.

#### Módulo 2: Catálogo de Espaços e Descoberta
* **RF 003 — CRUD de Quadras e Espaços do Proprietário** *(Prioridade: Essencial | Autor: Kayque de Freitas)*
  * Permite ao gestor cadastrar e manter as quadras do seu estabelecimento, definindo modalidades (futebol, beach tennis, vôlei, etc.), tipo de piso, tabela de preços e horários de funcionamento.
* **RF 004 — API de Localização e Geolocalização** *(Prioridade: Essencial | Autor: Kayque de Freitas)*
  * Obtenção de coordenadas geográficas via GPS para permitir que o atleta encontre quadras e arenas próximas à sua posição atual.
* **RF 005 — Filtros de Pesquisa por Categorias** *(Prioridade: Essencial | Autor: Kayque de Freitas)*
  * Mecanismo de busca parametrizado para filtrar os espaços por modalidade esportiva, bairro/distância e disponibilidade de horário.

#### Módulo 3: Motor de Agendamento e Reputação
* **RF 006 — CRUD de Agendamento do Espaço** *(Prioridade: Essencial | Autor: Gabriel Braga Oliveira)*
  * Permite ao atleta visualizar a grade de horários vagos em tempo real e realizar a reserva do espaço selecionado.
* **RF 007 — Avaliação do Espaço e Reputação** *(Prioridade: Média | Autor: Gabriel Braga Oliveira)*
  * Permite ao atleta enviar notas (1 a 5 estrelas) e comentários sobre as condições e atendimento do local após a realização do jogo, gerando histórico de reputação.

---

### 3. Requisitos Funcionais — TCC Parte 2 (Backlog Avançado)

* **RF 008 — Divisão Automática de Pagamento (*Split Payment*) e Caução** *(Prioridade: Alta | Autor: Kayque de Freitas)*
  * Fracionamento do valor da reserva via PIX/Cartão entre atletas convidados com status em tempo real e retenção de sinal anti-*no-show*.
* **RF 009 — Chatbot para Helpdesk e Suporte Automatizado** *(Prioridade: Média | Autor: Felipe Borges Carvalho)*
  * Atendimento e suporte automatizado com transbordo para operador humano.
* **RF 010 — Chat de Mensagens Diretas (Atleta <-> Atleta e Atleta <-> Arena)** *(Prioridade: Média | Autor: Kayque de Freitas)*
  * Bate-papo em tempo real individual ou de grupo vinculado a partidas e arenas.
* **RF 011 — Matchmaking de Times e Lobby Public Avançado** *(Prioridade: Média | Autor: Gabriel Braga Oliveira)*
  * Publicação de partidas incompletas ("Completar Time") com cruzamento de geolocalização e sorteio/balanceamento automático de equipes.
* **RF 012 — Precificação Dinâmica (*Dynamic Pricing*)** *(Prioridade: Média | Autor: Gabriel Braga Oliveira)*
  * Parametrização de descontos automáticos em horários de baixa procura (*off-peak*).
* **RF 013 — Módulo de Gestão de Torneios e Campeonatos** *(Prioridade: Média/Opcional | Autor: Kayque de Freitas)*
  * Criação e controle de campeonatos locais, chaves, pontuações e classificações.
* **RF 014 — Dashboard Analítico e Relatórios Financeiros Preditivos** *(Prioridade: Média | Autor: Gabriel Braga Oliveira)*
  * Painel administrativo de métricas financeiras, taxa de ocupação e retenção de mensatistas.
* **RF 015 — Sistema de Anúncios e Monetização por Assinatura** *(Prioridade: Evolutiva | Autor: Felipe Borges Carvalho)*
  * Gestão de planos de assinatura para arenas e banners de destaque patrocinados.
* **RF 016 — Sistema de Report, Denúncias e Moderação** *(Prioridade: Média | Autor: Felipe Borges Carvalho)*
  * Registro de denúncias sobre atitudes inadequadas, *no-show* e painel de moderação.
* **RF 017 — Loja Própria e E-commerce de Produtos Esportivos** *(Prioridade: Evolutiva | Autor: Kayque de Freitas)*
  * Catálogo, venda e aluguel de equipamentos esportivos (bolas, raquetes, coletes) integrados ao agendamento.

---

### 4. Requisitos Não-Funcionais (RQ) & Restrições (RT)

| Identificador | Nome | Prioridade | Autor | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **RQ 001** | Arquitetura Backend RESTful | Essencial | Felipe Borges Carvalho | Backend desenvolvido em Java com Spring Boot provendo API RESTful. |
| **RQ 002** | Interface Reativa e Multiplataforma | Essencial | Kayque de Freitas | Frontend desenvolvido em React + Vite (Tailwind CSS) e React Native + Expo para web e mobile. |
| **RQ 003** | Persistência Relacional de Dados | Essencial | Gabriel Braga Oliveira | Armazenamento relacional via PostgreSQL (Supabase). |
| **RQ 004** | Prevenção de Overbooking | Essencial | Felipe Borges Carvalho | Garantia de integridade transacional com bloqueio temporário do slot durante o checkout. |
| **RQ 005** | Desempenho e Tempo de Resposta | Essencial | Kayque de Freitas | Resposta de buscas por geolocalização e carregamento da grade em tempo inferior a 2 segundos. |
| **RT 001** | Restrição de Stack | Essencial | Gabriel Braga Oliveira | Uso estrito de Java/Spring Boot, React/React Native, PostgreSQL/Supabase e Git/GitHub. |

---

### 5. Regras de Domínio (RD)

* **RD 001 — Confirmação Mediante Pagamento:** A reserva só transita para "Confirmada" após pagamento/sinal. Pagamentos não concluídos em 15 minutos liberam o horário automaticamente. *(Autor: Felipe Borges Carvalho)*
* **RD 002 — Responsabilidade Financeira no Split:** O valor total é fracionado entre os participantes. Caso um convidado não quite sua cota até o prazo limite, a responsabilidade recai sobre o organizador. *(Autor: Kayque de Freitas)*
* **RD 003 — Aplicação da Precificação Dinâmica:** Descontos aplicam-se exclusivamente a reservas avulsas em horários *off-peak* pré-configurados pelo gestor. *(Autor: Gabriel Braga Oliveira)*
* **RD 004 — Elegibilidade em Partidas Abertas (Lobby Public):** A entrada de atletas avulsos requer compatibilidade de modalidade e nível técnico com os requisitos do criador da partida. *(Autor: Felipe Borges Carvalho)*
* **RD 005 — Política de Cancelamento e Reembolso:** Cancelamentos com mais de 24h garantem estorno integral. Cancelamentos com menos de 24h retêm a taxa de sinal/caução para ressarcimento da arena. *(Autor: Kayque de Freitas)*
* **RD 006 — Equilíbrio no Sorteio de Times:** O algoritmo distribui os atletas com base na média ponderada do nível de habilidade cadastrado em seus perfis. *(Autor: Gabriel Braga Oliveira)*

---

## 🚦 Como Iniciar o Ambiente

### Pré-requisitos
* **Docker** e **Docker Compose**
* **Node.js** (v18+)
* **JDK 21** (opcional, para execução local do backend fora do container)

### 1. Subir Infraestrutura e Backend (Docker)
```bash
docker compose up -d --build
```

### 2. Rodar a Aplicação Web (React + Vite)
```bash
cd packages/web
npm install
npm run dev
```

### 3. Rodar a Aplicação Mobile (React Native + Expo)
```bash
cd packages/mobile
npm install --legacy-peer-deps
npm run start
```

---

## 📄 Licença e Uso Acadêmico

Trabalho de Conclusão de Curso (TCC) do curso de Bacharelado em Ciência da Computação / Engenharia de Software — Plataforma Juppi. Todos os direitos reservados aos autores.

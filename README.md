# StackFlex​

Funcionalidades Principais
Autenticação: Login seguro utilizando credenciais tradicionais e integração planejada com o Google OAuth para maior conveniência.​

## Sistema de Estoque:

Adição de itens do estoque diretamente nos orçamentos.​

Remoção automática de itens do estoque ao finalizar uma Ordem de Serviço (OS).​

## Criação de Orçamentos:

Geração de orçamentos detalhados.​

Aprovação de orçamentos via links compartilháveis, facilitando a interação com clientes.​

## Gerenciamento de Funcionários:

Registro e desligamento de funcionários, mantendo os registros no banco de dados por razões jurídicas.​

Delegação de agendas e serviços específicos para cada funcionário.​

Controle de ferramentas e veículos em uso por cada membro da equipe.​

## Tecnologias Utilizadas
 - Next.js: Framework React para desenvolvimento web.​

 - Prisma: ORM para gerenciamento eficiente do banco de dados.​

 - Tailwind CSS: Framework CSS para estilização moderna e responsiva.​


## Instalação e Configuração
Clone o repositório:

```bash
git clone https://github.com/patrckak/stackflex-final.git
```

### Instale as dependências:

```bash
npm install
```

| Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias conforme o exemplo em .env.example.

### Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

| Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Contribuição
| Contribuições são bem-vindas! Para contribuir:​


#

#### Este projeto está licenciado sob a licença MIT.​





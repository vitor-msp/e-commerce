# E-Commerce
E-commerce simples desenvolvido em TypeScript, contendo uma api em NodeJS e um front em ReactJS.

![demo](gif/demo.gif)

## Contextualização
### Enunciado
Uma loja quer montar um site para vender seus produtos. Essa loja possui 2 fornecedores, que construíram uma API para você consumir e listar todos os produtos disponíveis nesta loja. O cliente deve ser capaz de filtrar e pesquisar por produtos específicos enquanto acessa o site. É importante que todos os produtos selecionados vão para um carrinho de compras. Além disso, você precisará registrar em um banco de dados cada compra realizada nesta loja com os dados do cliente e dos produtos comprados.

### Discussão

Como a loja possui apenas dois fornecedores, os quais já disponibilizam suas APIs para consumo, o front foi construído de forma que consuma essas APIs para exibição e filtragem de produtos. Desta forma, o backend não precisou lidar com os produtos, apenas com os usuários e faturamento.

Como um e-commerce tem uma grande parte de suas funcionalidades voltadas à interação com o usuário, foi utilizada a biblioteca Redux no front a fim de facilitar a comunicação e reação à eventos. Além disso, o Bootstrap/React Bootstrap pode facilitar o processo de design.

Já no backend, foi levado bastante em conta a possibilidade de crescimento do sistema, o qual poderia, com o tempo, ganhar novas integrações e equipes de desenvolvimento maiores. Desta forma, buscou-se utilizar Clean Architecture para facilitar manutenções futuras, além de testes unitários e E2E, os quais estão proporcionando mais de 90% de cobertura.

A persistência dos dados é essencial, principalmente pelo fato de que informações pessoais e de faturamento de clientes serão armazenadas. Por isso, foi decidido utilizar o PostgreSQL por se tratar de uma banco de dados extremamente confiável e escalável. Além disso, adicionou-se uma camada de ORM para interação da API com o banco de dados, a fim de facilitar futuras migrações de base de dados.

Fazendo referência ao Domain Driven Design, pode-se perceber que a API contempla dois bounded contexts, o de usuários e o de pedidos/faturamento. Pelo pequeno porte do sistema, ambos os contextos foram desenvolvidos em um único banco de dados, porém as tabelas e a API foram desenvolvidas de forma desacoplada, buscando deixar os módulos preparados para uma possível ruptura em microsserviços no futuro.

Por fim, apesar de se tratar de um e-commerce "simples", pelo menos três ambientes independentes foram citados: front, api e banco de dados. Por isso, foi escolhido rodá-los em containers de Docker, com sua integração pelo Docker Compose.

## Execução
1. Clone este repositório
```
git clone https://github.com/vitor-msp/e-commerce.git
```
2. Accesse a pasta baixada
```
cd e-commerce
```
3. Execute o docker-compose
```
sudo docker-compose up -d
```
## Observações
1. A porta 80 no seu computador deve estar disponível
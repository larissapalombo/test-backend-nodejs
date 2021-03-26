<h1>Backend Analyst Larissa Testing</h1>

Após clonar o repositório e entrar na pasta que acabou de clonar, instale as dependências:

`npm install`

## Para rodar o projeto

No terminal `node index.js`.
O projeto  está rodando na porta `http://localhost:3000`.

## Conexão com o banco

O banco de dados utilizado foi o MongoDB.
O arquivo de conexão está no arquivo model/connection.js

Para isso, crie o database e a collection, por exemplo:

1- use StoreManager
2- switched to db StoreManager
3- show collections
4- db.products.insert({ title: "Queijo", description: "Meia cura" , price: "30.50", category: "Mercearia"})
5- show collections
products

## Testes

Para rodar os testes, lembre-se de deixar o servidor rodando e execute o seguinte comando

`npm run test`

Nem todos os testes estão funcionando, pois não houve tempo hábil para desenvolver e verificar os erros ocorridos. Mas deixei para mostrar ao menos a lógica da implementação dos testes.

## Endpoints:

1- Cadastro de produtos

- O endpoint está acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos em uma **collection** chamada products do MongoDB;

- O endpoint deve receber a seguinte estrutura:

```json
{
  "title": "nome do produto",
  "description": "descrição do produto",
  "price": "preço do produto",
  "category": "categoria do produto"
}
```

O retorno da API de um produto cadastrado com sucesso deverá ser:

```json
{
  "_id": "5f43a7ca92d58904914656b6",
  "title": "Queijo",
  "description": "Meia Cura",
  "price": "30.50",
  "category": "Mercearia"
}

As seguintes validações serão feitas através do middleware:

- Nenhum campo pode ser vazio;

- O campo price tem que ser um número;



2- Listar produtos

- O endpoint está acessível através do caminho (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos devem ser retornados;

- Através do caminho `/products/:title`, apenas o produto com o `title` presente na URL deve ser retornado;

- Através do caminho `/products/:category`, apenas o produto com o `category` presente na URL deve ser retornado;



3 - Atualizar um produto

- O endpoint está acessível através do caminho (`/products/:id`);

- O corpo da segue a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL será atualizado;

- As mesmas validações do cadastro do produto serão feitas.



4 - Deletar um produto

- O endpoint está acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL deve ser deletado;

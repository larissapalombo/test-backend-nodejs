const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017';
const url = 'http://localhost:3000';

describe('1 - Crie um endpoint para o cadastro de produtos', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('StoreManager');
    await db.collection('products').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('products').deleteMany({});
    const myobj = {
      title: 'Camiseta',
      description: 'Azul com manga',
      price: '29.90',
      category: 'roupa',
    };
    await db.collection('products').insertOne(myobj);
  });

  afterEach(async () => {
    await db.collection('products').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que não é possível criar um produto com uma string no campo price', async () => {
    await frisby
      .post(`${url}/products`, {
        title: 'Camiseta',
        description: 'Azul com manga',
        price: 'string',
        category: 'roupa',
      })
      .expect('status', 422)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const error = body.err.code;
        const { message } = body.err;
        expect(error).toEqual('invalid_data');
        expect(message).toEqual('"price" must be a number in format 0.00');
      });
  });

  it('Será validado que é possível criar um produto com sucesso', async () => {
    await frisby
      .post(`${url}/products`, {
        title: 'Camiseta',
        description: 'Azul com manga',
        price: '29.90',
        category: 'roupa',
      })
      .expect('status', 201)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const productName = body.title;
        const descriptionProduct = body.quantity;
        const priceProduct = body.price;
        const categoryProduct = body.category;
        expect(productName).toEqual('Camiseta');
        expect(descriptionProduct).toEqual('Azul com manga');
        expect(priceProduct).toEqual('29.90');
        expect(categoryProduct).toEqual('roupa');
      });
  });
});

describe('2 - Crie um endpoint para listar os produtos', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('StoreManager');
    await db.collection('products').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('products').deleteMany({});
    const products = [
      { title: 'Camiseta', description: 'Azul com manga', price: '29.90', category: 'roupa' },
      { title: 'Vestido', description: 'Amarelo longo', price: '59.90', category: 'roupa' },
      { title: 'Calça', description: 'Vermelha feminina', price: '89.90', category: 'roupa' },
    ];
    await db.collection('products').insertMany(products);
  });

  afterEach(async () => {
    await db.collection('products').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que todos produtos estão sendo retornados', async () => {
    await frisby
      .get(`${url}/products`)
      .expect('status', 200)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const firstProductTitle = body.products[0].title;
        const firstDescriptionProduct = body.products[0].description;
        const firstPriceProduct = body.products[0].price;
        const firstCategoryProduct = body.products[0].category;

        const secondProducTitle = body.products[1].title;
        const secondDescriptionProduct = body.products[1].description;
        const secondPriceProduct = body.products[1].price;
        const secondCategoryProduct = body.products[1].category;

        const thirdProductTitle = body.products[2].name;
        const thirdDescriptionProduct = body.products[2].description;
        const thirdPriceProduct = body.products[2].price;
        const thirdCategoryProduct = body.products[2].category;

        expect(firstProductTitle).toEqual('Camiseta');
        expect(firstDescriptionProduct).toEqual('Azul com manga');
        expect(firstPriceProduct).toEqual('29.90');
        expect(firstCategoryProduct).toEqual('roupa');

        expect(secondProducTitle).toEqual('Vestido');
        expect(secondDescriptionProduct).toEqual('Amarelo longo');
        expect(secondPriceProduct).toEqual('59.90');
        expect(secondCategoryProduct).toEqual('roupa');

        expect(thirdProductTitle).toEqual('Calça');
        expect(thirdDescriptionProduct).toEqual('Vermelha feminina');
        expect(thirdPriceProduct).toEqual('89.90');
        expect(thirdCategoryProduct).toEqual('roupa');
      });
  });

  it('Será validado que é possível listar um determinado produto', async () => {
    let result;

    await frisby
      .post(`${url}/products`, {
        title: 'Camiseta',
        description: 'Azul com manga',
        price: '29.90',
        category: 'roupa',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
        responseProductName = result.title;
      });

    await frisby
      .get(`${url}/products/${responseProductName}`)
      .expect('status', 200)
      .then((secondResponse) => {
        const { json } = secondResponse;
        const productName = json.title;
        const descriptionProduct = json.description;
        const priceProduct = json.price;
        const categoryProduct = json.category;

        expect(productName).toEqual('Vestido');
        expect(descriptionProduct).toEqual('Amarelo longo');
        expect(priceProduct).toEqual('59.90');
        expect(categoryProduct).toEqual('roupa');
      });
  });
});

describe('3 - Crie um endpoint para atualizar um produto', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('StoreManager');
    await db.collection('products').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('products').deleteMany({});
    const myobj = {
      title: 'Camiseta',
      description: 'Azul com manga',
      price: '29.90',
      category: 'roupa',
    };
    await db.collection('products').insertOne(myobj);
  });

  afterEach(async () => {
    await db.collection('products').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é possível atualizar um produto com sucesso', async () => {
    let result;
    let resultProductId;

    await frisby
      .get(`${url}/products/`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
        resultProductId = result.products[0]._id;
      });

    await frisby
      .put(`${url}/products/${resultProductId}`, {
        title: 'Camiseta',
        description: 'Azul com manga',
        price: '29.90',
        category: 'roupa',
      })
      .expect('status', 200)
      .then((secondResponse) => {
        const { json } = secondResponse;
        const productName = json.title;
        const descriptionProduct = json.description;
        const priceProduct = json.price;
        const categoryProduct = json.category;

        expect(productName).toEqual('Camiseta');
        expect(descriptionProduct).toEqual('Azul com manga');
        expect(priceProduct).toEqual('29.90');
        expect(categoryProduct).toEqual('roupa');
      });
  });
});

describe('4 - Crie um endpoint para deletar um produto', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('StoreManager');
    await db.collection('products').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('products').deleteMany({});
    const myobj = {
      title: 'Camiseta',
      description: 'Azul com manga',
      price: '29.90',
      category: 'roupa',
    };
    await db.collection('products').insertOne(myobj);
  });

  afterEach(async () => {
    await db.collection('products').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });
});

import * as dotenv from 'dotenv';

dotenv.config({ path: 'test/.env.test' });

// let sequelizeClient: Sequelize;

beforeAll(async function before() {
  // things to do before the tests
});

beforeEach(async function beforeEach() {
  // things to do before each test
});

/*beforeAll(async function () {
  sequelizeClient = await initConnection();
  sequelizeClient = await sequelizeClient.sync(); // load all models to the in-memory db

  process.env.PORT = '3009'; // so it doesn't conflict in the CI
});

afterEach(async function () {
  // clean all mocks
  sinon.restore();

  // clean all tables
  await Promise.all(
    Object.values(sequelizeClient.models).map((model: any) => model.destroy({ truncate: true, force: true }))
  );
});*/

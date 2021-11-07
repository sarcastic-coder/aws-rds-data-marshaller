import RDSDataService from 'aws-sdk/clients/rdsdataservice';
import { marshallParameters } from '../src/marshall';
import * as Parameter from '../src/marshall/parameter';

const client = new RDSDataService();

const parameterDefinitions = {
  id: Parameter.UUID(),
  email: Parameter.String(),
  password: Parameter.String(),
  createdAt: Parameter.Timestamp(),
};

async() => {
  await client
    .executeStatement({
      resourceArn: '',
      secretArn: '',
      database: '',
      sql: 'INSERT INTO my_table (id, email, password, created_at) VALUES (:id, :email, :password, :createdAt)',
      parameters: marshallParameters(
        parameterDefinitions,
        {
          id: '465989dc-8a66-4c54-9818-4d2c14140709',
          email: 'example@exampmle.com',
          password: '$2y$12$zqFaw7b0DSR26C1S7NQFZOtqp3PlyMhycXIeZJMxz1Dwip6PYN1/K ',
          createdAt: '2020-03-20 18:43:55',
        },
      ),
    })
    .promise();
};

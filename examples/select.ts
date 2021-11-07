import RDSDataService from 'aws-sdk/clients/rdsdataservice';
import { marshallParameters } from '../src/marshall';
import * as Parameter from '../src/marshall/parameter';
import { unmarshallResponse } from '../src/unmarshall';

const client = new RDSDataService();

const parameterDefinitions = {
  id: Parameter.UUID('userId'),
  email: Parameter.String(),
  password: Parameter.String(),
  createdAt: Parameter.Timestamp(),
};

async() => {
  const result = await client
    .executeStatement({
      resourceArn: '',
      secretArn: '',
      database: '',
      sql: 'SELECT * FROM my_table WHERE id = :userId',
      parameters: marshallParameters(
        parameterDefinitions,
        {
          userId: '465989dc-8a66-4c54-9818-4d2c14140709',
        },
      ),
    })
    .promise();

  /**
   * records = [
   *   {
   *      id: '465989dc-8a66-4c54-9818-4d2c14140709',
   *      email: 'example@exampmle.com',
   *      password: '$2y$12$zqFaw7b0DSR26C1S7NQFZOtqp3PlyMhycXIeZJMxz1Dwip6PYN1/K',
   *      created_at: '2020-03-20 18:43:55'
   *   }
   * ]
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const records = unmarshallResponse({ records: result.records, columnMetadata: result.columnMetadata });
};

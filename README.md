# AWS RDS Data Marshaller

## Usage

```typescript
import { RDSDataService } from 'aws-sdk';
import { marshallParameters } from 'aws-rds-data-marshaller/marshall';
import { unmarshallResponse } from 'aws-rds-data-marshaller/unmarshall';

const dataApiClient = new RDSDataService();

const result = await dataApiClient.executeStatement({
  resourceArn: 'arn:aws:rds:us-east-1:0000000000:cluster:my-cluster',
  secretArn: 'arn:aws:secretsmanager:us-east-1:0000000000:secret:my-secret',
  database: 'my_database',
  sql: 'SELECT * FROM my_table WHERE id = :id',
  parameters: marshallParameters(
    {
      id: Parameter.String(),
    },
    {
      id: '3438dcbc-3cf8-46eb-b67b-59d744d764b3',
    },
  ),
});

const records = unmarshallResponse(result);
```
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

See [examples/](./examples/) for more examples of usage.

## API

### `marshallParameters`

#### Import

```typescript
import { marshallParameters } from 'aws-rds-data-marshaller/marshall';
```

#### Description

Marshal parameters for a single `executeStatement` call.

#### Example

```typescript
import { marshallParameters } from 'aws-rds-data-marshaller/marshall';

const parameterDefinitions = {
  id: UUID(),
};

const parameters = {
  id: '465989dc-8a66-4c54-9818-4d2c14140709',
};

dataApiClient.executeStatement({
  resourceArn: '',
  secretArn: '',
  database: '',
  sql: 'SELECT FROM my_table WHERE id = :id',
  parameters: marshallParameters(parameterDefinitions, parameters),
});
```


### `marshallParameterSet`

#### Import

```typescript
import { marshallParameterSet } from 'aws-rds-data-marshaller/marshall';
```

#### Description

Marshall a set of parameters for a `batchExecuteStatement` call.

#### Example

```typescript
import { marshallParameterSet } from 'aws-rds-data-marshaller/marshall';

const parameterDefinitions = {
  id: UUID(),
};

const parameters = [
  {
    id: '465989dc-8a66-4c54-9818-4d2c14140709',
  },
  {
    id: 'd64c2325-217b-40ee-802f-d9fa391e994b',
  },
];

dataApiClient.batchExecuteStatement({
  resourceArn: '',
  secretArn: '',
  database: '',
  sql: 'SELECT FROM my_table WHERE id = :id',
  parameterSets: marshallParameterSet(parameterDefinitions, parameters),
});

```

### `unmarshallResponse`

```typescript
import { unmarshallResponse } from 'aws-rds-data-marshaller/unmarshall';
```

### `String`

```typescript
import { String } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `UUID`

```typescript
import { UUID } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `JSON`

```typescript
import { JSON } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Timestamp`

```typescript
import { Timestamp } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Date`

```typescript
import { Date } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Time`

```typescript
import { Time } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Blob`

```typescript
import { Blob } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Boolean`

```typescript
import { Boolean } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Double`

```typescript
import { Double } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Decimal`

```typescript
import { Decimal } from 'aws-rds-data-marshaller/marshall/parameter';
```

### `Long`

```typescript
import { Long } from 'aws-rds-data-marshaller/marshall/parameter';
```


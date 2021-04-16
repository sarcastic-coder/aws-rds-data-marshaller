import type { ArrayValue, ColumnMetadata, ExecuteStatementResponse, Field, FieldList, Metadata } from 'aws-sdk/clients/rdsdataservice';

type StatementResponse = Required<Pick<ExecuteStatementResponse, 'columnMetadata' | 'records'>>;

export const enum ColumnTypeName {
  ArrayText = '_text',
  ArrayJSON = '_json',
  ArrayJSONB = '_jsonb',
  JSON = 'json',
  JSONB = 'jsonb',
}

export const enum ColumnType {
  JSON = 1111,
  JSONB = 1111,
  Array = 2003,
}

type ArrayField = Required<Pick<Field, 'arrayValue'>>;

const arrayUnmarshaller = (columnMetadata: ColumnMetadata, field: ArrayField) => {
  type ArrayDecoder = (field: ArrayValue) => unknown;

  const decoder = (): ArrayDecoder => {
    switch (columnMetadata.typeName) {
      case ColumnTypeName.ArrayJSON:
      case ColumnTypeName.ArrayJSONB:
        return (value) => {
          if (Array.isArray(value.arrayValues)) {
            return value.arrayValues.map((value) => decoder()(value));
          }

          if (value.stringValues === undefined) {
            throw new Error('Unable to unmarshall JSON array field, items are missing.');
          }

          return value.stringValues.map((item: string) => JSON.parse(item as string));
        };
      default:
        return (value) => {
          if (Array.isArray(value.arrayValues)) {
            return value.arrayValues.map((value) => decoder()(value));
          }

          for (const items of Object.values(value)) {
            return items;
          }

          return [];
        };
    }
  };

  return decoder()(field.arrayValue);
};

export type FieldUnmarshaller = <F extends unknown>(columnMetadata: ColumnMetadata, field: Field) => F;

export const unmarshallField: FieldUnmarshaller = (columnMetadata, field) => {
  if (field.isNull) {
    return null;
  }

  if (columnMetadata.type === ColumnType.Array) {
    return arrayUnmarshaller(columnMetadata, field as ArrayField);
  }

  switch (columnMetadata.type) {
    case ColumnType.JSON:
    case ColumnType.JSONB:
      return JSON.parse(field.stringValue as string);
    default:
      for (const value of Object.values(field)) {
        return value;
      }
  }
};

export const unmarshallRecord = <R extends Record<string, unknown>>(metadata: Metadata, record: FieldList): R => {
  const result = {} as Record<string, unknown>;

  for (const f in record) {
    const field = record[f];
    const column = metadata[f];

    if (column === undefined) {
      throw new Error(`Unable to unmarshall column with no metadata. Column index ${f}`);
    }

    if (column.name === undefined) {
      throw new Error(`Unable to unmarshall column with no name. Column index ${f}`);
    }

    result[column.name] = unmarshallField(column, field);
  }

  return result as R;
};

export const unmarshallResponse = <R extends Record<string, unknown>>(response: StatementResponse): R[] => {
  const result = [] as R[];

  for (const record of response.records) {
    result.push(unmarshallRecord(response.columnMetadata, record));
  }

  return result;
};

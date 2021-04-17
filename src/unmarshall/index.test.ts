import { ColumnMetadata, Field, FieldList, Metadata, SqlRecords } from 'aws-sdk/clients/rdsdataservice';
import { ColumnType, ColumnTypeName, unmarshallField, unmarshallRecord, unmarshallResponse } from '.';

describe('unmarshallField()', () => {
  it('unmarshalls a string field', () => {
    const columnMetadata: ColumnMetadata = {
      name: 'my_string_field',
      typeName: 'varchar',
    };

    const field: Field = {
      stringValue: 'my database value',
    };

    expect(
      unmarshallField(columnMetadata, field),
    )
      .toStrictEqual('my database value');
  });

  it('unmarshalls a null field', () => {
    const columnMetadata: ColumnMetadata = {
      name: 'my_null_field',
      typeName: 'varchar',
    };

    const field: Field = {
      isNull: true,
    };

    expect(
      unmarshallField(columnMetadata, field),
    )
      .toStrictEqual(null);
  });

  it('unmarshalls a JSON field', () => {
    const columnMetadata: ColumnMetadata = {
      name: 'my_json_field',
      type: ColumnType.JSON,
      typeName: ColumnTypeName.JSON,
    };

    const field: Field = {
      stringValue: JSON.stringify({ my_field_json: 'foo ' }),
    };

    expect(
      unmarshallField(columnMetadata, field),
    )
      .toStrictEqual({ my_field_json: 'foo ' });
  });

  it('unmarshalls an array field', () => {
    const columnMetadata: ColumnMetadata = {
      name: 'my_array_field',
      type: ColumnType.Array,
      typeName: '_text',
    };

    const field: Field = {
      arrayValue: {
        stringValues: ['foo', 'bar', 'baz'],
      },
    };

    expect(
      unmarshallField(columnMetadata, field),
    )
      .toStrictEqual(['foo', 'bar', 'baz']);
  });

  it('unmarshalls a JSON array field', () => {
    const columnMetadata: ColumnMetadata = {
      name: 'my_json_array_field',
      type: ColumnType.Array,
      typeName: ColumnTypeName.ArrayJSON,
    };

    const field: Field = {
      arrayValue: {
        stringValues: [
          JSON.stringify({ a: 1 }),
          JSON.stringify({ b: 2 }),
        ],
      },
    };

    expect(
      unmarshallField(columnMetadata, field),
    )
      .toStrictEqual([
        { a: 1 },
        { b: 2 },
      ]);
  });

  it('unmarshalls a nested array field', () => {
    const columnMetadata: ColumnMetadata = {
      name: 'my_array_field',
      type: ColumnType.Array,
      typeName: '_text',
    };

    const field: Field = {
      arrayValue: {
        arrayValues: [
          {
            stringValues: ['foo', 'bar', 'baz'],
          },
          {
            stringValues: ['spam', 'eggs'],
          },
        ],
      },
    };

    expect(
      unmarshallField(columnMetadata, field),
    )
      .toStrictEqual([
        ['foo', 'bar', 'baz'],
        ['spam', 'eggs'],
      ]);
  });
});

describe('unmarshallRecord()', () => {
  it('unmarshalls a record with one field', () => {
    const metadata: Metadata = [
      {
        name: 'id',
        typeName: 'varchar',
      },
    ];

    const record: FieldList = [
      {
        stringValue: '817f30dc-cfd1-4970-84a5-076622bc2cae',
      },
    ];

    const expected = {
      id: '817f30dc-cfd1-4970-84a5-076622bc2cae',
    };

    expect(unmarshallRecord(metadata, record))
      .toStrictEqual(expected);
  });

  it('unmarshalls a record with multiple field', () => {
    const metadata: Metadata = [
      {
        name: 'id',
        typeName: 'varchar',
      },
      {
        name: 'name',
        typeName: 'varchar',
      },
    ];

    const record: FieldList = [
      {
        stringValue: '817f30dc-cfd1-4970-84a5-076622bc2cae',
      },
      {
        stringValue: 'John Smith',
      },
    ];

    const expected = {
      id: '817f30dc-cfd1-4970-84a5-076622bc2cae',
      name: 'John Smith',
    };

    expect(unmarshallRecord(metadata, record))
      .toStrictEqual(expected);
  });
});

describe('unmarshallResponse()', () => {
  it('unmarshalls a colleciion of records', () => {
    const columnMetadata: Metadata = [
      {
        name: 'id',
        typeName: 'varchar',
      },
    ];

    const records: SqlRecords = [
      [
        {
          stringValue: '817f30dc-cfd1-4970-84a5-076622bc2cae',
        },
      ],
      [
        {
          stringValue: '302bc3b0-afd5-40bc-b2b1-799c34d01106',
        },
      ],
      [
        {
          stringValue: '810abe37-6b8e-4d39-954d-96593307df0e',
        },
      ],
    ];

    const expected = [
      {
        id: '817f30dc-cfd1-4970-84a5-076622bc2cae',
      },
      {
        id: '302bc3b0-afd5-40bc-b2b1-799c34d01106',
      },
      {
        id: '810abe37-6b8e-4d39-954d-96593307df0e',
      },
    ];

    expect(unmarshallResponse({ columnMetadata, records }))
      .toStrictEqual(expected);
  });
});

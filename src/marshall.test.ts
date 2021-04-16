import type { SqlParameterSets, SqlParametersList } from 'aws-sdk/clients/rdsdataservice';
import { marshallParameters, marshallParameterSet, Parameter } from './marshall';

describe('marshall()', () => {
  describe('simple types', () => {
    it('marshalls a string value', () => {
      const definition: Parameter.Definition = {
        myParameterKey: Parameter.String(),
      };

      const expected: SqlParametersList = [
        {
          name: 'myParameterKey',
          value: {
            stringValue: 'some string value',
            isNull: false,
          },
        },
      ];

      expect(
        marshallParameters(
          definition,
          {
            myParameterKey: 'some string value',
          },
        )
      ).toStrictEqual(expected);
    });

    it('marshalls a string value with a UUID type hint', () => {
      const definition: Parameter.Definition = {
        myUuidParameter: Parameter.UUID(),
      };

      const expected: SqlParametersList = [
        {
          name: 'myUuidParameter',
          typeHint: 'UUID',
          value: {
            stringValue: 'some string value',
            isNull: false,
          },
        },
      ];

      expect(
        marshallParameters(
          definition,
          {
            myUuidParameter: 'some string value',
          },
        )
      ).toStrictEqual(expected);
    });

    it('marshalls a string value with a JSON type hint', () => {
      const definition: Parameter.Definition = {
        myJsonParameter: Parameter.JSON(),
      };

      const expected: SqlParametersList = [
        {
          name: 'myJsonParameter',
          typeHint: 'JSON',
          value: {
            stringValue: '{"someObjectKey": "some object value"}',
            isNull: false,
          },
        },
      ];

      expect(
        marshallParameters(
          definition,
          {
            myJsonParameter: '{"someObjectKey": "some object value"}',
          },
        )
      ).toStrictEqual(expected);
    });

    it('marshalls a string value with a TIMESTAMP type hint', () => {
      const definition: Parameter.Definition = {
        myTimestampParameter: Parameter.Timestamp(),
      };

      const expected: SqlParametersList = [
        {
          name: 'myTimestampParameter',
          typeHint: 'TIMESTAMP',
          value: {
            stringValue: '1970-01-01T00:00:00Z',
            isNull: false,
          },
        },
      ];

      expect(
        marshallParameters(
          definition,
          {
            myTimestampParameter: '1970-01-01T00:00:00Z',
          },
        )
      ).toStrictEqual(expected);
    });
  });

  describe('array types', () => {
    it('marshalls an array of strings', () => {
      const definition: Parameter.Definition = {
        myArrayField: Parameter.Array(Parameter.ArrayTypes.String()),
      };

      const expected: SqlParametersList = [
        {
          name: 'myArrayField',
          value: {
            arrayValue: {
              stringValues: ['a', 'b', 'c'],
            },
            isNull: false,
          }
        }
      ];

      expect(
        marshallParameters(
          definition,
          {
            myArrayField: ['a', 'b', 'c'],
          },
        )
      )
      .toStrictEqual(expected)
    });

    it('marshalls an array of arrays', () => {
      const definition: Parameter.Definition = {
        myNestedArrayField: Parameter.Array(
          Parameter.ArrayTypes.Array(
            Parameter.ArrayTypes.String()
          )
        ),
      };

      const expected: SqlParametersList = [
        {
          name: 'myNestedArrayField',
          value: {
            arrayValue: {
              arrayValues: [
                { stringValues: ['a'] },
                { stringValues: ['b'] },
                { stringValues: ['c'] },
              ],
            },
            isNull: false,
          },
        },
      ];

      expect(
        marshallParameters(
          definition,
          {
            myNestedArrayField: [
              ['a'],
              ['b'],
              ['c'],
            ],
          },
        )
      )
      .toStrictEqual(expected)
    });
  });
});

describe('marshallSet()', () => {
  describe('mashalls a set of parameters', () => {
    const definition: Parameter.Definition = {
      myParameterKey: Parameter.String(),
    };

    const expected: SqlParameterSets = [
      [
        {
          name: 'myParameterKey',
          value: {
            isNull: false,
            stringValue: 'foo',
          },
        },
      ],
      [
        {
          name: 'myParameterKey',
          value: {
            isNull: false,
            stringValue: 'bar',
          },
        },
      ],
      [
        {
          name: 'myParameterKey',
          value: {
            isNull: false,
            stringValue: 'baz',
          },
        },
      ],
    ];

    expect(
      marshallParameterSet(
        definition,
        [
          {
            myParameterKey: 'foo',
          },
          {
            myParameterKey: 'bar',
          },
          {
            myParameterKey: 'baz',
          },
        ],
      )
    )
    .toStrictEqual(expected)
  });
});
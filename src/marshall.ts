import type { ArrayValue, SqlParameter, SqlParameterSets, SqlParametersList } from 'aws-sdk/clients/rdsdataservice';

export namespace Parameter {
  export const enum ValueKey {
    Array = 'arrayValue',
    Blob = 'blobValue',
    Boolean = 'booleanValue',
    Double = 'doubleValue',
    Long = 'longValue',
    String = 'stringValue',
  }

  const enum TypeHint {
    JSON = 'JSON',
    UUID = 'UUID',
    Timestamp = 'TIMESTAMP',
    Date = 'DATE',
    Time = 'TIME',
    Decimal = 'DECIMAL',
  }

  export type Definition = Record<string, FieldDefinition>;

  export type FieldDefinition = {
    valueKey: ValueKey;
    typeHint?: TypeHint;
    nullable?: boolean;
  };

  type ArrayItemsDefinition = {
    valuesKey: ArrayTypes.ValuesKey;
    items?: ArrayItemsDefinition;
  };

  export type ArrayFieldDefinition = (
    & FieldDefinition
    & {
      items: ArrayItemsDefinition;
    }
  );

  export const String = (): FieldDefinition => ({
    valueKey: ValueKey.String,
  });

  export const UUID = (): FieldDefinition => ({
    ...String(),

    typeHint: TypeHint.UUID,
  });

  export const JSON = (): FieldDefinition => ({
    ...String(),

    typeHint: TypeHint.JSON,
  });

  export const Timestamp = (): FieldDefinition => ({
    ...String(),

    typeHint: TypeHint.Timestamp,
  });

  export const Date = (): FieldDefinition => ({
    ...String(),

    typeHint: TypeHint.Date,
  });

  export const Time = (): FieldDefinition => ({
    ...String(),

    typeHint: TypeHint.Time,
  });

  export const Blob = (): FieldDefinition => ({
    valueKey: ValueKey.Blob,
  });

  export const Boolean = (): FieldDefinition => ({
    valueKey: ValueKey.Boolean,
  });

  export const Double = (): FieldDefinition => ({
    valueKey: ValueKey.Double,
  });

  export const Decimal = (): FieldDefinition => ({
    ...Double(),

    typeHint: TypeHint.Decimal,
  });

  export const Long = (): FieldDefinition => ({
    valueKey: ValueKey.Long,
  });

  export const Array = (items: ArrayTypes.FieldDefinition): ArrayFieldDefinition => ({
    valueKey: ValueKey.Array,
    items,
  });

  export namespace ArrayTypes {
    export const enum ValuesKey {
      Array = 'arrayValues',
      Boolean = 'booleanValues',
      Double = 'doubleValues',
      Long = 'longValues',
      String = 'stringValues',
    }

    export type FieldDefinition = {
      valuesKey: ValuesKey;
      items?: ArrayItemsDefinition;
    };

    export const Array = (items: ArrayItemsDefinition): ArrayItemsDefinition => ({
      valuesKey: ValuesKey.Array,
      items,
    });

    export const Boolean = (): ArrayItemsDefinition => ({
      valuesKey: ValuesKey.Boolean,
    });

    export const Double = (): ArrayItemsDefinition => ({
      valuesKey: ValuesKey.Double,
    });

    export const Long = (): ArrayItemsDefinition => ({
      valuesKey: ValuesKey.Long,
    });

    export const String = (): ArrayItemsDefinition => ({
      valuesKey: ValuesKey.String,
    });
  }
}

type ArrayValueMarshaller = (definition: Parameter.ArrayTypes.FieldDefinition, values: unknown[]) => ArrayValue;

export const marshallArrayValue: ArrayValueMarshaller = (definition, values) => {
  return {
    [definition.valuesKey]: definition.valuesKey === Parameter.ArrayTypes.ValuesKey.Array
      ? values.map((value) => marshallArrayValue(definition.items as Parameter.ArrayTypes.FieldDefinition, value as unknown[]))
      : values,
  };
};

type Marshaller = (definition: Record<string, Parameter.FieldDefinition>, parameters: Record<string, unknown>) => SqlParametersList;

export const marshallParameters: Marshaller = (definition, parameters) => {
  const parameterKeys = Object.keys(parameters);
  const definitionKeys = Object.keys(definition);

  const missingDefinitions = parameterKeys.filter((key) => {
    return definitionKeys.includes(key) === false;
  });

  if (missingDefinitions.length > 0) {
    throw new Error(`Missing definitions for parameters "${missingDefinitions.join(', ')}"`);
  }

  const marshalledParameters = [];

  for (const fieldName of parameterKeys) {
    const fieldDefinition = definition[fieldName];

    if (definition[fieldName].nullable === false && parameters[fieldName] === null) {
      throw new Error(`NULL value given for non-nullable parameter ${fieldName}`);
    }

    const marshalledParameter: SqlParameter = {
      name: fieldName,

      value: {
        [fieldDefinition.valueKey]: fieldDefinition.valueKey === Parameter.ValueKey.Array
          ? marshallArrayValue((fieldDefinition as Parameter.ArrayFieldDefinition).items, parameters[fieldName] as unknown[])
          : parameters[fieldName],
        isNull: parameters[fieldName] === null,
      },
    };

    if (fieldDefinition.typeHint !== undefined) {
      marshalledParameter.typeHint = fieldDefinition.typeHint;
    }

    marshalledParameters.push(marshalledParameter);
  }

  return marshalledParameters;
};

type SetMarshaller = (definition: Record<string, Parameter.FieldDefinition>, parameterSets: Record<string, unknown>[]) => SqlParameterSets;

export const marshallParameterSet: SetMarshaller = (definition, parameterSets) => {
  return parameterSets.map((parameters) => {
    return marshallParameters(definition, parameters);
  });
};

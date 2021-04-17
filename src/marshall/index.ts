import type { ArrayValue, SqlParameter, SqlParameterSets, SqlParametersList } from 'aws-sdk/clients/rdsdataservice';
import { ArrayFieldDefinition, ArrayTypes, FieldDefinition, ValueKey } from './parameter';

type ArrayValueMarshaller = (definition: ArrayTypes.FieldDefinition, values: unknown[]) => ArrayValue;

export const marshallArrayValue: ArrayValueMarshaller = (definition, values) => {
  return {
    [definition.valuesKey]: definition.valuesKey === ArrayTypes.ValuesKey.Array
      ? values.map((value) => marshallArrayValue(definition.items as ArrayTypes.FieldDefinition, value as unknown[]))
      : values,
  };
};

type Marshaller = (definition: Record<string, FieldDefinition>, parameters: Record<string, unknown>) => SqlParametersList;

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
        [fieldDefinition.valueKey]: fieldDefinition.valueKey === ValueKey.Array
          ? marshallArrayValue((fieldDefinition as ArrayFieldDefinition).items, parameters[fieldName] as unknown[])
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

type SetMarshaller = (definition: Record<string, FieldDefinition>, parameterSets: Record<string, unknown>[]) => SqlParameterSets;

export const marshallParameterSet: SetMarshaller = (definition, parameterSets) => {
  return parameterSets.map((parameters) => {
    return marshallParameters(definition, parameters);
  });
};

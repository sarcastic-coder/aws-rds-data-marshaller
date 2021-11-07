import type { ArrayValue, SqlParameter, SqlParameterSets, SqlParametersList } from 'aws-sdk/clients/rdsdataservice';
import { ArrayTypes, FieldDefinition, ValueKey } from './parameter';

type ArrayValueMarshaller = (definition: ArrayTypes.FieldDefinition, values: unknown[]) => ArrayValue;

export const marshallArrayValue: ArrayValueMarshaller = (definition, values) => {
  return {
    [definition.valuesKey]: definition.valuesKey === ArrayTypes.ValuesKey.Array
      ? values.map((value) => marshallArrayValue(definition.items as ArrayTypes.FieldDefinition, value as unknown[]))
      : values,
  };
};

export type ParameterDefinitions = Record<string, FieldDefinition>;
export type ParameterList<D extends ParameterDefinitions> = Record<D[keyof D]['value']['alias'] extends string ? D[keyof D]['value']['alias'] : keyof D, unknown>;

// type Marshaller = <D extends ParameterDefinitions>(definition: D, parameters: ParameterList<D>) => SqlParametersList;

export const marshallParameters = <D extends ParameterDefinitions>(definition: D, parameters: ParameterList<D>): SqlParametersList => {
  const parameterKeys: Array<keyof ParameterList<D>> = Object.keys(parameters);
  const definitionKeys: Array<keyof D> = Object.keys(definition);

  const missingDefinitions = parameterKeys.filter((key) => {
    return definitionKeys.includes(key) === false;
  });

  if (missingDefinitions.length > 0) {
    throw new Error(`Missing definitions for parameters "${missingDefinitions.join(', ')}"`);
  }

  const marshalledParameters = [];

  for (const fieldName of parameterKeys) {
    const fieldDefinition = definition[fieldName];

    if (definition[fieldName].value.nullable === false && parameters[fieldName] === null) {
      throw new Error(`NULL value given for non-nullable parameter ${fieldName}`);
    }

    const marshalledParameter: SqlParameter = {
      name: fieldName,

      value: {
        [fieldDefinition.value.valueKey]: fieldDefinition.value.valueKey === ValueKey.Array
          ? marshallArrayValue((fieldDefinition).value.items, parameters[fieldName] as unknown[])
          : parameters[fieldName],
        isNull: parameters[fieldName] === null,
      },
    };

    if (fieldDefinition.value.typeHint !== undefined) {
      marshalledParameter.typeHint = fieldDefinition.value.typeHint;
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

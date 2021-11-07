import { Discriminator, make } from '@matt-usurp/tagged-types';

export const enum ValueKey {
  Array = 'arrayValue',
  Blob = 'blobValue',
  Boolean = 'booleanValue',
  Double = 'doubleValue',
  Long = 'longValue',
  String = 'stringValue',
}

const enum FieldType {
  String = 'string',
  UUID = 'uuid',
  JSON = 'json',
  Timestamp = 'timestamp',
  Date = 'date',
  Time = 'time',
  Blob = 'blob',
  Boolean = 'boolean',
  Double = 'double',
  Decimal = 'decimal',
  Long = 'long',
  Array = 'array',
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

export type FieldDefinition = Discriminator<FieldType, {
  valueKey: ValueKey;
  typeHint?: TypeHint;
  nullable?: boolean;
  alias?: string;
}>;

type ArrayItemsDefinition = {
  valuesKey: ArrayTypes.ValuesKey;
  items?: ArrayItemsDefinition;
};

export type ArrayFieldDefinition = Discriminator<FieldType.Array, (
  & FieldDefinition['value']
  & {
    items: ArrayItemsDefinition;
  }
)>;

export const String = (alias?: string): FieldDefinition => make(FieldType.String, {
  alias,
  valueKey: ValueKey.String,
});

export const UUID = (alias?: string): FieldDefinition => make(FieldType.UUID, {
  ...String().value,

  alias,
  typeHint: TypeHint.UUID,
});

export const JSON = (alias?: string): FieldDefinition => make(FieldType.JSON, {
  ...String().value,

  alias,
  typeHint: TypeHint.JSON,
});

export const Timestamp = (alias?: string): FieldDefinition => make(FieldType.Timestamp, {
  ...String().value,

  alias,
  typeHint: TypeHint.Timestamp,
});

export const Date = (alias?: string): FieldDefinition => make(FieldType.Date, {
  ...String().value,

  alias,
  typeHint: TypeHint.Date,
});

export const Time = (alias?: string): FieldDefinition => make(FieldType.Time, {
  ...String().value,

  alias,
  typeHint: TypeHint.Time,
});

export const Blob = (alias?: string): FieldDefinition => make(FieldType.Blob, {
  alias,
  valueKey: ValueKey.Blob,
});

export const Boolean = (alias?: string): FieldDefinition => make(FieldType.Boolean, {
  alias,
  valueKey: ValueKey.Boolean,
});

export const Double = (alias?: string): FieldDefinition => make(FieldType.Double, {
  alias,
  valueKey: ValueKey.Double,
});

export const Decimal = (alias?: string): FieldDefinition => make(FieldType.Double, {
  ...Double().value,

  alias,
  typeHint: TypeHint.Decimal,
});

export const Long = (alias?: string): FieldDefinition => make(FieldType.Long, {
  alias,
  valueKey: ValueKey.Long,
});

export const Array = (items: ArrayTypes.FieldDefinition, alias?: string): ArrayFieldDefinition => make(FieldType.Array, {
  alias,
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

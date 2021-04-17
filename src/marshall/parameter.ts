
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

export type ApiProperty = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  callback: boolean;
  default: string | null;
};
export type ComponentApi = {
  name: string;
  kind: string;
  signature: string;
  description: string;
  source: string;
  propsType: string | null;
  properties: ApiProperty[];
  nativeProps: string[];
  nativeDefaults: { name: string; value: string }[];
  styleSlots: string[];
};
export type FamilyApi = {
  apis: ComponentApi[];
  types: { name: string; declaration: string; description: string }[];
};

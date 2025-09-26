export interface Environment {
  production: boolean;
  microFronts: MicroFronts;
  internalKey: string;
}

export interface MicroFronts {
  [key: string]: MicroFront;
}

export interface MicroFront {
  url: string;
  exposedModule: string;
  component: string;
}

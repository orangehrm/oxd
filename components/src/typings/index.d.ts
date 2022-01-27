declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (key: string) => string;
    $vt: (key: string) => string;
  }
}
export {};

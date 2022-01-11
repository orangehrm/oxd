declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (key: string) => string;
  }
}
export {};

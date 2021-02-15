export interface OutputFile extends Pick<File, 'name' | 'type' | 'size'> {
  base64: string;
}

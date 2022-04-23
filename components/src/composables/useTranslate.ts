import {getCurrentInstance} from 'vue';

export type TranslateFn = (
  key: string,
  params?: Record<string, string>,
) => string;

export default function useTranslate() {
  const translate: TranslateFn | undefined = getCurrentInstance()?.appContext
    .config.globalProperties.$t;
  // Incase of global properties don't have $t access fallback to this
  const translateFallback: TranslateFn = (key: string) => key;

  return {
    $t: translate || translateFallback,
  };
}

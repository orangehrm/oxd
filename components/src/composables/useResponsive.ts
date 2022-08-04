import {nextTick, onBeforeUnmount, onMounted, reactive} from 'vue';

export const DEVICE_XS = 'xs';
export const DEVICE_SM = 'sm';
export const DEVICE_MD = 'md';
export const DEVICE_LG = 'lg';
export const DEVICE_XL = 'xl';

interface Breakpoint {
  [screenType: string]: {
    min: number;
    max: number;
  };
}

export interface State {
  windowWidth: number;
  windowHeight: number;
  screenType: string;
}

export const breakpoints: Breakpoint = {
  [DEVICE_XS]: {
    min: 0,
    max: 599,
  },
  [DEVICE_SM]: {
    min: 600,
    max: 799,
  },
  [DEVICE_MD]: {
    min: 800,
    max: 999,
  },
  [DEVICE_LG]: {
    min: 1000,
    max: 1199,
  },
  [DEVICE_XL]: {
    min: 1200,
    max: 4000,
  },
};

export default function useResponsive() {
  const state: State = reactive({
    windowWidth: 0,
    windowHeight: 0,
    screenType: DEVICE_XS,
  });

  const setWindowSize = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    state.windowWidth = width;
    state.windowHeight = height;
    for (const screenType in breakpoints) {
      if (
        breakpoints[screenType].min <= width &&
        breakpoints[screenType].max >= width
      ) {
        state.screenType = screenType;
        break;
      }
    }
  };

  onMounted(async () => {
    await nextTick();
    setWindowSize();
    window.addEventListener('resize', setWindowSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setWindowSize);
  });

  return state;
}

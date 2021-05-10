import {nextTick, onBeforeUnmount, onMounted, reactive, toRefs} from 'vue';

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
  xs: {
    min: 0,
    max: 599,
  },
  sm: {
    min: 600,
    max: 799,
  },
  md: {
    min: 800,
    max: 999,
  },
  lg: {
    min: 1000,
    max: 1199,
  },
  xl: {
    min: 1200,
    max: 4000,
  },
};

export default function useResponsive() {
  const state: State = reactive({
    windowWidth: 0,
    windowHeight: 0,
    screenType: '',
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

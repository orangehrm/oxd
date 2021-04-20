import {defineComponent} from 'vue';

interface breakpoint {
  [screenType: string]: {
    min: number;
    max: number;
  };
}

interface state {
  windowWidth: number;
  windowHeight: number;
  screenType: string;
}

export const breakpoints: breakpoint = {
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

export const responsiveMixin = defineComponent({
  data(): state {
    return {
      windowWidth: 0,
      windowHeight: 0,
      screenType: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.setWindowSize);
      this.setWindowSize();
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setWindowSize);
  },
  methods: {
    setWindowSize(event?: Event): void {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      this.windowWidth = width;
      this.windowHeight = height;
      for (const screenType in breakpoints) {
        if (
          breakpoints[screenType].min <= width &&
          breakpoints[screenType].max >= width
        ) {
          this.screenType = screenType;
          break;
        }
      }
    },
  },
});

export default responsiveMixin;

import {defineComponent} from 'vue';
import {State, breakpoints, DEVICE_XS} from '../../composables/useResponsive';

export const responsiveMixin = defineComponent({
  data(): State {
    return {
      windowWidth: 0,
      windowHeight: 0,
      screenType: DEVICE_XS,
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
    setWindowSize(): void {
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

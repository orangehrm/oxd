<script lang="ts">
import {Chart} from './chart';
import {nanoid} from 'nanoid';
import {DataPoint} from './types';
import {ChartData, ChartOptions, AnimationSpec} from 'chart.js';
import {h, computed, PropType, shallowRef, defineComponent, watch} from 'vue';

export default defineComponent({
  name: 'oxd-bar-chart',

  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
    classes: {
      type: [String, Object, Array],
      default: null,
    },
    wrapperStyles: {
      type: Object,
      default: () => ({}),
    },
    wrapperClasses: {
      type: [String, Object, Array],
      default: null,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: '100%',
    },
    animate: {
      type: Boolean,
      default: true,
    },
    grid: {
      type: Boolean,
      default: true,
    },
    xAxsis: {
      type: Boolean,
      default: true,
    },
    yAxsis: {
      type: Boolean,
      default: true,
    },
    responsive: {
      type: Boolean,
      default: true,
    },
    aspectRatio: {
      type: [Boolean, Number],
      default: true,
    },
    data: {
      type: Array as PropType<DataPoint[]>,
      default: () => [],
    },
    chartId: {
      type: String,
      default: () => nanoid(8),
    },
    title: {
      type: String,
      required: false,
    },
    animation: {
      type: Object as PropType<AnimationSpec<'bar'>>,
      required: false,
    },
  },

  setup(props) {
    const chartElm = shallowRef<HTMLCanvasElement>();
    const chartjsInstance = shallowRef<Chart>();

    const series = computed<ChartData<'bar'>>(() => ({
      labels: props.data.map(item => item.label),
      datasets: [
        {
          data: props.data.map(item => item.value),
          backgroundColor: props.data.map(item => item.color),
          borderWidth: 4,
          borderSkipped: false,
          borderRadius: Number.MAX_VALUE,
          borderColor: 'rgba(0, 0, 0, 0)',
        },
      ],
    }));

    const options = computed<ChartOptions<'bar'>>(() => ({
      responsive: props.responsive,
      maintainAspectRatio: !!props.aspectRatio,
      aspectRatio:
        typeof props.aspectRatio === 'number' ? props.aspectRatio : 1,
      plugins: {
        title: {
          display: !!props.title,
          text: props.title,
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      animation: !props.animate
        ? false
        : props.animation ?? {
            delay: 200,
            duration: 1000,
            easing: 'easeOutSine',
          },
      // fixes animation issue in responsive mode
      //https://github.com/chartjs/Chart.js/issues/10342
      transitions: {
        resize: {
          animation: {
            duration: 400,
          },
        },
      },
      scales: {
        x: {
          display: props.xAxsis,
          grid: {
            display: props.grid,
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 10,
              style: 'normal',
              family: 'Nunito Sans',
            },
            color: 'rgba(100, 114, 140, 1)',
          },
        },
        y: {
          display: props.yAxsis,
          grid: {
            display: props.grid,
            drawBorder: false,
          },
        },
      },
    }));

    const renderChart = (destroy: boolean) => {
      if (destroy && chartjsInstance.value instanceof Chart) {
        chartjsInstance.value.destroy();
        chartjsInstance.value = null;
      }

      // draw chart only if chartjs insance is null else update
      if (!chartjsInstance.value) {
        chartjsInstance.value = new Chart(chartElm.value, {
          type: 'bar',
          data: {
            ...series.value,
          },
          options: {
            ...options.value,
          },
        });
      } else {
        chartjsInstance.value.data = {...series.value};
        chartjsInstance.value.update('active');
      }
    };

    watch([chartElm, series], () => {
      if (chartElm.value) renderChart(true);
    });

    watch(series, () => {
      if (chartElm.value) renderChart(false);
    });

    return () =>
      h(
        'div',
        {
          width: props.width,
          height: props.height,
          style: props.wrapperStyles,
          class: props.wrapperClasses,
        },
        [
          h('canvas', {
            ref: chartElm,
            style: props.styles,
            class: props.classes,
          }),
        ],
      );
  },
});
</script>

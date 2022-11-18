<script lang="ts">
import {
  ChartData,
  ChartOptions,
  AnimationSpec,
  LegendOptions,
  TooltipOptions,
} from 'chart.js';
import {Chart} from './chart';
import {nanoid} from 'nanoid';
import {DataPoint} from './types';
import LegendVue from '@orangehrm/oxd/core/components/Chart/Legend.vue';
import {h, computed, PropType, shallowRef, defineComponent, watch} from 'vue';

export default defineComponent({
  name: 'oxd-pie-chart',

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
    radius: {
      type: [Number, String],
      default: '50%',
    },
    cutout: {
      type: [Number, String],
      default: '5%',
    },
    animate: {
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
    customLegend: {
      type: Boolean,
      default: false,
    },
    customTooltip: {
      type: Boolean,
      default: false,
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
    legend: {
      type: Object as PropType<LegendOptions<'pie'>>,
      required: false,
    },
    tooltip: {
      type: Object as PropType<TooltipOptions<'pie'>>,
      required: false,
    },
    animation: {
      type: Object as PropType<AnimationSpec<'pie'>>,
      required: false,
    },
  },

  setup(props) {
    const chartElm = shallowRef<HTMLCanvasElement>();
    const chartjsInstance = shallowRef<Chart>();

    const series = computed<ChartData<'pie'>>(() => ({
      labels: props.data.map(item => item.label),
      datasets: [
        {
          data: props.data.map(item => item.value),
          backgroundColor: props.data.map(item => item.color),
        },
      ],
    }));

    const options = computed<ChartOptions<'pie'>>(() => ({
      responsive: props.responsive,
      maintainAspectRatio: !!props.aspectRatio,
      aspectRatio:
        typeof props.aspectRatio === 'number' ? props.aspectRatio : 1,
      cutout: props.cutout,
      borderWidth: props.data.filter(item => item.value).length > 1,
      plugins: {
        legend: {
          ...props.legend,
          align: props.legend?.align ?? 'center',
          position: props.legend?.position ?? 'bottom',
          display: props.customLegend ? false : props.legend?.display,
        },
        tooltip: {
          caretSize: 0,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          enabled: props.customTooltip ? false : props.tooltip?.enabled,
          callbacks: {
            label: ctx => {
              const {dataset, dataIndex} = ctx;
              const value = dataset.data[dataIndex];
              const total = dataset.data.reduce((acc, value) => acc + value, 0);
              const percentage = (value / total) * 100;
              return `${ctx.label} ${value} (${percentage.toFixed(2)}%)`;
            },
            labelColor: ctx => {
              const {dataset, dataIndex} = ctx;
              return {
                borderColor: null,
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: dataset.backgroundColor[dataIndex],
              };
            },
            labelTextColor: () => 'rgba(100, 114, 140, 1)',
          },
          ...props.tooltip,
        },
        title: {
          display: !!props.title,
          text: props.title,
        },
        oxdPieChartTooltip: props.customTooltip,
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
    }));

    const renderChart = (destroy: boolean) => {
      if (destroy && chartjsInstance.value instanceof Chart) {
        chartjsInstance.value.destroy();
        chartjsInstance.value = null;
      }

      // draw chart only if chartjs insance is null else update
      if (!chartjsInstance.value) {
        chartjsInstance.value = new Chart(chartElm.value, {
          type: 'pie',
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

    return () => {
      if (!props.customLegend) {
        return h(
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
      }

      return h(
        'div',
        {
          style: props.wrapperStyles,
          class: props.wrapperClasses,
        },
        [
          h(
            'div',
            {
              class: 'oxd-pie-chart',
            },
            [
              h('canvas', {
                ref: chartElm,
                id: props.chartId,
                style: props.styles,
                class: props.classes,
              }),
            ],
          ),
          h(LegendVue, {
            data: props.data,
            onClick: (index: number) => {
              if (chartjsInstance.value) {
                chartjsInstance.value.toggleDataVisibility(index);
                chartjsInstance.value.update();
              }
            },
          }),
        ],
      );
    };
  },
});
</script>

<style src="./pie-chart.scss" lang="scss"></style>

<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<script lang="ts">
import type {
  ChartData,
  ChartOptions,
  AnimationSpec,
  LegendOptions,
  TooltipOptions,
} from 'chart.js';
import {Chart} from './chart';
import {nanoid} from 'nanoid';
import type {PropType} from 'vue';
import type {DataPoint} from './types';
import LegendVue from '@/components/Chart/Legend.vue';
import {h, computed, shallowRef, defineComponent, watch} from 'vue';

export default defineComponent({
  name: 'OxdPieChart',

  props: {
    styles: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    classes: {
      type: [String, Object, Array],
      required: false,
      default: null,
    },
    wrapperStyles: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    wrapperClasses: {
      type: [String, Object, Array],
      required: false,
      default: null,
    },
    width: {
      type: [Number, String],
      required: false,
      default: '100%',
    },
    height: {
      type: [Number, String],
      required: false,
      default: '100%',
    },
    radius: {
      type: [Number, String],
      required: false,
      default: '50%',
    },
    cutout: {
      type: [Number, String],
      required: false,
      default: '5%',
    },
    animate: {
      type: Boolean,
      required: false,
      default: true,
    },
    responsive: {
      type: Boolean,
      required: false,
      default: true,
    },
    aspectRatio: {
      type: [Boolean, Number],
      required: false,
      default: true,
    },
    customLegend: {
      type: Boolean,
      required: false,
      default: false,
    },
    customTooltip: {
      type: Boolean,
      required: false,
      default: false,
    },
    data: {
      type: Array as PropType<DataPoint[]>,
      required: false,
      default: () => [],
    },
    chartId: {
      type: String,
      required: false,
      default: () => nanoid(8),
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    legend: {
      type: Object as PropType<LegendOptions<'pie'>>,
      required: false,
      default: () => null,
    },
    tooltip: {
      type: Object as PropType<TooltipOptions<'pie'>>,
      required: false,
      default: () => null,
    },
    animation: {
      type: Object as PropType<AnimationSpec<'pie'>>,
      required: false,
      default: () => null,
    },
  },

  setup(props) {
    const chartElm = shallowRef<HTMLCanvasElement>();
    const chartjsInstance = shallowRef<Chart | null>();

    const series = computed<ChartData<'pie'>>(() => ({
      labels: props.data.map((item) => item.label),
      datasets: [
        {
          data: props.data.map((item) => item.value),
          backgroundColor: props.data.map((item) => item.color),
        },
      ],
    }));

    const options = computed<ChartOptions<'pie'>>(() => ({
      responsive: props.responsive,
      maintainAspectRatio: !!props.aspectRatio,
      aspectRatio:
        typeof props.aspectRatio === 'number' ? props.aspectRatio : 1,
      cutout: props.cutout,
      borderWidth: props.data.filter((item) => item.value).length > 1,
      plugins: {
        legend: {
          ...(props.legend && props.legend),
          align: props.legend?.align ?? 'center',
          position: props.legend?.position ?? 'bottom',
          display: props.customLegend ? false : props.legend?.display,
        },
        tooltip: {
          ...(props.tooltip && props.tooltip),
          caretSize: 0,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          enabled: props.customTooltip ? false : props.tooltip?.enabled,
          callbacks: {
            label: (ctx) => {
              const {dataset, dataIndex} = ctx;
              const value = dataset.data[dataIndex];
              const total = dataset.data.reduce((acc, value) => acc + value, 0);
              const percentage = (value / total) * 100;
              return `${ctx.label} ${value} (${percentage.toFixed(2)}%)`;
            },
            labelColor: (ctx) => {
              const {dataset, dataIndex} = ctx;
              return {
                borderWidth: 0,
                borderRadius: 5,
                borderColor: '',
                backgroundColor: Array.isArray(dataset.backgroundColor)
                  ? dataset.backgroundColor[dataIndex]
                  : '',
              };
            },
            labelTextColor: () => 'rgba(100, 114, 140, 1)',
          },
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
      if (!chartElm.value) return;

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
      } else if (chartjsInstance.value) {
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

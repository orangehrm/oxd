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
import {
  Chart,
  Title,
  Legend,
  Tooltip,
  ChartData,
  ArcElement,
  ChartOptions,
  PieController,
  AnimationSpec,
  LegendOptions,
  TooltipOptions,
} from 'chart.js';
import {DataPoint} from './types';
import LegendVue from '@ohrm/oxd/core/components/Chart/Legend.vue';
import {h, computed, PropType, shallowRef, defineComponent, watch} from 'vue';

export default defineComponent({
  name: 'oxd-pie-chart',

  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
    classes: {
      type: Object,
      default: () => ({}),
    },
    wrapperStyles: {
      type: Object,
      default: () => ({}),
    },
    wrapperClasses: {
      type: Object,
      default: () => ({}),
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
    custout: {
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
    customLegend: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array as PropType<DataPoint[]>,
      default: () => [],
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
    Chart.register(Title, Legend, Tooltip, ArcElement, PieController);
    const chartElm = shallowRef<HTMLCanvasElement>();
    const chartjsInstance = shallowRef<Chart>();

    const series = computed<ChartData<'pie'>>(() => ({
      labels: props.data.map(item => item.label),
      datasets: [
        {
          data: props.data.map(item => item.value),
          backgroundColor: [
            '#FB5255',
            '#FE7D15',
            '#81C91D',
            '#BE4BDB',
            '#228BE6',
            '#12B886',
            '#7A50F2',
            '#FFAA00',
            '#E64980',
            '#0FAAC0',
          ],
        },
      ],
    }));

    const options = computed<ChartOptions<'pie'>>(() => ({
      responsive: props.responsive,
      cutout: props.custout,
      plugins: {
        legend: {
          ...props.legend,
          align: props.legend?.align ?? 'center',
          position: props.legend?.position ?? 'bottom',
          display: props.customLegend ? false : props.legend?.display,
        },
        tooltip: {
          ...props.tooltip,
          enabled: props.tooltip?.enabled ?? true,
        },
        title: {
          display: !!props.title,
          text: props.title,
        },
      },
      animation: !props.animate
        ? false
        : props.animation ?? {
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
          width: props.width,
          height: props.height,
          style: props.wrapperStyles,
          class: props.wrapperClasses,
        },
        [
          h(
            'div',
            {
              style: {
                width: '70%',
                height: '70%',
                margin: '0 auto',
                position: 'relative',
              },
            },
            [
              h('canvas', {
                ref: chartElm,
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

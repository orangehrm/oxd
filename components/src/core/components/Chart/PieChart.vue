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
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import {DataPoint} from './types';
import * as echarts from 'echarts/core';
import {PieChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
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
    width: {
      type: [Number, String],
      default: 500,
    },
    height: {
      type: [Number, String],
      default: 500,
    },
    radius: {
      type: [Number, String],
      default: '50%',
    },
    data: {
      type: Array as PropType<DataPoint[]>,
      default: () => [],
    },
    title: {
      type: [String],
      required: false,
    },
  },

  setup(props) {
    const chartElm = shallowRef<HTMLElement>();

    const series = computed(() => [
      {
        name: props.title,
        type: 'pie',
        radius: props.radius,
        data: [...props.data],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ]);

    echarts.use([
      PieChart,
      GridComponent,
      CanvasRenderer,
      TitleComponent,
      LegendComponent,
      TooltipComponent,
    ]);

    // onBeforeMount(() => {
    //   if (chartElm.value) {
    //     const chart = echarts.init(chartElm.value);
    //     chart.setOption({
    //       title: {
    //         text: 'Referer of a Website',
    //         subtext: 'Fake Data',
    //         left: 'center',
    //       },
    //       tooltip: {
    //         trigger: 'item',
    //       },
    //       legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //       },
    //       series: series.value,
    //     });
    //   }
    // });

    watch(chartElm, () => {
      if (chartElm.value) {
        const chart = echarts.init(chartElm.value);
        chart.setOption({
          //   title: {
          //     text: 'Referer of a Website',
          //     subtext: 'Fake Data',
          //     left: 'center',
          //   },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: series.value,
        });
      }
    });

    return () =>
      h('div', {style: props.styles, class: props.classes}, [
        h('div', {
          ref: chartElm,
          style: {
            width: `${props.width}px`,
            height: `${props.height}px`,
          },
        }),
      ]);
  },
});
</script>

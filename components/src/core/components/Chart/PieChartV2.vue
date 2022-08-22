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
import {DataPoint} from './types';
import {Chart, Legend, Tooltip, ArcElement, PieController} from 'chart.js';
import {h, computed, PropType, shallowRef, defineComponent, watch} from 'vue';

export default defineComponent({
  name: 'oxd-pie-chart2',

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
    Chart.register(Legend, Tooltip, ArcElement, PieController);
    const chartElm = shallowRef<HTMLCanvasElement>();
    const chartjsInstance = shallowRef<Chart>();

    const series = computed(() => ({
      labels: props.data.map(item => item.name),
      datasets: [
        {
          label: props.title,
          data: props.data.map(item => item.value),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
        },
      ],
    }));

    watch(chartElm, () => {
      if (chartElm.value) {
        chartjsInstance.value = new Chart(chartElm.value, {
          type: 'pie',
          data: {
            ...series.value,
          },
        });
      }
    });

    return () =>
      h('div', {style: props.styles, class: props.classes}, [
        h('canvas', {
          ref: chartElm,
          width: props.width,
          height: props.height,
        }),
      ]);
  },
});
</script>

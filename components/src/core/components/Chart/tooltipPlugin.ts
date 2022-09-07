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

import {Chart, ChartMeta, Plugin, Element, ChartEvent} from 'chart.js';

// const tooltips = new Map<string, HTMLElement>();

// const getRelativePosition = (canvas: HTMLCanvasElement) => {
//   const position = canvas.getBoundingClientRect();
//   return {
//     x: position.left + window.pageXOffset,
//     y: position.top + window.pageYOffset,
//   };
// };

const hideTooltip = () => {
  document.getElementById('oxd-pie-chart-tooltip')?.remove();
};

// const createTool

export const OxdPieChartTooltip: Plugin = {
  id: 'oxdPieChartTooltip',
  //   afterDatasetUpdate(chart: Chart<'pie'>) {
  //     const dataset = chart.data.datasets[0].data || [];
  //     const totalValue = dataset.reduce((acc, value) => acc + value, 0);

  //     dataset.map((value, i) => {
  //       const tooltipEl = document.createElement('span');
  //       tooltipEl.id = `${chart.canvas.id}-tooltip-${i}`;
  //       tooltipEl.style.display = 'none';
  //       tooltipEl.style.position = 'absolute';
  //       tooltipEl.style.pointerEvents = 'none';
  //       tooltipEl.innerText = `${((value / totalValue) * 100).toFixed(1)}%`;
  //       tooltips.set(tooltipEl.id, tooltipEl);
  //       document.body.appendChild(tooltipEl);
  //     });

  //     console.log('ssss uo ', tooltips);
  //   },
  //   afterEvent: (
  //     chart: Chart<'pie'>,
  //     options: {inChartArea: boolean; event: ChartEvent},
  //   ) => {
  //     if (options.inChartArea && options.event.native) {
  //       const triggeredEl = chart.getElementsAtEventForMode(
  //         options.event.native,
  //         'nearest',
  //         {intersect: true},
  //         true,
  //       );
  //       if (triggeredEl.length === 0) return;
  //       const elmIndex = triggeredEl[triggeredEl.length - 1].index;
  //       const tooltipId = `${chart.canvas.id}-tooltip-${elmIndex}`;
  //       const tooltip = document.getElementById(
  //         `${chart.canvas.id}-tooltip-${elmIndex}`,
  //       );
  //       const {backgroundColor} = triggeredEl[0].element.options;
  //       const {x, y} = triggeredEl[
  //         triggeredEl.length - 1
  //       ].element.tooltipPosition();
  //       if (tooltip) {
  //         tooltip.style.display = 'block';
  //       }
  //     }
  //   },
  afterDatasetsDraw(chart: Chart<'pie'>) {
    //   if (chart.getActiveElements().length === 0) {
    //     document
    //       .querySelectorAll('.oxd-pie-chart-tooltip')
    //       .forEach($elm => $elm.remove());
    //   }
    const activeElements = chart.getActiveElements();

    if (activeElements.length === 0) {
      hideTooltip();
    } else {
      //   const active = activeElements[activeElements.length - 1];

      //   if (document.getElementById('oxd-pie-chart-tooltip')) return;
      //   tooltip.style.display = 'block';
      const tooltipEl =
        document.getElementById('oxd-pie-chart-tooltip') ||
        document.createElement('span');
      const labels = chart.data.labels || [];
      const dataset = chart.data.datasets[0].data || [];
      const position = chart.canvas.getBoundingClientRect();
      const activeElement = activeElements[activeElements.length - 1];
      const totalValue = dataset.reduce((acc, value) => acc + value, 0);
      const percentage = (dataset[activeElement.index] / totalValue) * 100;
      const {x, y} = activeElement.element.tooltipPosition();

      tooltipEl.id = 'oxd-pie-chart-tooltip';
      tooltipEl.classList.add('oxd-pie-chart-tooltip');
      Object.assign(tooltipEl.style, {
        top: position.top + window.pageYOffset + y + 'px',
        left: position.left + window.pageXOffset + x + 'px',
      });

      const key = document.createElement('span');
      Object.assign(key.style, {
        width: '10px',
        height: '10px',
        flexShrink: '0',
        borderRadius: '100%',
        margin: '2.5px 0 0 0',
        backgroundColor: activeElement.element.options.backgroundColor,
      });

      const label = document.createElement('span');
      label.textContent = `${labels[activeElement.index]}`;

      const wrapper = document.createElement('span');

      const count = document.createElement('b');
      count.textContent = `${dataset[activeElement.index]}`;
      wrapper.appendChild(count);

      const value = document.createElement('p');
      value.textContent = `(${percentage.toFixed(2)}%)`;
      wrapper.appendChild(value);

      tooltipEl.replaceChildren(key, label, wrapper);
      document.body.appendChild(tooltipEl);
    }
  },
  beforeInit() {
    document.addEventListener('scroll', hideTooltip, true);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', hideTooltip, true);
  },
};

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

import {Chart, ChartMeta, Plugin, Element} from 'chart.js';

class Label {
  _ctx;
  _value;
  _element;
  constructor(value: string, element: Element, ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._value = value;
    this._element = element;
  }

  render() {
    const {x, y} = this._element.tooltipPosition();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const circumference = (this._element as any).circumference;
    if (circumference > 0.75) {
      this._ctx.save();
      this._ctx.fillStyle = '#fff';
      this._ctx.textAlign = 'center';
      this._ctx.textBaseline = 'middle';
      this._ctx.font = "bold 12px 'Nunito Sans', sans-serif";
      this._ctx.fillText(this._value, x, y);
      this._ctx.restore();
    }
  }
}

const dataLabels = new Map<string, Array<Label>>();

export const OxdPieChartLabels: Plugin = {
  id: 'oxd-pie-chart-labels',
  afterDatasetUpdate(chart: Chart<'pie'>, {meta}: {meta: ChartMeta}) {
    const dataset = chart.data.datasets[0].data || [];
    const totalValue = dataset.reduce((acc, value) => acc + value, 0);

    dataLabels.set(
      chart.canvas.id,
      dataset.map(
        (value, i) =>
          new Label(
            `${((value / totalValue) * 100).toFixed(1)}%`,
            meta.data[i],
            chart.ctx,
          ),
      ),
    );
  },
  afterDatasetsDraw(chart: Chart<'pie'>) {
    if (dataLabels.has(chart.canvas.id)) {
      dataLabels.get(chart.canvas.id)?.map(label => {
        label.render();
      });
    }
  },
};

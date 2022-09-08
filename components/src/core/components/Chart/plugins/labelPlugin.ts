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

import {Chart, Plugin, Element, ChartConfiguration} from 'chart.js';

class Label {
  _ctx;
  _type;
  _value;
  _element;
  constructor(
    type: string,
    value: number,
    element: Element,
    ctx: CanvasRenderingContext2D,
  ) {
    this._ctx = ctx;
    this._type = type;
    this._value = value;
    this._element = element;
  }

  render() {
    if (this._type === 'pie') {
      const {x, y} = this._element.tooltipPosition();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circumference = (this._element as any).circumference;
      if (circumference < 0.75) return;
      this._ctx.save();
      this._ctx.fillStyle = '#fff';
      this._ctx.textAlign = 'center';
      this._ctx.textBaseline = 'middle';
      this._ctx.font = "bold 12px 'Nunito Sans', sans-serif";
      this._ctx.fillText(this._value.toFixed(1) + '%', x, y);
      this._ctx.restore();
    } else if (this._type === 'bar' && this._value > 0) {
      this._ctx.save();
      this._ctx.fillStyle = '#fe7d15';
      this._ctx.textAlign = 'center';
      this._ctx.textBaseline = 'middle';
      this._ctx.font = "normal 10px 'Nunito Sans', sans-serif";
      this._ctx.fillText(
        this._value.toFixed(2),
        this._element.x,
        this._element.y - 2,
      );
      this._ctx.restore();
    }
  }
}

export const OxdChartLabels: Plugin = {
  id: 'oxdChartLabels',
  afterDatasetsDraw(chart: Chart<'pie' | 'bar'>) {
    const meta = chart.getDatasetMeta(0);
    const dataset = chart.data.datasets[0].data || [];
    const totalValue = dataset.reduce((acc, value) => acc + value, 0);

    dataset.map((value: number, i: number) => {
      const type = (chart.config as ChartConfiguration).type;
      const _value = type === 'pie' ? (value / totalValue) * 100 : value;
      return new Label(type, _value, meta.data[i], chart.ctx).render();
    });
  },
};

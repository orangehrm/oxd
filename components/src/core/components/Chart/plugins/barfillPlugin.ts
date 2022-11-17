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

import {Chart, ChartConfiguration, Plugin} from 'chart.js';

/**
 * Draw rectangle with rounded borders
 * https://stackoverflow.com/a/21931930/2182418
 * @param ctx
 * @param x x-position
 * @param y y-position
 * @param w width
 * @param h height
 * @param r radius
 */
const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
};

export const OxdBarChartFill: Plugin = {
  id: 'OxdBarChartFill',

  afterDataLimits: (_, {scale}) => {
    if (scale.id === 'y') {
      const ticks = scale.buildTicks();
      // increase y scale by 1 tick (half a point in y axsis)
      scale.max = scale.max + scale.max / ticks.length;
    }
  },

  beforeDraw: (chart: Chart<'bar'>) => {
    if ((chart.config as ChartConfiguration).type !== 'bar') return;
    const {ctx, scales} = chart;
    const datasetMeta = chart.getDatasetMeta(0) || [];

    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    datasetMeta.data.map((segment: any) => {
      ctx.fillStyle = 'rgb(246, 245, 251)';
      roundRect(
        ctx,
        segment.x - segment.width / 2,
        scales.y.maxHeight - segment.base,
        segment.width,
        scales.y.maxHeight,
        40,
      );
    });

    ctx.restore();
  },
};

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

import {
  Chart,
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarController,
  PieController,
} from 'chart.js';
import {OxdChartLabels} from './plugins/labelPlugin';
import {OxdBarChartFill} from './plugins/barfillPlugin';
import {OxdPieChartTooltip} from './plugins/tooltipPlugin';

Chart.register(
  Title,
  Legend,
  Tooltip,
  ArcElement,
  PieController,
  OxdChartLabels,
  OxdPieChartTooltip,
);

Chart.register(
  BarElement,
  LinearScale,
  CategoryScale,
  BarController,
  OxdBarChartFill,
);

export {Chart};

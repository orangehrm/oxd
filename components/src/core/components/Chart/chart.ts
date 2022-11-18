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
import {OxdBarChartFill} from './plugins/barfillPlugin';
import {OxdPieChartTooltip} from './plugins/tooltipPlugin';

Chart.register(
  Title,
  Legend,
  Tooltip,
  ArcElement,
  PieController,
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

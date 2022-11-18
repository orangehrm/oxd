import {Chart, ChartConfiguration, Plugin} from 'chart.js';

const hideTooltip = () => {
  document.getElementById('oxd-pie-chart-tooltip')?.remove();
};

export const OxdPieChartTooltip: Plugin = {
  id: 'oxdPieChartTooltip',
  afterDatasetsDraw(chart: Chart<'pie'>) {
    if ((chart.config as ChartConfiguration).type !== 'pie') return;
    const activeElements = chart.getActiveElements();

    if (activeElements.length === 0) {
      hideTooltip();
    } else {
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

      tooltipEl.innerHTML = '';
      tooltipEl.appendChild(key);
      tooltipEl.appendChild(label);
      tooltipEl.appendChild(wrapper);

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

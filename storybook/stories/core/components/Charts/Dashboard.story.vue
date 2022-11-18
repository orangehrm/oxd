<template>
  <div class="orangehrm-dashboard">
    <oxd-grid :cols="3">
      <oxd-grid-item>
        <oxd-sheet :gutters="false" class="orangehrm-dashboard-widget">
          <oxd-text type="card-title">Employee Distribution</oxd-text>
          <oxd-divider />
          <div class="orangehrm-dashboard-widget-body">
            <oxd-pie-chart :data="dataset"></oxd-pie-chart>
          </div>
        </oxd-sheet>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-sheet :gutters="false" class="orangehrm-dashboard-widget">
          <oxd-text type="card-title">
            Employee Distribution (Custom)
          </oxd-text>
          <oxd-divider />
          <div class="orangehrm-dashboard-widget-body">
            <oxd-pie-chart
              :data="dataset"
              :aspect-ratio="false"
              :custom-legend="true"
              :custom-tooltip="true"
              wrapper-classes="emp-distrib-chart"
            ></oxd-pie-chart>
          </div>
        </oxd-sheet>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-sheet :gutters="false" class="orangehrm-dashboard-widget">
          <oxd-text type="card-title"> Time at work </oxd-text>
          <oxd-divider />
          <div class="orangehrm-dashboard-widget-body">
            <oxd-bar-chart
              :data="timeData"
              :grid="false"
              :yAxsis="false"
              :aspect-ratio="false"
            ></oxd-bar-chart>
          </div>
        </oxd-sheet>
      </oxd-grid-item>
    </oxd-grid>
  </div>
</template>

<script>
import Text from '@orangehrm/oxd/core/components/Text/Text';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import PieChart from '@orangehrm/oxd/core/components/Chart/PieChart';
import BarChart from '@orangehrm/oxd/core/components/Chart/BarChart';
import {CHART_COLORS} from '@orangehrm/oxd/core/components/Chart/types';

export default {
  components: {
    'oxd-text': Text,
    'oxd-grid': Grid,
    'oxd-sheet': Sheet,
    'oxd-divider': Divider,
    'oxd-grid-item': GridItem,
    'oxd-pie-chart': PieChart,
    'oxd-bar-chart': BarChart,
  },
  data() {
    return {
      dataset: [
        {
          value: 25,
          label: 'Engineering',
          color: CHART_COLORS.COLOR_FANDANGO_PINK,
        },
        {
          value: 55,
          label: 'Marketing',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 30,
          label: 'Human Resources',
          color: CHART_COLORS.COLOR_PACIFIC_BLUE,
        },
        {
          value: 8,
          label: 'Management',
          color: CHART_COLORS.COLOR_MOUNTAIN_MEADOW,
        },
        {
          value: 60,
          label: 'Accounting',
          color: CHART_COLORS.COLOR_BLEU_DE_FRANCE,
        },
        {
          value: 30,
          label: 'Sales',
          color: CHART_COLORS.COLOR_YELLOW_GREEN,
        },
        {
          value: 40,
          label: 'Book Keeping',
          color: CHART_COLORS.COLOR_MEDIUM_ORCHID,
        },
        {
          value: 100,
          label:
            'Lorem ipsumcdolor sit amet consectetur adipisicing elit maiores voluptatum fuga neque iusto voluptas porro',
          color: CHART_COLORS.COLOR_CHROME_YELLOW,
        },
        {
          value: 7,
          label: 'Legal',
          color: CHART_COLORS.COLOR_MAJORELLE_BLUE,
        },
        {
          value: 150,
          label: 'Other',
          color: CHART_COLORS.COLOR_TART_ORANGE,
        },
      ],
      timeData: [
        {
          value: 4,
          label: 'Sun',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 3.5,
          label: 'Mon',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 0,
          label: 'Tue',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 6.25,
          label: 'Wed',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 8,
          label: 'Thu',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 1.33,
          label: 'Fri',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
        {
          value: 5,
          label: 'Sat',
          color: CHART_COLORS.COLOR_HEAT_WAVE,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-dashboard {
  &-widget {
    padding: 0.75rem;
    margin-bottom: 1rem;
    &-body {
      height: 340px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
      }
      &::-webkit-scrollbar-track {
        background: #f6f5fb;
      }
      &::-webkit-scrollbar-thumb {
        background: #cfd3de;
        border-radius: 1.2rem;
      }
      .emp-distrib-chart {
        height: 330px;
        width: auto;
      }
    }
  }
}
</style>

<template>
  <apexchart
    type="line"
    height="270"
    :options="orderSummaryChartOptions"
    :series="series"
  ></apexchart>
</template>

<script>

export default {
  name: 'OrderSummaryChart',

  props: {
    xData: {
      type: Object,
      default: () => {
        ['周一', '周二', '周二', '周二', '周二', '周二', '周二']
      },
    },
    series: {
      type: Array,
      default: () => [
        {
          name: '已完成',
          data: [165, 175, 162, 173, 160, 195, 160],
          type: 'area',
        },
        {
          name: '已延误',
          data: [168, 168, 155, 178, 155, 170, 170],
          type: 'area',
        },
        {
          name: '待处理',
          data: [175, 190, 175, 178, 190, 178, 200],
          type: 'area',
        },
      ],
    },
  },
  computed: {
    weekDate() {
      return this.$store.state.analysis.weekDate
    },
  },
  data: () => ({
    orderSummaryChartOptions: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#39da8a', '#ff5b5c', '#6485ff'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2.5,
        // dashArray: [0, 8],
      },
      fill: {
        type: 'gradient',
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          gradientToColors: ['#39da8a', '#ff5b5c', '#6485ff'],
          stops: [0, 100],
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        categories: this.weekDate,
        labels: {
          show: true,
          style: {
            colors: '#718096',
          },
        },
      },
    },
  }),
}
</script>

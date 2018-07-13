var myChart = echarts.init(document.querySelector(".charts_left"));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2018注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数','销量']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [3000, 2000, 1800, 1200, 2500, 3500]
    },
    {
      name: '销量',
      type: 'bar',
      data: [2000, 3000, 2500, 2800, 1800, 1500]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


var myChart2 = echarts.init(document.querySelector(".charts_right"));
var option2 = {
  title : {
      text: '热门品牌销售',
      subtext: '2018年7月',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
  },
  series : [
      {
          name: '销售情况',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'新百伦'},
              {value:135, name:'李宁'},
              {value:1548, name:'阿迪王'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};

myChart2.setOption(option2);
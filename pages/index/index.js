// var amapFile = require('../../libs/amap-wx.js');
import amapFile from '../../libs/amap-wx.js'

Page({
  data: {
    city: '正在定位', // 城市
    humidity: '', // 湿度
    weather: '', // 天气
    winddirection: '', // 风向
    windpower: '', //风力
    temperature: '', //温度
    citycode:'', // 城市编码
    weatherArr:[] // 未来天气
  },
  // 获取天气
  getWeathers() {
    var _this = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'bc0ba9f4873ca6513ddb79a353833183' });
    myAmapFun.getWeather({
      success: function (data) {
        //成功回调
        console.log(data)
        _this.setData({
          city: data.city.data,
          temperature: data.temperature.data,
          weather: data.weather.data,
          winddirection: data.winddirection.data,
          windpower: data.windpower.data,
          humidity: data.humidity.data,
          citycode: data.liveData.adcode
        })
        _this.getWeather15();
        // console.log(_this.data.adcode)
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    // _this.getWeather15();
  },
  // 未来天气
  getWeather15(){
    let _this = this;
    let baseUrl = `https://restapi.amap.com/v3/weather/weatherInfo`
    wx.request({
      url: baseUrl,
      method:'get',
      data:{
        city: _this.data.citycode,
        key:'5fcc2efd38555d47c261e07165af4eb1',
        extensions:'all'
      },
      success(ret){
        console.log(ret.data.forecasts[0].casts)
        _this.setData({
          weatherArr: ret.data.forecasts[0].casts
        })
      },
      fail(error){
        console.log(error)
      }
    })
  },
  // 下拉刷新触发
  onPullDownRefresh() {
    this.getWeathers();
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
    this.getWeathers();
    // console.log(this.citycode)
  },
})

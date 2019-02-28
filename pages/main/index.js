import * as api from '../../assets/js/api';
import ConfigUtil from '../../assets/js/ConfigUtil';
import TipUtil from '../../assets/js/TipUtil';
import CommonUtil from '../../assets/js/CommonUtil';
import SearchLyricUtil from '../../assets/js/templates/SearchLyricUtil';

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    rhymePage: CommonUtil.copyObject(SearchLyricUtil.rhymePage)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.redirectTo({
        url: '/pages/authorition/index'
      });
      return;
    }

    this.getRhymeList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeKeyword(e) {
    SearchLyricUtil.changeKeyword(e, this);
  },
  toggleMortgage(e) {
    SearchLyricUtil.toggleMortgage(e, this);
  },
  getRhymeList() {
    SearchLyricUtil.getRhymeList(this);
  }
})
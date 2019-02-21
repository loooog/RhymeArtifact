import TipUtil from '../../../assets/js/TipUtil';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scales: [],
    lyrics: '当我加强了我的脚步来到的2019年 Twenty-three的年纪 掌控这未来的主导权 回顾22年的经历 陪伴 微笑的味道 所有 错过的 爱过的 痛过的 恨过的 全新记号 16岁时出来混从来不需要家里罩 曾经住过的那间地下室 变成时空的隧道 如果能带我穿梭过去 在掩饰所有谎言 新理论的起点 在这骄傲的年纪 开启这新一轮赛点 新一轮的计划 不需要谁来评选 看清楚选择脚下走的路 让自己飞的更远 过去的时光消逝无影踪 笃定梦想可以占据我领空',
    // 录制状态：ready（准备就绪） recording（录制中） pause（已暂停）
    recordState: 'ready',
    recordOption: {
      // 最长4分钟
      duration: 4 * 60 * 1000,
      format: 'mp3'
    },
    RM: null,
    // 伴奏音频
    AAC: null,
    // 试听音频
    TAC: null,
    // 伴奏音频路径
    accompanyPath: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    recordForm: {
      duration: '',
      fileSize: 0,
      path: ''
    },
    tryPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scales = [];
    for (let i = 0; i <= 50; i += 2) {
      if (i % 10 == 0) {
        scales.push(i / 10);
      } else {
        scales.push('');
      }
    }
    this.setData({
      scales
    });

    let RM = wx.getRecorderManager(),
    AAC = wx.createAudioContext('accompanyAudio'),
    TAC = wx.createAudioContext('tryAudio');
    this.setData({
      RM,
      AAC,
      TAC
    });
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
  changeTryPlayState(tryPlaying) {
    this.setData({
      tryPlaying
    });
  },
  tryPlayStart() {
    let recordForm = this.data.recordForm,
    TAC = this.data.TAC;

    if (recordForm.path) {
      TAC.seek(0);
      TAC.play();
      this.changeTryPlayState(true);
    } else {
      TipUtil.message('请录制完成后再试听');
    }
  },
  tryPlayPause() {
    let recordForm = this.data.recordForm,
    TAC = this.data.TAC;

    TAC.pause();
    this.changeTryPlayState(false);
  },
  changeRecordState(recordState) {
    this.setData({
      recordState
    });
  },
  beginRecord() {
    let RM = this.data.RM,
    AAC = this.data.AAC;

    RM.start(this.data.recordOption);
    RM.onStart(() => {
      if (this.recordState == 'ready') {
        // 从头播放
        AAC.seek(0);
      }
      AAC.play();

      this.changeRecordState('recording');
      TipUtil.message('录制中');
    });
  },
  pauseRecord() {
    let RM = this.data.RM,
    AAC = this.data.AAC;

    RM.pause();
    RM.onPause(() => {
      AAC.pause();
      this.changeRecordState('pause');
      TipUtil.message('已暂停录制');
    });
  },
  endRecord() {
    let RM = this.data.RM,
    AAC = this.data.AAC;

    // 正在录制或者暂停
    if (this.data.recordState == 'ready') {
      TipUtil.message('您还没有录制');
      return;
    }

    RM.stop();
    RM.onStop((res) => {
      AAC.pause();
      this.changeRecordState('ready');
      TipUtil.message('已结束录制');

      let recordForm = this.data.recordForm;
      recordForm.duration = res.duration;
      recordForm.fileSize = res.fileSize;
      recordForm.path = res.tempFilePath;
      this.setData({
        recordForm
      });
    });
  }
})
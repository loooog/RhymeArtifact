Component({
  /**
   * 组件的属性列表
   */
  properties: {
    studyVideoPage: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 阻止跳转
    clickShare() {

    },
    toggleVideoCollectionItem(e) {
      this.triggerEvent('toggleVideoCollectionItem', e);
    },
    clickStudyVideoItem(e) {
      this.triggerEvent('clickStudyVideoItem', e);
    },
    generatePoster(e) {
      this.triggerEvent('generatePoster', e);
    }
  }
})

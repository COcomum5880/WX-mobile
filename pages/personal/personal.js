import request from '../../utils/request'
let startY = 0;
let moveY = 0;
let distance = 0;


Page({
  data: {
    coverTransform: '',
    coverTransition: '',
    userInfo: {},
    recentPlayList: []
  },

  //生命周期函数--监听页面加载
  onLoad: async function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    if(userInfo){
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
      
      let recentPlayListData = await request(`/user/record?uid=${this.data.userInfo.userId}&type=0`)
      this.setData({
        recentPlayList: recentPlayListData.allData
      })
    }
  },
  
  handleTouchStart(event){
    this.setData({
      coverTransition: ''
    })
  //----------------------按下------------------------
    startY = event.touches[0].clientY;
  },
  //----------------------移动------------------------
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    distance = moveY - startY;
  //临界值
    if(distance <= 0){
      return;
    }
    if(distance >= 80){
      distance = 80;
    }
    //动态更新状态
    this.setData({
      coverTransform: `translateY(${distance}px)`
    })
  },
  //----------------------抬起------------------------
  handleTouchEnd(){
    this.setData({
      coverTransform: `translateY(0px)`,
      coverTransition: 'transform 1s linear'
    })
  },

  //跳转登录界面
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
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

  }
})


import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 用户名
    password: '' // 密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  // 收集表单相数据
  handleInput(event){
    // 使用id传值获取
    // let type = event.currentTarget.id;
    //使用data-key = value形式获取
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    })
  },
  
  // 登录
  async login(){
    /*
    * 登录流程
    *   1. 收集表单项数据
    *   2. 前端验证
    *     1) 提示用户
    *     2) 结束当前的登录逻辑，不需要发送请求
    *   3. 后端验证
    *     1) 发送请求
    *
    * */
    // 1. 收集表单项数据
    let {phone, password} = this.data;
    
    // 2. 前端验证
    if(!phone || !password){
      // 前端验证不通过
      // 提示用户
      this.showToast('用户名/密码错误')
    }else {
      // 前端验证通过
      // 3. 后端验证
      let result = await request(`/login/cellphone?phone=${phone}&password=${password}`)
      console.log(result);
      if(result.code === 501){// 手机号错误
        this.showToast('手机号错误')
      }else if(result.code === 502){ // 密码错误
        this.showToast('密码错误')
      }else {// 登录成功
        /*
        * 知识回顾：
        *   H5本地存储
        *     1. localStorage： 永久存储，除非人为删除
        *     2. sessionStorage: 会话存储，关闭浏览器页面数据就删除
        * */
        this.showToast('登录成功', 'success');
        // 1. 保存用户数据至本地
        wx.setStorageSync('userInfo', JSON.stringify(result.profile))
        
        // 2. 跳转至个人中心
        wx.switchTab({ // 注意： navigateTo || redirectTo 不能跳转至tabBar页面
          url: '/pages/personal/personal'
        })
      }
    }
  },
  
  // 用于提示消息的功能函数
  showToast(title='', icon='none'){
    wx.showToast({
      title,
      icon
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

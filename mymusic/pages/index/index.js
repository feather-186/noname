// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    item:0,
    tab:0,

    // 播放器列表数据
    playlist:[{
      id:1,
      title:"晴天",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/小段. - 孤单心事.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:2,
      title:"反方向的钟",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/张芸京 - 偏爱.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:3,
      title:"兰亭序",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/東京事変 - 私生活.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:4,
      title:"青花瓷",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/Plastic Tree - 真っ赤な糸.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:5,
      title:"本草纲目",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/Aimer - LAST STARDUST.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:6,
      title:"爱在西元前",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/Ecrolyn - 必杀技.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:7,
      title:"花海",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/G.E.M.邓紫棋 - 多远都要在一起.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:8,
      title:"半岛铁盒",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/mizuki (瑞葵),SawanoHiroyuki[nZk] - aLIEz.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:9,
      title:"轨迹",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/sea蕊,吴炳文Cookie - 独行侠+爱如潮水（remix）.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    },{
      id:10,
      title:"搁浅",
      singer:'周杰伦',
      src:'http://47.106.208.56:8080/Auiod/陈老兮 - Letting Go.mp3',
      coverImgUrl:'/pages/images/yhm.png'
    }
  ],
    state:'paused',/*播放状态码*/
    playIndex:0,
    play:{
      currentTime:'00:00',
      duration:'00:00',
      percent:0,
      title:'',
      singer:'',
      coverImgUrl:'',
    },

  },

  /*滚动条js函数*/
  sliderChange:function(e){
    var second=e.detail.value*this.audioCtx.duration/100
    this.audioCtx.seek(second)
  },
  /*播放/暂停音乐js函数*/
  play:function(){
    this.audioCtx.play()
    this.setData({state:'running'})
  },
  pause:function(){
    this.audioCtx.pause()
    this.setData({state:'paused'})
  },

  audioCtx:null,

  /*播放列表键 */
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },


  onReady:function(index){
    this.audioCtx=wx.createInnerAudioContext()
    var that=this
    //播放失败检测
    this.audioCtx.onError(function(){
      console.log('播放失败：'+that.audioCtx.src)
    })
    //播放结束后自动换下一曲
    this.audioCtx.onEnded(function(){
      that.next()
    })
    //自动更新播放速度
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      that.setData({
        'play.duration':formatTime(that.audioCtx.duration),
        'play.currentTime':formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
    })
    //默认选择第一曲
    this.setMusic(0)
    //格式化时间
    function formatTime(time){
      var minute=Math.floor(time/60)%60;
      var second=Math.floor(time)%60;
      return (minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
    }
  },

  setMusic:function(index){
    var music=this.data.playlist[index]
    this.audioCtx.src=music.src
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      'play.currentTime':'00:00',
      'play.duration':'00:00',
      'play.percent':0
    })
  },

  next:function(){
    this.audioCtx.stop()
    var index=this.data.playIndex>=this.data.playlist.length-1?0:this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state==='running'){
      this.play()
    }
  },

  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
    })
  },

  changePage:function(e){
    this.setData({
      item:e.target.dataset.page
    })
  },

  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },





  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

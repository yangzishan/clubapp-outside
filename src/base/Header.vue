<template>
  <div class="heater">
    <div class="flex-center">
      <div class="left" data-sensors-click>
        <img
          class="back"
          src="../assets/back.png"
          alt=""
          @click="goBack"
          v-if="isShow"
        />
      </div>
      <div class="title no-wrap">{{ title }}</div>
      <div class="right-text" @click="clickRight">
        <p v-if="rightText" :style="{ color: rightTextColor }" style="">
          {{ rightText }}
        </p>
        <i
          v-if="imgPath"
          :style="{ 'background-image': `url(${imgPath})`, 'width':imgWidth, 'height':imgHeight, 'background-size': backgroundSize }"
          class="rightImg"
          data-sensors-click
        ></i>
        <i v-if="rightIcon" :class="rightIcon" data-sensors-click></i>
      </div>
    </div>
  </div>
</template>
<script type="es6">
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });
 export default {
   props:{
	   isShow:{
		   type: Boolean,
		   default:true
	   },
     title: {
       type: String,
       default: ''
     },
     opacity:{
       type:Number,
       default:0
     },
     rightText:{
       type: String,
       default: ''
     },
     imgPath:{
       type: String,
       default: ''
     },
     rightTextColor:{
      type: String,
      default: '#333333'
    },
    rightIcon:{
      type: String,
       default: ''
    },
    imgWidth:{
      type:String,
      default:'0.4rem'
    },
    imgHeight:{
      type:String,
      default:'0.4rem'
    },
    backgroundSize:{
      type:String,
      default:'0.4rem 0.4rem'
    }
   },
data(){
	return{

	}
 },
   methods:{
     goBack(){
       let urlLinkTwo = '';
       let urlLinkOne = window.location.href.split("#/");
       if(urlLinkOne[1].includes("?")){
         urlLinkTwo = (urlLinkOne[1]).split("?")[0];
       }else{
         urlLinkTwo = (urlLinkOne[1]);
       }
       let activityFromLink = localStorage.getItem("activityFrom");
       let startActivityFrom = localStorage.getItem("startActivityFrom");
      //  if(activityFromLink && urlLinkTwo == activityFromLink){
      //    this.$router.push({
      //      path:startActivityFrom
      //    })
      //  }else 
       if(this.$route.query.activityFrom){
         let backUrl = "";
        //  为了兼容活动专区 多级专区相互嵌套  返回配置页面
         if(typeof(this.$route.query.activityFrom)=='string'){
           backUrl = this.$route.query.activityFrom;
         }else{
           backUrl = this.$route.query.activityFrom[0];
         }
         this.$router.push({
           path:backUrl
         })
       }else{
         this.$emit('goBack')
       }
     },
     noBack() {
       window.history.pushState(null, null, document.URL);
     },
     clickRight(){
	     this.$emit('clickRight')
     },
  hideProgress(){
	 NProgress.done();
  }
   },
created(){
   NProgress.start();
},
watch: {
  title: {
    immediate: true,
    deep: true,
    handler(newVal, oldVal) {
      document.title = newVal
    }
  }
},
destroyed(){
	// NProgress.done();
},
mounted(){
	window.hideProgress = this.hideProgress()
  $('#nprogress .peg').css({'display':'none'});
}
 }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.heater {
  height: 0.88rem;
  background: #fff;
}
.flex-center {
  box-sizing: border-box;
  padding: 0rem 0.3rem;
  height: 0.88rem;
  border-bottom: 1px solid #f9f9f9;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 999;
  width: 100%;
  position: fixed;
  height: 0.88rem;
  top: 0;
}
.heater {
  .title {
    font-size: 0.34rem;
    color: #333;
    font-weight: bold;
    flex: 0 0 60%;
    text-align: center;
  }
  .no-wrap{
    height: 0.88rem;
    line-height:0.88rem;
  }
}
.opacity-icon {
  opacity: 0;
}
.right-text {
  p {
    font-size: 0.3rem;
    color: #333333;
    margin-right: 0.06rem;
    font-weight: 500;
    line-height: 0.42rem;
  }
  i {
    font-size: 0.4rem;
  }
}
.left {
  display: flex;
  align-items: center;
  flex: 0 0 20%;
  .back {
    width: 0.22rem;
    height: 0.4rem;
  }
}
.right-text {
  flex: 0 0 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.rightImg {
  background-repeat: no-repeat;
  background-size: 0.4rem 0.4rem;
}
</style>

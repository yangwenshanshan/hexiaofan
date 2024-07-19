<template>
	<view class="freeDialogue-page">
    <view class="freeDialogue-result">
			<scroll-view id="scroll-view" scroll-y :scroll-top="scrollTop" class="result-main">
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
        <view>11111111111111</view>
				<!-- <view class="content" id="content">{{ content }}</view> -->
			</scroll-view>
		</view>
    <view class="opt-content">
      <textarea placeholder="输入你想要说的话"></textarea>
      <view class="btn-list">
        <view class="btn-item item-default">清空</view>
        <view class="btn-item item-default">复制</view>
        <view class="btn-item item-default item-send">发送</view>
      </view>
    </view>
	</view>
</template>

<script>
	import { api } from '../../api'
	export default {
		data() {
			return {
        question: ''
			}
		},
		onLoad(e) {
      this.question = e.value
		},
		methods: {
		},
		onShareAppMessage () {
			return {
				page: '/pages/home/home',
				title: "河小帆",
				imageUrl: 'https://greatchat.lanhejiaoyu.net/static/img/sail-7.png'
			}
		}
	}
</script>

<style lang="scss">
.freeDialogue-page{
  background: $uni-bg-color-grey;
  min-height: 100vh;
  padding: 30rpx;
  .btn-list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    .item-default{
      margin-right: 60rpx;
      width: 150rpx;
      text-align: center;
      background: rgb(179, 194, 175);
      border-radius: 10rpx;
      padding: 20rpx 0;
      box-shadow: 0 5rpx 10rpx 2rpx #748C7C;
    }
    .item-send{
      flex: 1;
      background: #E0722B;
      color: #fff;
      margin-right: 0;
    }
  }
  .freeDialogue-result{
		height: calc(100vh - 400rpx);
		font-size: 32rpx;
    margin-bottom: 50rpx;
		.result-main{
			width: 100%;
			height: 100%;
			overflow: auto;
			white-space: pre-wrap;
			// .content{
			// 	padding-bottom: 40rpx;
			// }
		}
	}
  .opt-content{
    textarea{
      height: 140rpx;
      text-align: left;
      margin-bottom: 20rpx;
    }
  }
}
</style>

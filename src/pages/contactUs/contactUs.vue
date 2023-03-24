<template>
	<view class="plan-page">
    <view class="plan-title">客服微信二维码</view>
		<view class="qrcode">
			<view class="qrcode-image">
				<image :show-menu-by-longpress="true" src="../../static/image/kefu.jpg" mode="aspectFit"></image>
			</view>
		</view>
		<view class="plan-title">客服微信号</view>
		<view class="plan-wechat">lanhekeji007</view>
		<view class="copy-btn">
			<view class="btn-main" @click="copy">点击复制</view>
			<view class="btn-tip">复制后，在微信联系人里添加客服</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			copy () {
				uni.setClipboardData({
					data: 'lanhekeji007'
				})
			}
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
.plan-page{
  background: $uni-bg-color-grey;
	min-height: 100vh;
	.plan-title{
		text-align: center;
		padding: 80rpx 0 40rpx 0;
	}
	.qrcode{
		display: flex;
		align-items: center;
		justify-content: center;
		.qrcode-image{
			background: #fff;
			border-radius: 20rpx;
			padding: 10rpx 0;
			image{
				display: block;
				width: 600rpx;
				height: 600rpx;
				border-radius: 20rpx;
			}
		}
	}
	.plan-wechat{
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 60rpx;
	}
	.copy-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.btn-main{
			color: #fff;
			background: #D56D2A;
			border-radius: 8rpx;
			padding: 20rpx 40rpx;
			box-shadow: 0 4rpx 6rpx $uni-color-theme;
			font-size: 32rpx;
		}
		.btn-tip{
			font-size: 32rpx;
			color: #888;
			padding: 20rpx 0;
		}
	}
}
</style>

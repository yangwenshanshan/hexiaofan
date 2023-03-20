<template>
	<view class="increase-page">
		<view class="increase-text">
			<view class="text-main">支付功能开通中</view>
			<view class="text-main">请添加客服升级次数</view>
		</view>
    <view class="increase-title">客服微信二维码</view>
		<view class="qrcode">
			<view class="qrcode-image">
				<image :src="avatarUrl" mode="aspectFit"></image>
			</view>
		</view>
		<view class="increase-title">客服微信号</view>
		<view class="increase-wechat">lanhekeji007</view>
		<view class="copy-btn">
			<view class="btn-main" @click="copy">点击复制</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
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
		}
	}
</script>

<style lang="scss">
.increase-page{
  background: $uni-bg-color-grey;
	min-height: 100vh;
	.increase-title{
		text-align: center;
		padding: 40rpx 0 20rpx 0;
	}
	.qrcode{
		display: flex;
		align-items: center;
		justify-content: center;
		.qrcode-image{
			background: #fff;
			padding: 40rpx;
			border-radius: 20rpx;
			image{
				width: 300rpx;
				height: 300rpx;
			}
		}
	}
	.increase-wechat{
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	.copy-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		.btn-main{
			color: #fff;
			background: #D56D2A;
			border-radius: 8rpx;
			padding: 20rpx 40rpx;
			box-shadow: 0 4rpx 6rpx $uni-color-theme;
		}
	}
	.increase-text{
		padding-top: 60rpx;
		.text-main{
			text-align: center;
			font-size: 40rpx;
			line-height: 1.5;
			text-shadow: 0 10rpx 6rpx $uni-color-theme;
		}
	}
}
</style>

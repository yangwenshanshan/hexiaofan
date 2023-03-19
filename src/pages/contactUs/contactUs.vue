<template>
	<view class="plan-page">
    <view class="plan-title">客服微信二维码</view>
		<view class="qrcode">
			<view class="qrcode-image">
				<image :src="avatarUrl" mode="aspectFit"></image>
			</view>
		</view>
		<view class="plan-title">客服微信号</view>
		<view class="plan-wechat">lanhekeji007</view>
		<view class="copy-btn">
			<view class="btn-main">点击复制</view>
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
			padding: 40rpx;
			border-radius: 20rpx;
			image{
				width: 300rpx;
				height: 300rpx;
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
		.btn-main{
			color: #fff;
			background: #D56D2A;
			border-radius: 8rpx;
			padding: 20rpx 40rpx;
			box-shadow: 0 4rpx 6rpx $uni-color-theme;
		}
	}
}
</style>

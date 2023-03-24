<template>
	<view class="increase-page">
		<view class="discount-main">
			<view class="discount-item item-weight">
				<image class="" src="../../static/image/icon_discount.png" mode="aspectFit"></image>
				限时优惠中(赠送20次)</view>
			<view class="discount-item item-noneimage">9.9元: 120次(含赠送20次)</view>
		</view>
		<view class="increase-text">
			<view class="text-main">支付功能开通中</view>
			<view class="text-main">请添加客服升级次数</view>
		</view>
    <view class="increase-title">客服微信二维码</view>
		<view class="qrcode">
			<view class="qrcode-image">
				<image :show-menu-by-longpress="true" src="../../static/image/kefu.jpg" mode="aspectFit"></image>
			</view>
		</view>
		<view class="increase-title">客服微信号</view>
		<view class="increase-wechat">lanhekeji007</view>
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
.increase-page{
  background: $uni-bg-color-grey;
	min-height: 100vh;
	.increase-title{
		text-align: center;
		padding: 40rpx 0 20rpx 0;
		font-size: 32rpx;
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
				width: 500rpx;
				height: 500rpx;
				border-radius: 20rpx;
			}
		}
	}
	.increase-wechat{
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
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
	.increase-text{
		padding-top: 40rpx;
		.text-main{
			text-align: center;
			font-size: 40rpx;
			line-height: 1.5;
			text-shadow: 0 10rpx 6rpx $uni-color-theme;
		}
	}
	.discount-main{
		padding: 30rpx 0 40rpx 60rpx;
		border-bottom: 1px solid #ccc;
		.discount-item{
			font-size: 36rpx;
			line-height: 2;
			display: flex;
			align-items: center;
			image{
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
			}
		}
		.item-weight{
			font-weight: bold;
		}
		.item-noneimage{
			padding-left: 80rpx;
		}
	}
}
</style>

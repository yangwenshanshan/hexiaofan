<template>
	<view class="increase-page">
		<view class="discount-main">
			<view class="discount-item item-weight">请选择套餐</view>
			<radio-group @change="radioChange">
				<label class="discount-radio" v-for="item in list" :key="item.id">
					<radio color="#E05108" :value="item.id"/>
					<view class="radio-name" :class="item.id === currentValue ? 'checked' : ''">
						<view class="name-price">{{item.price}}元</view>
						<view class="name-line"></view>
						<view class="name-quota">{{item.quota}}次</view>
					</view>
				</label>
			</radio-group>
			<view class="btn-main-pay">
				<view class="btn-pay" @click="goPay">去支付</view>
			</view>
		</view>
    <view class="increase-title">客服微信二维码</view>
		<view class="qrcode">
			<view class="qrcode-image">
				<image :show-menu-by-longpress="true" src="../../static/image/kefu.jpg" mode="aspectFit"></image>
			</view>
		</view>
		<view class="increase-title">客服微信号</view>
		<view class="increase-wechat">LearingIsTheWay</view>
		<view class="copy-btn">
			<view class="btn-main" @click="copy">点击复制</view>
			<view class="btn-tip">复制后，在微信联系人里添加客服</view>
		</view>
	</view>
</template>

<script>
	import { api } from '../../api'
	export default {
		data() {
			return {
				isIOS: false,
				list: [],
				currentValue: ''
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.isIOS = res.platform === 'ios'
				}
			})
			this.getSubscriptions()
		},
		methods: {
			goPay () {
				if (this.isIOS) {
					uni.navigateTo({
						url: '/pages/iosPay/iosPay'
					})
				} else {
					if (this.currentValue) {
						uni.showLoading()
						api.postPayWechat({
							subscriptionId: this.currentValue
						}).then(res => {
							uni.hideLoading()
							if (res.code === 'SUCCESS') {
								const payment = res.data.payment
								uni.requestPayment({
									timeStamp: payment.timeStamp,
									nonceStr: payment.nonceStr,
									package: payment.packageValue,
									signType: payment.signType,
									paySign: payment.paySign,
									success: (res) => {
										console.log('success', res)
										uni.showToast({
											title: '支付成功',
											icon: 'success'
										})
										setTimeout(() => {
											uni.navigateBack()
										}, 1500);
									},
									fail: (error) => {
										if (!error.errMsg.includes('cancel')) {
											wx.showModal({
												title: '提示',
												content: '支付失败',
												showCancel: false
											})
										}
									}
								})
							}
						}).catch(() => {
							uni.hideLoading()
						})
					}
				}
			},
			getSubscriptions () {
				api.getSubscriptions().then(res => {
					if (res.code === 'SUCCESS') {
						this.list = res.data
					}
				})
			},
			copy () {
				uni.setClipboardData({
					data: 'LearingIsTheWay'
				})
			},
			radioChange (e) {
				this.currentValue = parseInt(e.detail.value)
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
		padding: 30rpx 0 40rpx 0;
		border-bottom: 1px solid #ccc;
		.discount-item{
			font-size: 36rpx;
			line-height: 2;
			display: flex;
			align-items: center;
			justify-content: center;
			// text-shadow: 0 10rpx 6rpx $uni-color-theme;
		}
		.item-weight{
			font-weight: bold;
		}
		.item-noneimage{
			padding-left: 80rpx;
		}
		.discount-radio{
			display: flex;
			width: 100%;
			padding: 20rpx 100rpx;
			.radio-name{
				display: flex;
				width: 100%;
				align-items: center;
				.name-price{
					font-size: 32rpx;
				}
				.name-line{
					flex: 1;
					margin: 0 20rpx;
					border-top: 1px dashed $uni-color-theme;
				}
				.name-quota{
					font-size: 32rpx;
				}
			}
			.checked{
				color: #E05108;
			}
		}
	}
	.btn-main-pay{
		display: flex;
		align-content: center;
		justify-content: center;
		margin-top: 40rpx;
		.btn-pay{
			color: #fff;
			background: $uni-color-theme;
			border-radius: 8rpx;
			padding: 10rpx 40rpx;
			box-shadow: 0 4rpx 6rpx $uni-color-theme;
			font-size: 32rpx;
		}
	}
}
</style>

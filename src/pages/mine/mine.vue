<template>
	<view class="mine-page">
		<view class="mine-avatar" @click="getUserProfile">
			<view class="avatar-image" >
				<image :src="userInfo.avatarUrl" mode="aspectFill"></image>
			</view>
			<view>{{ userInfo.nickName }}</view>
		</view>
		<view class="mine-operate">
			<view class="operate-item">
				<image class="item-icon" src="../../static/image/icon_count.png" mode="aspectFit"></image>
				<text class="operate-text">剩余次数</text>
				<text class="operate-number">{{ data && data.totalQuota ? data.totalQuota : 0 }}</text>
				<view class="add-count-btn" @click="goIncrease">增加次数</view>
			</view>
			<view class="operate-item" @click="goContactUs">
				<image class="item-icon" src="../../static/image/icon_contact.png" mode="aspectFit"></image>
				<text class="operate-text">联系我们</text>
			</view>
			<view class="operate-item" @click="goLeaveMessage">
				<image class="item-icon" src="../../static/image/icon_message.png" mode="aspectFit"></image>
				<text class="operate-text">给我们留言</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '../../api'
	export default {
		data() {
			return {
				data: null,
				code: '',
				userInfo: {
					avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					nickName: '微信用户'
				}
			}
		},
		onShow() {
			uni.login({
				success: (codeInfo) => {
					this.code = codeInfo.code
				}
			})
			this.getQuotaRemaining()
		},
		methods: {
			getUserInfo (query) {
				api.getUserInfo(query).then(res => {
					console.log(res)
				})
			},
			getQuotaRemaining () {
				api.getQuotaRemaining().then(res => {
					if (res.code === 'SUCCESS') {
						this.data = res.data
					}
				})
			},
			goContactUs () {
				uni.navigateTo({
					url: `/pages/contactUs/contactUs`
				})
			},
			goLeaveMessage () {
				uni.navigateTo({
					url: `/pages/leaveUsMessage/leaveUsMessage`
				})
			},
			goIncrease () {
				uni.navigateTo({
					url: `/pages/increase/increase`
				})
			},
			getUserProfile() {
				const userInfo = uni.getStorageSync('user')
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (res) => {
						console.log(res)
						this.getUserInfo({
							code: this.code,
							userId: userInfo.id,
							signature: res.signature,
							rawData: res.rawData,
							encryptedData: res.encryptedData,
							iv: res.iv
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.mine-page{
	background: $uni-bg-color-grey;
	min-height: 100vh;
	.mine-avatar{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0 40rpx;
		height: 400rpx;
		.avatar-image{
			width: 200rpx;
			height: 200rpx;
			display: flex;
			margin-bottom: 30rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}
	.mine-operate{
		background: #E2EAE0;
		height: calc(100vh - 400rpx);
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-shadow: 0 0 20rpx 2rpx $uni-color-theme;
		padding-top: 20rpx;
		.operate-item{
			padding: 0 40rpx 0 60rpx;
			height: 100rpx;
			// line-height: 100rpx;
			border-bottom: 1px solid $uni-color-theme;
			display: flex;
			align-items: center;
			.operate-number{
				color: #D56D2A;
				font-weight: bold;
				margin-left: 40rpx;
				flex: 1;
			}
			.add-count-btn{
				color: #fff;
				background: #D56D2A;
				border-radius: 8rpx;
				padding: 10rpx 20rpx;
			}
			.item-icon{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
		}
	}
}
</style>

<template>
	<view class="mine-page">
		<view class="mine-avatar" @click="getUserProfile">
			<view class="avatar-image" >
				<image v-if="userInfo && userInfo.avatarUrl" :src="userInfo.avatarUrl" mode="aspectFill"></image>
				<image v-else src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132" mode="aspectFill"></image>
			</view>
			<view>{{ userInfo && userInfo.nickName ? userInfo.nickName : '微信用户' }}</view>
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
			<view class="operate-tips">
				<view>你不懂我。</view>
				<view>因为我是迷雾中的一朵花，</view>
				<view>像一片清晨的浅绿，细腻而柔美。</view>
				<view>在日月轮回的呼吸中凝视，</view>
				<view>那些风景，那些故事，</view>
				<view>静静流淌...</view>
			</view>
		</view>

		<view class="masked" v-if="maskVisible">
			<view class="masked-main">
				<view class="masked-title">绑定手机号</view>
				<view class="masked-tips">绑定后将获得<text style="color:rgb(280,51,38)">更多免费</text>次数，同时方便您在网页或APP上继续使用</view>
				<label class="mask-check">
					<checkbox-group @change="checkChange">
						<checkbox style="transform:scale(0.7)" color="#E05108" value="1" />
					</checkbox-group>
					<view>我已阅读并同意<text @click.stop="goPrivacy" style="color:rgb(3, 42, 162)">《服务使用协议》</text></view>
				</label>
				<view class="mask-btn">
					<view class="btn-item" @click="closeMasked">取消</view>
					<view class="btn-item" v-if="!checked" @click="showToastInfo">确定</view>
					<button v-if="checked" @getphonenumber="onGetPhoneNumber" open-type=getPhoneNumber class="btn-item">确定</button>
				</view>
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
				checked: false,
				maskVisible: false,
				userInfo: null
			}
		},
		onShow() {
			this.getCode()
			this.getQuotaRemaining()
			this.userInfo = uni.getStorageSync('user')
		},
		methods: {
			getCode () {
				uni.login({
					success: (codeInfo) => {
						this.code = codeInfo.code
					}
				})
			},
			closeMasked () {
				this.maskVisible = false
			},
			getUserInfo (query) {
				this.getCode()
				api.getUserInfo(query).then(res => {
					if (res.code === 'SUCCESS') {
						this.userInfo = res.data
						uni.setStorageSync('user', res.data)
					}
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
				const userInfo = uni.getStorageSync('user')
				if (userInfo.hasPhoneNumber) {
					uni.navigateTo({
						url: `/pages/increase/increase`
					})
				} else {
					this.maskVisible = true
				}
			},
			onGetPhoneNumber (event) {
				const detail = event.detail
				const userInfo = uni.getStorageSync('user')
				if (detail.code) {
					uni.showLoading()
					api.updatePhoneByWxMiniApp({
						code: detail.code,
						userId: userInfo.id,
						encryptedData: detail.encryptedData,
						iv: detail.iv
					}).then(res => {
						uni.hideLoading()
						if (res.code === 'SUCCESS') {
							if (res.data) {
								this.userInfo = res.data.user
								uni.setStorageSync('user', res.data.user)
							}
							this.maskVisible = false
							this.getQuotaRemaining()
						}
					}).catch(() => {
						uni.hideLoading()
					})
				}
			},
			checkChange (event) {
				const values = event.detail.value
				this.checked = values.includes('1')
			},
			showToastInfo () {
				uni.showToast({
					title: '请勾选同意服务使用协议',
					icon: 'none'
				})
			},
			goPrivacy () {
				uni.navigateTo({
					url: '/pages/privacyAgreement/privacyAgreement'
				})
			},
			getUserProfile() {
				const userInfo = uni.getStorageSync('user')
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (res) => {
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
				font-size: 32rpx;
			}
			.item-icon{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
			.operate-text{
				font-size: 32rpx;
			}
		}
		.operate-tips{
			color: #83998A;
			font-size: 32rpx;
			padding: 20rpx 60rpx 0 60rpx;
			line-height: 1.7;
		}
	}
	.masked{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		padding-top: 300rpx;
		font-size: 32rpx;
		.masked-main{
			width: 650rpx;
			background: #D3DBD1;
			border: 2rpx solid #fff;
			margin: auto;
			border-radius: 10rpx;
			// padding: 40rpx 40rpx 0 40rpx;
			.masked-title{
				text-align: center;
				padding-top: 40rpx;
			}
			.masked-tips{
				line-height: 1.5;
				margin-top: 40rpx;
				padding: 0 40rpx;
			}
			.mask-check{
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				padding: 0 40rpx 40rpx 40rpx;
			}
			.mask-btn{
				display: flex;
				align-items: center;
				justify-content: center;
				.btn-item{
					width: 50%;
					height: 80rpx;
					line-height: 80rpx;
					border: 2rpx solid #ccc;
					text-align: center;
				}
				button{
					font-size: 32rpx;
				}
			}
		}
	}
}
</style>

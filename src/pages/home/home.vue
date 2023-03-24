<template>
	<view class="index-page">
		<view class="home-page" v-if="type === 'home'" :style="'height:' + homePageHeight">
			<view class="content-list">
				<view class="content-item" :style="'margin-bottom:' + marginBottom" @click="goSubPage(item)" v-for="item in titeList" :key="item.index">
					<view class="block-item" :class="'item-style-' + item.index">
						<view class="item-title">{{ item.title }}</view>
					</view>
				</view>
				<view class="btn-more">
					<view class="more-main" @click="goContactUs">我有更多想法</view>
				</view>
			</view>
		</view>
		<view class="mine-page" v-if="type === 'mine'" :style="'height:' + homePageHeight">
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
				<view class="operate-tips" :style="'height:' + tipsHeight">
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
		<view class="bottom-tab" :style="'padding-bottom:' + bottomHeight + 'px;height:' + tabHeight">
			<view class="tab-item" @click="goHome">
				<view class="tab-item-image">
					<image src="../../static/image/icon_home.png"></image>
				</view>
				<view class="tab-item-title">首页</view>
			</view>
			<view class="tab-item" @click="goMine">
				<view class="tab-item-image">
					<image src="../../static/image/icon_people.png"></image>
				</view>
				<view class="tab-item-title">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { api } from '../../api'
	export default {
		data() {
			return {
				homePageHeight: '100vh',
				tabHeight: '120rpx',
				bottomHeight: 0,
				marginBottom: '0rpx',
				tipsHeight: '0rpx',
				data: null,
				code: '',
				checked: false,
				maskVisible: false,
				userInfo: null,
				type: 'home',


				titeList: [{
					index: 1,
					key: 'TSC01',
					en_title: 'creativeLesson',
					title: '创意教案'
				}, {
					index: 2,
					key: 'TSC02',
					en_title: 'makeAStory',
					title: '编个故事'
				}, {
					index: 3,
					key: 'TSC03',
					en_title: 'classroomGame',
					title: '课堂游戏'
				}, {
					index: 4,
					key: 'TSC04',
					en_title: 'speak',
					title: '讲话发言'
				}, {
					index: 5,
					key: 'TSC05',
					en_title: 'familyActivities',
					title: '亲子活动'
				}, {
					index: 6,
					key: 'TSC06',
					en_title: 'communicationMethod',
					title: '沟通方法'
				}, {
					index: 7,
					key: 'TSC07',
					en_title: 'englishScene',
					title: '英文场景'
				}, {
					index: 8,
					key: 'TSC08',
					en_title: 'trainingProgram',
					title: '培训方案'
				}]
			}
		},
		onShow () {
			if (this.type === 'mine') {
				this.mineFun()
			}
		},
		onLoad() {
			wx.getSystemInfo({
				success: (res) => {
					const bottom = res.screenHeight - res.safeArea.bottom
					if (bottom >= 20) {
						this.bottomHeight = bottom - 20
					} else {
						this.bottomHeight = bottom
					}
					this.tabHeight = 'calc(120rpx + ' + this.bottomHeight + 'px)'
					this.homePageHeight = 'calc(100vh - 120rpx - '+ this.bottomHeight + 'px)'
					this.marginBottom = 'calc((100vh - 4 * 176rpx - 300rpx - 120rpx - '+ this.bottomHeight + 'px) / 4)'
					this.tipsHeight = 'calc(100vh - 120rpx - 720rpx - ' + this.bottomHeight + 'px)'
				}
			})
		},
		methods: {
			mineFun () {
				this.getCode()
				this.getQuotaRemaining()
				this.userInfo = uni.getStorageSync('user')
			},
			goContactUs () {
				uni.navigateTo({
					url: `/pages/contactUs/contactUs`
				})
			},
			goSubPage(item) {
				uni.navigateTo({
					url: `/pages/${item.en_title}/${item.en_title}?key=${item.key}`
				})
			},
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
					wx.showLoading()
					api.updatePhoneByWxMiniApp({
						code: detail.code,
						userId: userInfo.id,
						encryptedData: detail.encryptedData,
						iv: detail.iv
					}).then(res => {
						wx.hideLoading()
						if (res.code === 'SUCCESS') {
							if (res.data) {
								this.userInfo = res.data.user
								uni.setStorageSync('user', res.data.user)
							}
							this.maskVisible = false
							this.getQuotaRemaining()
						}
					}).catch(() => {
						wx.hideLoading()
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
			goHome () {
				this.type = 'home'
				uni.setNavigationBarTitle({
					title: '河小帆'
				})
			},
			goMine () {
				this.type = 'mine'
				this.mineFun()
				uni.setNavigationBarTitle({
					title: '我的'
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
$btn-color: #A4C0AE, #D3DBD1, #BDC4AE, #B5C4B1,  #C3DBCD, #AAB4A8, #B6CDB8, #B3CDC6;
.index-page{
	.home-page{
		background: $uni-bg-color-grey;
		height: calc(100vh - 120rpx);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: auto;
		.content-list{
			display: flex;
			flex-wrap: wrap;
			// padding-top: 40rpx;
			.content-item{
				width: 375rpx;
				display: flex;
				justify-content: center;
				.block-item{
					width: 260rpx;
					height: 176rpx;
					border-radius: 20rpx;
					font-size: 48rpx;
					color: $uni-text-color;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 0 4rpx 6rpx #748C7C;
					.item-title{
						width: 120rpx;
						letter-spacing: 10rpx;
						font-weight: bold;
					}
				}
				@each $item in $btn-color{
					$index: index($btn-color, $item);
					.item-style-#{$index}{
						background: $item;
					}
				}
			}
			.btn-more{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.more-main{
					background: #CEDBD4;
					box-shadow: 0 4rpx 6rpx $uni-color-theme;
					font-size: 40rpx;
					width: 360rpx;
					height: 90rpx;
					border-radius: 20rpx;
					font-weight: bold;
					letter-spacing: 10rpx;
					text-align: center;
					line-height: 84rpx;
					color: #666;
				}
			}
		}
	}
	.mine-page{
		background: $uni-bg-color-grey;
		overflow: auto;
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
			// height: 100%;
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
				display: flex;
				flex-direction: column;
				// align-items: center;
				justify-content: center;
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
	.bottom-tab{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #748C7C;
		padding: 10rpx 0;
		height: 120rpx;
		.tab-item{
			padding: 0 40rpx;
			.tab-item-image{
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 50rpx;
					height: 50rpx;
				}
			}
			.tab-item-title{
				font-size: 28rpx;
				color: #fff;
				margin-top: 10rpx;
			}
		}
	}
}
</style>

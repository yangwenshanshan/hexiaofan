<template>
	<view class="index-page">
		<view class="home-page" v-if="type === 'home'" :style="'height:' + homePageHeight">
			<view class="content-list">
				<!-- :style="'margin-bottom:' + marginBottom" -->
				<view class="content-item" @click="goSubPage(item)" v-for="item in titeList" :key="item.index">
					<view class="block-item" :class="'item-style-' + item.index">
						<view class="item-title">{{ item.title }}</view>
						<view class="item-sub_title">{{ item.sub_title }}</view>
					</view>
				</view>
				<view class="home-line">
					<view class="home-line-tips">
						<view class="tip-main">
							<view class="main-content">
								<image class="tip-hand tip-hand-top" src="../../static/image/hand.png"></image>
								<text>快捷模板</text>
							</view>
							<view class="main-content">
								<image class="tip-hand tip-hand-bottom" src="../../static/image/hand.png"></image>
								<text>自由对话</text>
							</view>
						</view>
					</view>
				</view>
				<view class="dialogue">
					<textarea v-model="textareaValue" maxlength="10000" placeholder="输入你想要说的话"></textarea>
					<view class="word-list">
						<view class="word-item" v-for="(item, index) in words" :key="index" @click="goFreeDialogueShortCut(item.content)">{{ item.content }}</view>
					</view>
				</view>
				<view class="home-btn-list">
					<view class="home-btn-item" @click="goFreeDialogue">开始</view>
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
					<view class="operate-hand">
						<image src="../../static/image/hand.png" mode="aspectFill"></image>
					</view>
					<view class="add-count-btn" @click="goIncrease">{{ userInfo && !userInfo.hasPhoneNumber ? '免费增加次数' : '增加次数' }}</view>
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
				textareaValue: '',
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
				words: [{
					content: '安慰朋友的消息',
				}, {
					content: '挑选一件上镜的服装',
				}, {
					content: '考考我世界首都知识',
				}, {
					content: '像本地人一样浏览首尔',
				}, {
					content: '蓝牙耳机坏了，是挂牙科还是耳科',
				}, {
					content: '我想解梦',
				}],
				titeList: [{
					index: 1,
					key: '',
					en_title: 'subHome',
					title: '幼儿教育',
					sub_title: '写招生活动方案、教案、游戏、故事等'
				}, {
					index: 3,
					key: 'TSC09',
					en_title: 'contentGeneration',
					title: '写篇文章',
					sub_title: '编写各类风格的文章、诗词、营销文案等'
				}, {
					index: 5,
					key: 'TSC11',
					en_title: 'originalPapers',
					title: '创作论文',
					sub_title: '根据您的要求撰写论文'
				}, {
					index: 6,
					key: 'TSC12',
					en_title: 'programPlanning',
					title: '活动方案',
					sub_title: '策划活动方案，如团建、出游、比赛等'
				}]
			}
		},
		onShow () {
			if (this.type === 'mine') {
				this.mineFun()
			}
		},
		onLoad(option) {
			if (option.needAuth) {
				this.login()
			}
			if (option.path === 'mine') {
				this.type = 'mine'
			}
			uni.getSystemInfo({
				success: (res) => {
					const bottom = res.screenHeight - res.safeArea.bottom
					if (bottom >= 20) {
						this.bottomHeight = bottom - 20
					} else {
						this.bottomHeight = bottom
					}
					this.tabHeight = 'calc(120rpx + ' + this.bottomHeight + 'px)'
					this.homePageHeight = 'calc(100vh - 120rpx - '+ this.bottomHeight + 'px)'
					this.marginBottom = 'calc((100vh - 3 * 176rpx - 300rpx - 120rpx - '+ this.bottomHeight + 'px) / 4)'
					this.tipsHeight = 'calc(100vh - 120rpx - 720rpx - ' + this.bottomHeight + 'px)'
				}
			})
		},
		methods: {
			goFreeDialogue () {
				if (!this.textareaValue) {
					uni.showToast({
            icon: 'none',
            title: '请输入你想要说的话'
          })
					return
				}
				uni.navigateTo({
					url: `/pages/freeDialogue/freeDialogue?value=${this.textareaValue}`
				})
				setTimeout(() => {
					this.textareaValue = ''
				}, 300)
			},
			goFreeDialogueShortCut (content) {
				uni.navigateTo({
					url: `/pages/freeDialogue/freeDialogue?value=${content}`
				})
			},
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
			},
			login () {
				// #ifdef MP-WEIXIN
				uni.login({
					success: (codeInfo) => {
						api.login({
							code: codeInfo.code
						}).then(res => {
							if (res.code === 'SUCCESS') {
								uni.setStorageSync('token', res.data.token)
								uni.setStorageSync('user', res.data.user)
							}
						})
					}
				})
				// #endif
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
$btn-color: #A4C0AE, #D0DBCE, #BDC4AE, #B5C4B1,  #C3DBCD, #B3CDC6, #B6CDB8, #B3CDC6;
.index-page{
	.home-page{
		background: $uni-bg-color-grey;
		height: calc(100vh - 120rpx);
		overflow: auto;
		.content-list{
			padding: 40rpx;
			.content-item{
				.block-item{
					border-radius: 20rpx;
					padding: 20rpx;
					margin-bottom: 20rpx;
					box-shadow: 0 5rpx 10rpx 2rpx #748C7C;
					.item-title{
						font-size: 36rpx;
						letter-spacing: 10rpx;
						font-weight: bold;
					}
					.item-sub_title{
						font-size: 28rpx;
						margin-top: 10rpx;
					}
				}
				@each $item in $btn-color{
					$index: index($btn-color, $item);
					.item-style-#{$index}{
						background: $item;
					}
				}
			}
			.dialogue{
				textarea{
					height: 140rpx;
					text-align: left;
					margin-bottom: 20rpx;
				}
				.word-list{
					display: flex;
					flex-wrap: wrap;
					.word-item{
						padding: 0 20rpx;
						background: #fff;
						border: 2rpx solid #ccc;
						border-radius: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
						font-size: 28rpx;
						margin-bottom: 10rpx;
						display: flex;
						align-items: center;
					}
				}
			}
			.home-line{
				.home-line-tips{
					display: flex;
					align-items: center;
					justify-content: center;
					&::before{
						content: ' ';
						display: block;
						height: 1rpx;
						background: #ccc;
						flex: 1;
					}
					&::after{
						content: ' ';
						display: block;
						height: 1rpx;
						background: #ccc;
						flex: 1;
					}
					.tip-main{
						margin: 20rpx 0 30rpx 0;
						.main-content{
							display: flex;
							align-items: center;
						}
						.tip-hand{
							width: 45rpx;
							height: 45rpx;
						}
						.tip-hand-bottom{
							transform: rotate(90deg);
						}
						.tip-hand-top{
							transform: rotate(-90deg);
						}
					}
				}
			}
			.home-btn-list{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 20rpx;
				.home-btn-item{
					height: 60rpx;
					background: #E0722B;
					font-weight: bold;
					color: #f0f0f0;
					border-radius: 10rpx;
					text-align: center;
					display: flex;
					align-items: center;
					padding: 0 60rpx;
					border-radius: 60rpx;
					font-size: 36rpx;
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
				.operate-hand{
					image{
						display: flex;
						width: 60rpx;
						height: 60rpx;
						margin-right: 10rpx;
					}
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
				padding: 0rpx 60rpx 0 60rpx;
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

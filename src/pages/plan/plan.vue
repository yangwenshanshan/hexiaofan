<template>
	<view class="plan-page">
    <view class="plan-title">以下结果仅供参考，请根据自身情况适当调整</view>
    <view class="plan-result">
			<scroll-view id="scroll-view" scroll-y :scroll-top="scrollTop" class="result-main">
				<view class="content" id="content">{{ content }}</view>
			</scroll-view>
		</view>
    <view class="plan-btns">
			<icon v-if="!complateFlag" type="loading" size="26"/>
      <view class="btn-item" v-if="complateFlag" @click="copyContent">复制结果</view>
      <view class="btn-item item-disabled" v-else>复制结果</view>
      <view class="btn-item" v-if="!isEn && complateFlag" @click="translateEnglish">{{ isZh ? '转换成英文' : '转换成中文' }}</view>
      <view class="btn-item item-disabled" v-else>转换成英文</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEn: false,
				en_content: '',
				zh_content: '',
				content: '',
				isZh: true,
				socketTask: null,
				complateFlag: false,
				scrollTop: 0
			}
		},
		onUnload () {
			this.closeSocket()
		},
		onLoad(option){
			const query = JSON.parse(decodeURIComponent(option.query))
			this.isEn = !!option.isEn
			this.postScenesChat(query)
		},
		methods: {
			closeSocket () {
				if (this.socketTask) {
					this.socketTask.close()
					this.socketTask = null
				}
			},
			copyContent () {
				uni.setClipboardData({
					data: this.content
				})
			},
			postScenesChat (query, cb) {
				uni.showLoading({
					title: '正在创作中...'
				})
				this.complateFlag = false
				this.content = ''
				let token = uni.getStorageSync('token')
				this.socketTask = uni.connectSocket({
					url: 'wss://greatchat.lanhejiaoyu.net/scenes/chat/ws/' + token,
					header: {
						'Content-Type': 'application/json',
					},
					success: (res) => {
						console.log('connect success', res)
					}
				})
				this.socketTask.onOpen((res) => {
					console.log('open success', res)
					this.socketTask.send({
						data: JSON.stringify(query),
						success: (response) => {
							console.log('send success', response)
						}
					})
				})
				this.socketTask.onError(error => {
					hideLoading()
					uni.showToast({
						title: error.message,
						icon: 'none'
					})
				})
				this.socketTask.onMessage((res) => {
					uni.hideLoading()
					if (res.data === '==DONE==') {
						this.closeSocket()
						this.complateFlag = true
					} else {
						this.content += res.data
					}
					cb && cb(this.content)
					const query = wx.createSelectorQuery()
					query.select('#content').boundingClientRect((res) => {
						this.scrollTop = res.height
					}).exec()
				})
				this.socketTask.onClose(res => {
					console.log('close', res)
					uni.hideLoading()
					if (res.code == 3000) {
						uni.showModal({
							title: '提示',
							content: '哎呀～次数用完啦～先增加次数吧！',
							showCancel: false,
							success: () => {
								uni.navigateTo({
									url: '/pages/mine/mine'
								})
							}
						})
					} else if (res.code == 3001) {
						uni.showModal({
							title: '提示',
							content: '参数解析失败',
							showCancel: false
						})
					} else if (res.code == 3002) {
						uni.showModal({
							title: '提示',
							content: '认证失败',
							showCancel: false
						})
					} else if (res.code !== 1000) {
						uni.showModal({
							title: '提示',
							content: res.reason,
							showCancel: false
						})
					}
				})
			},

			translateEnglish () {
				if (this.isZh) {
					this.zh_content = this.content
					if (!this.en_content) {
						this.postScenesChat({
							sceneKey: 'translate',
							content: this.content
						}, (res) => {
							this.en_content = res
						})
					} else {
						this.content = this.en_content
					}
				} else {
					this.content = this.zh_content
				}
				this.isZh = !this.isZh
			}
		}
	}
</script>

<style lang="scss">
.plan-page{
  background: $uni-bg-color-grey;
	min-height: 100vh;
	.plan-title{
		color: red;
		text-align: center;
		padding: 40rpx 0;
	}
	.plan-result{
		height: calc(100vh - 400rpx);
		padding: 0rpx 40rpx;
		font-size: 32rpx;
		.result-main{
			background: #fff;
			width: 100%;
			height: 100%;
			box-shadow: 0 2rpx 6rpx $uni-color-theme;
			overflow: auto;
			white-space: pre-wrap;
			padding: 0 20rpx;
			.content{
				padding-bottom: 40rpx;
			}
		}
	}
	.plan-btns{
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 40rpx;
		font-size: 32rpx;
		.btn-item{
			width: 240rpx;
			background: #C3DBCD;
			color: $uni-text-color;
			padding: 20rpx 40rpx;
			border-radius: 10rpx;
			box-shadow: 0 2rpx 6rpx $uni-color-theme;
			margin-right: 60rpx;
			text-align: center;
			&:last-of-type{
				margin-right: 0;
			}
		}
		.item-disabled{
			color: #c0c4cc;
			background: #ebeef5;
		}
	}
}
</style>

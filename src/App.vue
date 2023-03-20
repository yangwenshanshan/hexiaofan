<script>
	import { api } from './api'
	export default {
		onLaunch: function() {
			this.addInterceptor()
			this.login()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			addInterceptor () {
				uni.addInterceptor('showLoading', {
					invoke (arg) {
						arg.title = arg.title || '加载中...'
						if (arg.mask === undefined) {
							arg.mask = true
						}
					}
				})
			},
			login () {
				// #ifdef MP-WEIXIN
				uni.login({
					success: (code) => {
						api.login({
							code: code
						}).then(res => {
							console.log(res)
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
@import '@/static/style/reset.scss';

.sub-page{
	padding: 40rpx;
}
.must-block{
	padding: 20rpx 0;
	background: #B3C2AF;
	border-radius: 40rpx;
	box-shadow: 0 4rpx 6rpx $uni-color-theme;
}
.option-block{
	padding: 20rpx 0;
	background: #C3DBCD;
	border-radius: 40rpx;
	box-shadow: 0 4rpx 6rpx $uni-color-theme;
}
.block-view{
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 30rpx;
	.block-title{
		font-size: 32rpx;
		font-weight: bold;
		color: #303B37;
		text-align: center;
		border-bottom: 4rpx solid #7A9081;
		padding: 0 20rpx;
		letter-spacing: 6rpx;
	}
}
.block-sub-view{
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 40rpx;
	.block-sub-title{
		font-size: 32rpx;
		font-weight: bold;
		color: #303B37;
		text-align: center;
		padding: 0 20rpx;
		letter-spacing: 6rpx;
		background: #B3C2AF;
		padding: 10rpx 40rpx;
		border-radius: 10rpx;
	}
}
.block-input{
	padding: 0 80rpx;
	input{
		background: #fff;
		border: 1px solid $uni-color-theme;
		padding: 10rpx;
		border-radius: 10rpx;
		text-align: center;
		font-size: 28rpx;
	}
}
.operate-block{
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 60rpx;
	.submit-btn{
		width: 336rpx;
		height: 80rpx;
		background: #E0722B;
		font-size: 40rpx;
		font-weight: bold;
		color: #f0f0f0;
		border-radius: 10rpx;
		text-align: center;
		line-height: 75rpx;
	}
}
.block-dash-line{
	padding: 20rpx 40rpx;
	.line-main{
		border-bottom: 4rpx dashed #7A9081;
	}
}
.input-tips{
	color: #999;
	font-size: 28rpx;
	text-align: center;
	margin-top: 10rpx;
}
</style>

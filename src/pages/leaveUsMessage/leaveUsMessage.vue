<template>
	<view class="plan-page">
		<view class="textarea">
			<textarea :maxlength="100" placeholder="欢迎提出需求和建议，我们的进步离不开您的反馈" v-model="textValue"></textarea>
			<view class="textarea-tip">{{ textValue.length }}/100</view>
		</view>
		<view class="plan-btn">
			<view class="btn-main" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import { api } from '../../api'
	export default {
		data() {
			return {
				textValue: ''
			}
		},
		onLoad() {
		},
		methods: {
			submit () {
				if (!this.textValue) {
					uni.showToast({
						title: '请填写提交内容',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '提交中...'
				})
				api.postLeaveMessage({
					content: this.textValue
				}).then(res => {
					if (res.code === 'SUCCESS') {
						uni.hideLoading()
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: '提交失败',
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.plan-page{
  background: $uni-bg-color-grey;
	min-height: 100vh;
	padding: 40rpx;
	.textarea{
		border: 2rpx solid #999;
		border-radius: 14rpx;
		background: #fff;
		padding: 0 10rpx 10rpx 0;
		textarea{
			border-radius: 14rpx;
			background: #fff;
			height: 300rpx;
			font-size: 28rpx;
			padding: 20rpx;
			line-height: 1.3;
		}
		.textarea-tip{
			text-align: right;
			font-size: 28rpx;
			letter-spacing: 2rpx;
			color: #888;
		}
	}
	.plan-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 60rpx;
		.btn-main{
			color: #fff;
			background: $uni-color-theme;
			border-radius: 8rpx;
			padding: 20rpx 50rpx;
			box-shadow: 0 4rpx 6rpx $uni-color-theme;
			letter-spacing: 10rpx;
			font-size: 36rpx;
		}
	}
}
</style>

<template>
	<view class="plan-page">
    <view class="plan-title">以下结果仅供参口，请根据自身情况适当调整</view>
    <view class="plan-result">
			<view class="result-main">{{ content }}</view>
		</view>
    <view class="plan-btns">
      <view class="btn-item" @click="">复制结果</view>
      <view class="btn-item item-disabled" v-if="isEn">转换成英文</view>
      <view class="btn-item" v-else @click="translateEnglish">{{ translateEn ? '转换成中文' : '转换成英文' }}</view>
    </view>
	</view>
</template>

<script>
	import { api } from '../../api'
	export default {
		data() {
			return {
				isEn: false,
				en_content: '',
				zh_content: '',
				content: '',
				translateEn: false
			}
		},
		onLoad(option){
			const query = JSON.parse(decodeURIComponent(option.query))
			this.isEn = !!query.isEn
			this.postScenesChat(query)
		},
		methods: {
			postScenesChat () {
				api.postScenesChat().then(res => {
					console.log(res)
					// this.content = res.data.content
				})
			},
			translateEnglish () {
				if (this.translateEn) {
					this.zh_content = this.content
					uni.showLoading()
					api.postScenesTranslate().then(res => {
						console.log(res)
						this.content = res.data.content
						this.en_content = res.data.content
						uni.hideLoading()
					})
				} else {
					this.content = this.zh_content
				}
				this.translateEn = !this.translateEn
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
		padding: 0 40rpx;
		.result-main{
			background: #fff;
			width: 100%;
			height: 100%;
			box-shadow: 0 2rpx 6rpx $uni-color-theme;
		}
	}
	.plan-btns{
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 40rpx;
		.btn-item{
			background: #C3DBCD;
			color: $uni-text-color;
			padding: 20rpx 40rpx;
			border-radius: 10rpx;
			box-shadow: 0 2rpx 6rpx $uni-color-theme;
			margin-right: 60rpx;
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

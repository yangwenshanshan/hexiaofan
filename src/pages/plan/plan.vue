<template>
	<view class="plan-page">
    <view class="plan-title">以下结果仅供参口，请根据自身情况适当调整</view>
    <view class="plan-result">
			<view class="result-main"></view>
		</view>
    <view class="plan-btns">
      <view class="btn-item">复制结果</view>
      <view class="btn-item">转换成英文</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(option){
			// console.log(decodeURIComponent(option.query))
			// const query = JSON.parse(decodeURIComponent(option.query))
			// console.log(query)
		},
		methods: {
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
	}
}
</style>

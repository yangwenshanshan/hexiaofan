<template>
	<view class="home-page">
		<view class="content-list">
			<view class="content-item" @click="goSubPage(item)" v-for="item in titeList" :key="item.index">
				<view class="block-item" :class="'item-style-' + item.index">
					<view class="item-title">{{ item.title }}</view>
				</view>
			</view>
			<view class="btn-more">
				<view class="more-main" @click="goContactUs">我有更多需要</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
		onLoad() {
		},
		methods: {
			goContactUs () {
				uni.navigateTo({
					url: `/pages/contactUs/contactUs`
				})
			},
			goSubPage(item) {
				uni.navigateTo({
					url: `/pages/${item.en_title}/${item.en_title}?key=${item.key}`
				})
			}
		}
	}
</script>

<style lang="scss">
$btn-color: #A4C0AE, #D3DBD1, #BDC4AE, #B5C4B1,  #C3DBCD, #AAB4A8, #B6CDB8, #B3CDC6;
.home-page{
	background: $uni-bg-color-grey;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.content-list{
		display: flex;
		flex-wrap: wrap;
		// padding-top: 40rpx;
		.content-item{
			width: 375rpx;
			display: flex;
			justify-content: center;
			margin-bottom: calc((100vh - 4 * 176rpx - 300rpx) / 4);
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
				color: #888;
			}
		}
	}
}
</style>

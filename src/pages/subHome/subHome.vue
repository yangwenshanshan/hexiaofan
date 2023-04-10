<template>
  <view class="sub-home-page" :style="'height:' + homePageHeight">
    <view class="content-list">
      <view class="content-item" :style="'margin-bottom:' + marginBottom" @click="goSubPage(item)" v-for="(item, index) in titeList" :key="item.index">
        <view class="block-item" :class="'item-style-' + (index + 1)">
          <view class="item-title" v-html="item.title"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				homePageHeight: '100vh',
				marginBottom: '0rpx',
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
					index: 8,
					key: 'TSC08',
					en_title: 'trainingProgram',
					title: '培训方案'
				}, {
					index: 7,
					key: 'TSC07',
					en_title: 'englishScene',
					title: '英文场景'
				}, {
					index: 9,
					key: '',
					en_title: 'contactUs',
					title: '招生</br>1对1'
				}]
				// {
				// 	index: 6,
				// 	key: 'TSC06',
				// 	en_title: 'communicationMethod',
				// 	title: '沟通方法'
				// }
			}
		},
		onShow () {
		},
		onLoad() {
			this.marginBottom = 'calc((100vh - 4 * 176rpx - 120rpx - 300rpx) / 4)'
		},
		methods: {
			goSubPage(item) {
				uni.navigateTo({
					url: `/pages/${item.en_title}/${item.en_title}?key=${item.key}`
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
$btn-color: #A4C0AE, #D3DBD1, #BDC4AE, #B5C4B1,  #C3DBCD, #AAB4A8, #B6CDB8, #97EEE0;
.sub-home-page{
  background: $uni-bg-color-grey;
  height: calc(100vh - 120rpx);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  overflow: auto;
  .content-list{
		padding-top: 140rpx;
    display: flex;
    flex-wrap: wrap;
    // padding-top: 40rpx;
    .content-item{
      width: 375rpx;
      display: flex;
      justify-content: center;
      .block-item{
        width: 270rpx;
        height: 176rpx;
        border-radius: 80rpx;
        font-size: 48rpx;
        color: $uni-text-color;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 6rpx #748C7C;
        .item-title{
          width: 140rpx;
          letter-spacing: 10rpx;
          font-weight: bold;
					text-align: center;
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
        border-radius: 40rpx;
        font-weight: bold;
        letter-spacing: 10rpx;
        text-align: center;
        line-height: 84rpx;
        color: #666;
      }
    }
  }
}
</style>

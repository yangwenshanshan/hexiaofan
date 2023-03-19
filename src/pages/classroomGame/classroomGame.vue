<template>
	<view class="classroomGame-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">年龄段</view>
      </view>
      <radio-list :list="radioList" @change="radioChange"></radio-list>
    </view>
    <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">游戏内容</view>
      </view>
      <view class="block-input">
        <input :maxlength="14" placeholder="最多填写4个词语，不超过10个字" />
      </view>
      <view class="input-tips">*用空格区分词语，如"非洲鼓"或者"海岛  唱歌"</view>
    </view>
    <view class="operate-block">
      <view class="submit-btn" @click="submit">开始写</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        radioList: [{
          value: 1,
          name: '2-3岁'
        }, {
          value: 2,
          name: '3-4岁'
        }, {
          value: 3,
          name: '4-5岁'
        }, {
          value: 4,
          name: '5-6岁'
        }],
        radioId: '',
        input: ''
			}
		},
		onLoad() {

		},
		methods: {
      radioChange (val) {
        this.radioId = val
      },
      submit () {
        const query = {
          radioId: this.radioId,
          input: ''
        }
        uni.navigateTo({
          url: `/pages/plan/plan?query=${encodeURIComponent(JSON.stringify(query))}`
        })
      }
		}
	}
</script>

<style lang="scss">
</style>

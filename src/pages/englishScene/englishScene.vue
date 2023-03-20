<template>
	<view class="englishScene-page sub-page">
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
        <view class="block-title">沟通场景</view>
      </view>
			<radio-list :list="sceneList" :column="2" @change="sceneChange"></radio-list>
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
        sceneList: [{
          value: 1,
          name: '平时教学',
        }, {
          value: 2,
          name: '家长互动'
        }, {
          value: 3,
          name: '户外运动'
        }, {
          value: 4,
          name: '餐饮睡眠'
        }, {
          value: 5,
          name: '外教沟通'
        }, {
          value: 6,
          name: '情绪安抚'
        }, {
          value: 7,
          name: '保健相关'
        }, {
          value: 8,
          name: '安全相关'
        }],
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
        sceneId: '',
        radioId: ''
			}
		},
		onLoad() {

		},
		methods: {
      sceneChange (val) {
        this.sceneId = val
      },
      radioChange (val) {
        this.radioId = val
      },
      submit () {
        const query = {
          sceneId: this.sceneId,
          radioId: this.radioId,
          isEn: true
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

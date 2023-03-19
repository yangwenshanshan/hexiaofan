<template>
	<view class="trainingProgram-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">受训对象</view>
      </view>
      <radio-list :list="radioList" @change="radioChange"></radio-list>
    </view>
    <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">培训重点</view>
      </view>
      <checkbox-list :list="checkboxList" :max="3" @change="checkboxChange"></checkbox-list>
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
        checkboxList: [{
          value: 1,
          name: '教育理论',
        }, {
          value: 2,
          name: '教学技巧'
        }, {
          value: 3,
          name: '师德建设'
        }, {
          value: 4,
          name: '家长沟通'
        }, {
          value: 5,
          name: '健康保健'
        }, {
          value: 6,
          name: '后勤安全'
        }, {
          value: 7,
          name: '餐饮营养'
        }, {
          value: 8,
          name: '招生宣传'
        }],
        radioList: [{
          value: 1,
          name: '毫无经验'
        }, {
          value: 2,
          name: '略有经验'
        }, {
          value: 3,
          name: '较有经验'
        }, {
          value: 4,
          name: '富有经验'
        }],
        checkIds: [],
        radioId: ''
			}
		},
		onLoad() {

		},
		methods: {
      checkboxChange (val) {
        this.checkIds = val
      },
      radioChange (val) {
        this.radioId = val
      },
      submit () {
        const query = {
          checkIds: this.radioId,
          radioId: this.radioId,
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

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
          value: '教育理论',
          name: '教育理论'
        }, {
          value: '教学技巧',
          name: '教学技巧'
        }, {
          value: '师德建设',
          name: '师德建设'
        }, {
          value: '家长沟通',
          name: '家长沟通'
        }, {
          value: '健康保健',
          name: '健康保健'
        }, {
          value: '后勤安全',
          name: '后勤安全'
        }, {
          value: '餐饮营养',
          name: '餐饮营养'
        }, {
          value: '招生宣传',
          name: '招生宣传'
        }],
        radioList: [{
          value: '毫无经验',
          name: '毫无经验'
        }, {
          value: '略有经验',
          name: '略有经验'
        }, {
          value: '较有经验',
          name: '较有经验'
        }, {
          value: '富有经验',
          name: '富有经验'
        }],
        checkIds: [],
        radioId: '',
        sceneKey: ''
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      checkboxChange (val) {
        this.checkIds = val
      },
      radioChange (val) {
        this.radioId = val
      },
      submit () {
        if (!this.radioId) {
          uni.showToast({
            icon: 'error',
            title: '请选择受训对象'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'experience',
            inputType: 'RADIO',
            values: [this.radioId]
          }, {
            name: 'focus',
            inputType: 'RADIO',
            values: this.checkIds
          }],
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

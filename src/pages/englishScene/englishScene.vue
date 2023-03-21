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
          value: '平时教学',
          name: '平时教学'
        }, {
          value: '家长互动',
          name: '家长互动'
        }, {
          value: '户外运动',
          name: '户外运动'
        }, {
          value: '餐饮睡眠',
          name: '餐饮睡眠'
        }, {
          value: '外教沟通',
          name: '外教沟通'
        }, {
          value: '情绪安抚',
          name: '情绪安抚'
        }, {
          value: '保健相关',
          name: '保健相关'
        }, {
          value: '安全相关',
          name: '安全相关'
        }],
        radioList: [{
          value: '2-3',
          name: '2-3岁'
        }, {
          value: '3-4',
          name: '3-4岁'
        }, {
          value: '4-5',
          name: '4-5岁'
        }, {
          value: '5-6',
          name: '5-6岁'
        }],
        sceneId: '',
        radioId: ''
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      sceneChange (val) {
        this.sceneId = val
      },
      radioChange (val) {
        this.radioId = val
      },
      submit () {
        if (!this.radioId) {
          uni.showToast({
            icon: 'error',
            title: '请选择年龄'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'ages',
            inputType: 'RADIO',
            values: [this.radioId]
          }, {
            name: 'scene',
            inputType: 'RADIO',
            values: [this.sceneId]
          }],
        }
        uni.navigateTo({
          url: `/pages/plan/plan?query=${encodeURIComponent(JSON.stringify(query))}&isEn=1`
        })
      }
		}
	}
</script>

<style lang="scss">
</style>

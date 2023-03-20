<template>
	<view class="familyActivities-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">年龄段</view>
      </view>
      <radio-list :list="radioList" @change="radioChange"></radio-list>
			<view class="block-dash-line">
        <view class="line-main"></view>
      </view>
			<view class="block-view">
        <view class="block-title">活动场地</view>
      </view>
      <radio-list :list="venueList" @change="venueChange"></radio-list>
    </view>
    <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">活动时长</view>
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
				venueList: [{
					value: '幼儿园内',
          name: '幼儿园内',
				}, {
					value: '幼儿园外',
          name: '幼儿园外',
				}],
        sceneList: [{
          value: '1',
          name: '1小时左右',
        }, {
          value: '2',
          name: '2小时左右'
        }, {
          value: '3',
          name: '3小时左右'
        }, {
          value: '4',
          name: '4小时左右'
        }, {
          value: '5',
          name: '5小时左右'
        }, {
          value: '6',
          name: '6小时左右'
        }, {
          value: '7',
          name: '7小时左右'
        }, {
          value: '8',
          name: '8小时左右'
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
        radioId: '',
        venueId: '',
        sceneKey: ''
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
      venueChange (val) {
        this.venueId = val
      },
      submit () {
        if (!this.radioId) {
          uni.showToast({
            icon: 'error',
            title: '请选择年龄段'
          })
          return false
        }
        if (!this.venueId) {
          uni.showToast({
            icon: 'error',
            title: '请选择活动场地'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'duration',
            inputType: 'RADIO',
            values: [this.sceneId]
          }, {
            name: 'ages',
            inputType: 'RADIO',
            values: [this.radioId]
          }, {
            name: 'where',
            inputType: 'RADIO',
            values: [this.venueId]
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

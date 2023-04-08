<template>
	<view class="creativeLesson-page sub-page">
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
        <view class="block-title">重点领域</view>
      </view>
      <checkbox-list :list="checkboxList" :max="4" @change="checkboxChange"></checkbox-list>
      <view class="block-dash-line">
        <view class="line-main"></view>
      </view>
      <view class="block-view">
        <view class="block-title">教案主题</view>
      </view>
      <view class="block-input">
        <input v-model="input" placeholder="最多输入5个字" />
      </view>
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
          value: '语言表达',
          name: '语言表达',
        }, {
          value: '逻辑思维',
          name: '逻辑思维'
        }, {
          value: '艺术表现',
          name: '艺术表现'
        }, {
          value: '科学探索',
          name: '科学探索'
        }, {
          value: '社会协作',
          name: '社会协作'
        }, {
          value: '观察能力',
          name: '观察能力'
        }, {
          value: '运动协调',
          name: '运动协调'
        }, {
          value: '批判思维',
          name: '批判思维'
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
        input: '',
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
            title: '请选择年龄段'
          })
          return false
        }
        if (this.input && this.input.length > 5) {
          uni.showToast({
            icon: 'none',
            title: '教案主题不超过5个字'
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
            name: 'field',
            inputType: 'CHECK',
            values: this.checkIds
          }, {
            name: 'subject',
            inputType: 'SENTENCE',
            values: [this.input]
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

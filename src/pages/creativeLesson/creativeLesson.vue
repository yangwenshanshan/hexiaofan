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
        <input :maxlength="5" v-model="input" placeholder="最多输入5个字" />
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
          value: 1,
          name: '语言表达',
        }, {
          value: 2,
          name: '逻辑思维'
        }, {
          value: 3,
          name: '艺术表现'
        }, {
          value: 4,
          name: '科学探索'
        }, {
          value: 5,
          name: '社会协作'
        }, {
          value: 6,
          name: '观察能力'
        }, {
          value: 7,
          name: '运动协调'
        }, {
          value: 8,
          name: '批判思维'
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
        input: '',
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

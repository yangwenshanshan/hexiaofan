<template>
	<view class="makeAStory-page sub-page">
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
        <view class="block-title">发生场景</view>
      </view>
			<radio-list :list="sceneList" :column="3" @change="sceneChange"></radio-list>
      <view class="block-dash-line">
        <view class="line-main"></view>
      </view>
      <view class="block-view">
        <view class="block-title">故事主角</view>
      </view>
      <view class="block-input">
        <input v-model="input" :maxlength="14" placeholder="最多填写四个词语 不超过10个字" />
      </view>
      <view class="input-tips">*用空格区分词语，如"大象  海岛"</view>
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
          name: '家庭',
        }, {
          value: 2,
          name: '幼儿园'
        }, {
          value: 3,
          name: '城堡'
        }, {
          value: 4,
          name: '公园'
        }, {
          value: 5,
          name: '海洋'
        }, {
          value: 6,
          name: '森林'
        }, {
          value: 7,
          name: '草原'
        }, {
          value: 8,
          name: '沙漠'
        }, {
          value: 9,
          name: '大街'
        }, {
          value: 10,
          name: '小河'
        }, {
          value: 11,
          name: '雪山'
        }, {
          value: 12,
          name: '海岛'
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
        radioId: '',
        input: ''
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

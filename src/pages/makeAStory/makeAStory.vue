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
        <input v-model="input" placeholder="最多填写四个词语 不超过10个字" />
      </view>
      <view class="input-tips">*用逗号区分词语，如"大象，海岛"</view>
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
          value: '家庭',
          name: '家庭'
        }, {
          value: '幼儿园',
          name: '幼儿园'
        }, {
          value: '城堡',
          name: '城堡'
        }, {
          value: '公园',
          name: '公园'
        }, {
          value: '海洋',
          name: '海洋'
        }, {
          value: '森林',
          name: '森林'
        }, {
          value: '草原',
          name: '草原'
        }, {
          value: '沙漠',
          name: '沙漠'
        }, {
          value: '大街',
          name: '大街'
        }, {
          value: '小河',
          name: '小河'
        }, {
          value: '雪山',
          name: '雪山'
        }, {
          value: '海岛',
          name: '海岛'
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
        sceneKey: '',
        sceneId: '',
        radioId: '',
        input: ''
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
        if (this.input && this.input.length > 13) {
          uni.showToast({
            icon: 'none',
            title: '最多填写四个词语 不超过10个字'
          })
          return false
        }
        if (!this.radioId) {
          uni.showToast({
            icon: 'error',
            title: '请选择年龄段'
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
          }, {
            name: 'roles',
            inputType: 'WORD',
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

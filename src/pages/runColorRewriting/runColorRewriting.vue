<template>
	<view class="runColorRewriting-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">原文</view>
      </view>
      <view class="block-input">
        <textarea v-model="originalContent" placeholder="请将原文粘贴在这里，不超1000个字"></textarea>
      </view>
      <view class="block-dash-line">
        <view class="line-main"></view>
      </view>
      <view class="block-view">
        <view class="block-title">修改目标</view>
      </view>
			<radio-list :list="sceneList" @change="sceneChange"></radio-list>
    </view>
    <!-- <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">修改目标</view>
      </view>
			<radio-list :list="sceneList" @change="sceneChange"></radio-list>
    </view> -->
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
          value: '润色修饰',
          name: '润色修饰'
        }, {
          value: '改为文言文',
          name: '改为文言文'
        }, {
          value: '改为营销风格',
          name: '改为营销风格'
        }, {
          value: '改为诗词风格',
          name: '改为诗词风格'
        }],
        sceneKey: '',
        target: '',
        originalContent: ''
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      sceneChange (val) {
        this.target = val
      },
      submit () {
        if (!this.originalContent) {
          uni.showToast({
            icon: 'error',
            title: '请选输入原文'
          })
          return false
        }
        if (!this.target) {
          uni.showToast({
            icon: 'error',
            title: '请选择修改目标'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'target',
            inputType: 'RADIO',
            values: [this.target]
          }, {
            name: 'original_content',
            inputType: 'SENTENCE',
            values: [this.originalContent]
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
.runColorRewriting-page{
  .block-input{
    padding: 0 40rpx;
    textarea{
      text-align: left;
    }
  }
}
</style>

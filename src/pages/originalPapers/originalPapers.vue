<template>
	<view class="originalPapers-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">论文主题</view>
      </view>
      <view class="block-input">
        <input v-model="subject" placeholder="主题描述越完整，结果越好。不超15个字" />
      </view>
      <view class="tips-left">
        <view class="input-tips">例1：当代饮食习惯对健康的重要性</view>
        <view class="input-tips">例2：情绪对工作的影响</view>
        <view class="input-tips">例3：好天气与恋爱成功率的关系</view>
      </view>
    </view>
    <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">所属领域</view>
      </view>
      <view class="block-input">
        <input v-model="field" placeholder="越准确详细，结果越好。不超过8个字" />
      </view>
      <view class="input-tips">如“食品健康”,“社会科学”,“学前教育”等</view>
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
        sceneKey: '',
        subject: '',
        field: ''
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      submit () {
        if (this.subject && this.subject.length > 15) {
          uni.showToast({
            icon: 'none',
            title: '主题描述不超15个字'
          })
          return false
        }
        if (this.field && this.field.length > 8) {
          uni.showToast({
            icon: 'none',
            title: '所属领域不超8个字'
          })
          return false
        }
        if (!this.subject) {
          uni.showToast({
            icon: 'error',
            title: '请输入论文主题'
          })
          return false
        }
        uni.showModal({
          title: '提示',
          content: '每篇论文消耗5个(原价10个)使用次数。是否继续',
        }).then(res => {
          if (res.confirm) {
            const query = {
              sceneKey: this.sceneKey,
              fields: [{
                name: 'field',
                inputType: 'SENTENCE',
                values: [this.field]
              }, {
                name: 'subject',
                inputType: 'SENTENCE',
                values: [this.subject]
              }],
            }
            uni.navigateTo({
              url: `/pages/plan/plan?query=${encodeURIComponent(JSON.stringify(query))}`
            })
          }
        })
      }
		}
	}
</script>

<style lang="scss">
.originalPapers-page{
  .block-input{
    padding: 0 40rpx;
  }
  .tips-left{
    .input-tips{
      color: #555;
      text-align: left;
      padding-left: 60rpx;
    }
  }
}
</style>

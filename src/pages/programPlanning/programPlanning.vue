<template>
	<view class="programPlanning-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">题目</view>
      </view>
      <view class="block-input">
        <input v-model="title" placeholder="题目描述越完整，结果越好。不超过15个字" />
      </view>
      <view class="tips-left">
        <view class="input-tips">例1：公司团建怎么搞</view>
        <view class="input-tips">例2：小学生编程比赛</view>
        <view class="input-tips">例3：社区公益活动方案</view>
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
      <view class="input-tips">如“食品健康”,“社会科学”,“公共服务”等</view>
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
        title: '',
        field: ''
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      submit () {
        if (this.title && this.title.length > 15) {
          uni.showToast({
            icon: 'none',
            title: '题目不超过15个字'
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
        if (!this.title) {
          uni.showToast({
            icon: 'error',
            title: '请输入题目'
          })
          return false
        }
        uni.showModal({
          title: '提示',
          content: '每篇论文消耗2个(原价4个)使用次数。是否继续',
        }).then(res => {
          if (res.confirm) {
            const query = {
              sceneKey: this.sceneKey,
              fields: [{
                name: 'field',
                inputType: 'SENTENCE',
                values: [this.field]
              }, {
                name: 'title',
                inputType: 'SENTENCE',
                values: [this.title]
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
.programPlanning-page{
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

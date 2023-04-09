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
        <view class="input-tips" v-for="(item, index) in tipList" :key="index">例{{ index + 1 }}：{{ item.exampleValue }}</view>
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
  import { api } from '../../api'
	export default {
		data() {
			return {
        sceneKey: '',
        title: '',
        field: '',
        tempTipList: [{
          exampleValue: '公司团建怎么搞'
        }, {
          exampleValue: '小学生编程比赛'
        }, {
          exampleValue: '社区公益活动方案'
        }],
        tipList: []
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
      this.tipList = this.tempTipList
      this.getSencesExamplesSearch()
		},
		methods: {
      getSencesExamplesSearch () {
       api.getSencesExamplesSearch({
          sceneKey: this.sceneKey,
          fieldName: "title"
        }).then(res => {
          if (res.code === 'SUCCESS' && res.data && res.data.length) {
            this.tipList = res.data
          } else {
            this.tipList = this.tempTipList
          }
        })
      },
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

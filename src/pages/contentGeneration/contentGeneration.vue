<template>
	<view class="makeAStory-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">题目</view>
      </view>
      <view class="block-input">
        <input v-model="title" placeholder="输入文章题目，不超15个字" />
      </view>
      <view class="input-tips">*题目越具体，生成结果越好</view>
    </view>
    <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">表达倾向</view>
      </view>
			<radio-list :list="sceneList" @change="sceneChange"></radio-list>
      <view class="block-dash-line">
        <view class="line-main"></view>
      </view>
      <view class="block-view">
        <view class="block-title">文体文风</view>
      </view>
      <radio-list :list="radioList" @change="radioChange"></radio-list>
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
          value: '清新优美',
          name: '清新优美'
        }, {
          value: '恬淡宁谧',
          name: '恬淡宁谧'
        }, {
          value: '爱慕之情',
          name: '爱慕之情'
        }, {
          value: '悲惨凄凉',
          name: '悲惨凄凉'
        }, {
          value: '豪放旷达',
          name: '豪放旷达'
        }, {
          value: '婉约隽永',
          name: '婉约隽永'
        }],
        radioList: [{
          value: '文言文',
          name: '文言文'
        }, {
          value: '散文体',
          name: '散文体'
        }, {
          value: '鲁迅风格',
          name: '鲁迅风格'
        }, {
          value: '后现代风',
          name: '后现代风'
        }, {
          value: '诗词风格',
          name: '诗词风格'
        }, {
          value: '营销风格',
          name: '营销风格'
        }],
        sceneKey: '',
        expression: '',
        style: '',
        title: ''
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      sceneChange (val) {
        this.expression = val
      },
      radioChange (val) {
        this.style = val
      },
      submit () {
        if (this.title && this.title.length > 15) {
          uni.showToast({
            icon: 'none',
            title: '文章题目不超15个字'
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
            name: 'style',
            inputType: 'RADIO',
            values: [this.style]
          }, {
            name: 'expression',
            inputType: 'RADIO',
            values: [this.expression]
          }, {
            name: 'title',
            inputType: 'WORD',
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
</style>

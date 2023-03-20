<template>
	<view class="speak-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">发言场合</view>
      </view>
      <radio-list :list="radioList" @change="radioChange"></radio-list>
    </view>
    <view class="block-sub-view">
      <view class="block-sub-title">选填项</view>
    </view>
    <view class="option-block">
      <view class="block-view">
        <view class="block-title">突出重点</view>
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
        sceneList: [{
          value: '鼓舞士气',
          name: '鼓舞士气'
        }, {
          value: '产生共情',
          name: '产生共情'
        }, {
          value: '总结成绩',
          name: '总结成绩'
        }, {
          value: '展望未来',
          name: '展望未来'
        }, {
          value: '展示专业',
          name: '展示专业'
        }, {
          value: '改革制度',
          name: '改革制度'
        }],
        radioList: [{
          value: '开家长会',
          name: '开家长会'
        }, {
          value: '开学典礼',
          name: '开学典礼'
        }, {
          value: '学期总结',
          name: '学期总结'
        }, {
          value: '员工大会',
          name: '员工大会'
        }],
        sceneKey: '',
        sceneId: '',
        radioId: ''
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
        if (!this.radioId) {
          uni.showToast({
            icon: 'error',
            title: '请选择发言场合'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'occasion',
            inputType: 'RADIO',
            values: [this.radioId]
          }, {
            name: 'focus',
            inputType: 'RADIO',
            values: [this.sceneId]
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

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
          value: 1,
          name: '鼓舞士气',
        }, {
          value: 2,
          name: '产生共情'
        }, {
          value: 3,
          name: '总结成绩'
        }, {
          value: 4,
          name: '展望未来'
        }, {
          value: 5,
          name: '展示专业'
        }, {
          value: 6,
          name: '改革制度'
        }],
        radioList: [{
          value: 1,
          name: '开家长会'
        }, {
          value: 2,
          name: '开学典礼'
        }, {
          value: 3,
          name: '学期总结'
        }, {
          value: 4,
          name: '员工大会'
        }],
        sceneId: '',
        radioId: ''
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

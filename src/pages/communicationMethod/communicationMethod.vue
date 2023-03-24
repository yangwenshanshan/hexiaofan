<template>
	<view class="communicationMethod-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">沟通目的</view>
      </view>
			<radio-group @change="parentChange">
				<view v-for="item in radioList" :key="item.value">
					<label class="list-cell">
						<radio style="transform:scale(0.7)" color="#E05108" :value="item.value" :checked="item.checked" />
						<view class="radio-name" :class="item.checked ? 'checked' : ''">{{item.name}}</view>
					</label>
					<view  class="radio-list">
						<radio-list @change="radioChange" :disabled="(parentId && parentId !== item.value) || !parentId" ref="radioList" :list="item.children"></radio-list>
					</view>
				</view>
			</radio-group>
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
				parentId: 0,
				childrenId: 0,
        radioList: [{
					value: '与家长沟通',
					name: '与家长沟通',
					children: [{
						value: '肯定孩子表现',
						name: '肯定孩子表现',
					}, {
						value: '反应孩子调皮',
						name: '反应孩子调皮'
					}, {
						value: '促进家园合作',
						name: '促进家园合作'
					}, {
						value: '提示按时出勤',
						name: '提示按时出勤'
					}]
				}, {
					value: '与孩子沟通',
					name: '与孩子沟通',
					children: [{
						value: '表扬态度积极',
						name: '表扬态度积极'
					}, {
						value: '鼓励多多发言',
						name: '鼓励多多发言'
					}, {
						value: '强调团结互助',
						name: '强调团结互助'
					}, {
						value: '提升文明程度',
						name: '提升文明程度'
					}]
				}, {
					value: '与领导沟通',
					name: '与领导沟通',
					children: [{
						value: '说明工作繁重',
						name: '说明工作繁重'
					}, {
						value: '提升自身能力',
						name: '提升自身能力'
					}, {
						value: '传达涨薪诉求',
						name: '传达涨薪诉求'
					}, {
						value: '协商离职事宜',
						name: '协商离职事宜'
					}]
				}, {
					value: '与下属沟通',
					name: '与下属沟通',
					children: [{
						value: '肯定工作表现',
						name: '肯定工作表现'
					}, {
						value: '传达不满意见',
						name: '传达不满意见'
					}, {
						value: '提醒遵守制度',
						name: '提醒遵守制度'
					}, {
						value: '通知解聘事宜',
						name: '通知解聘事宜'
					}]
				}, {
					value: '与同事沟通',
					name: '与同事沟通',
					children: [{
						value: '解决矛盾冲突',
						name: '解决矛盾冲突'
					}, {
						value: '安慰沮丧情绪',
						name: '安慰沮丧情绪'
					}]
				}, {
					value: '与外部机构沟通',
					name: '与外部机构沟通',
					children: [{
						value: '招生引流合作',
						name: '招生引流合作'
					}]
				}]
			}
		},
		onLoad(option) {
			this.sceneKey = option.key
		},
		methods: {
			parentChange (e) {
				this.childrenId = ''
				this.parentId = e.detail.value
				const component = this.$refs.radioList
				for (let index = 0; index < component.length; index++) {
					const element = component[index];
					element.initRadio()
				}
			},
			radioChange (val) {
				this.childrenId = val
			},
			submit () {
        if (!this.parentId) {
          uni.showToast({
            icon: 'error',
            title: '请选择大项'
          })
          return false
        }
        if (!this.childrenId) {
          uni.showToast({
            icon: 'error',
            title: '请选择小项'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'purpose',
            inputType: 'RADIO',
            values: [this.parentId]
          }, {
            name: 'target',
            inputType: 'RADIO',
            values: [this.childrenId]
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
.communicationMethod-page{
	.list-cell{
		display: flex;
		padding-left: 20rpx;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		align-items: center;
		.radio-name{
			color: #303B37;
			// letter-spacing: 4rpx;
		}
		.checked{
			color: #E05108;
		}
	}
	.radio-list{
		padding-left: 40rpx;
	}
}
</style>

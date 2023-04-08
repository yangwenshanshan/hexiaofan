<template>
	<view class="rescueTheSocialTerror-page sub-page">
    <view class="must-block">
      <view class="block-view">
        <view class="block-title">您的身份</view>
      </view>
      <view class="block-input">
        <input v-model="identity" placeholder="填写或从下面选择，不超6个字" />
      </view>
      <view class="item-list">
        <view class="item-block" @click="chooseBlock(item, 'identity')" v-for="(item, index) in identityList" :key="index">{{ item }}</view>
      </view>
      <view class="block-dash-line">
        <view class="line-main"></view>
      </view>
      <view class="block-view">
        <view class="block-title">沟通对象</view>
      </view>
      <view class="block-input">
        <input v-model="partner" placeholder="填写或从下面选择，不超6个字" />
      </view>
      <view class="item-list">
        <view class="item-block" @click="chooseBlock(item, 'partner')" v-for="(item, index) in objectList" :key="index">{{ item }}</view>
      </view>
      <view class="block-dash-line">
        <view class="line-main"></view>
      </view>
      <view class="block-view">
        <view class="block-title">沟通目的</view>
      </view>
      <view class="block-input">
        <input v-model="target" placeholder="填写或从下面选择，不超8个字" />
      </view>
      <view class="item-list">
        <view class="item-block" @click="chooseBlock(item, 'target')" v-for="(item, index) in purposeList" :key="index">{{ item }}</view>
      </view>
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
        identityList: ['员工', '上级', '教师', '长辈', '渣男', '渣女', '下属', '学生', '吃货', '同事', '白痴', '白富美'],
        objectList: ['员工', '家长', '教师', '长辈', '渣男', '渣女', '下属', '学生', '吃货', '同事', '白痴', '白富美'],
        purposeList: ['表扬态度积极', '给我涨工资', '道歉', '跟他分手', '让她减肥', '炫富', '让他认真学习', '今晚去蹦迪', '为酒后吹牛找借口'],
        sceneKey: '',
        identity: '',
        partner: '',
        target: '',
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
		},
		methods: {
      chooseBlock (name, key) {
        this[key] = name
      },
      submit () {
        if (this.identity && this.identity.length > 6) {
          uni.showToast({
            icon: 'none',
            title: '您的身份不超过6个字'
          })
          return false
        }
        if (this.partner && this.partner.length > 6) {
          uni.showToast({
            icon: 'none',
            title: '沟通对象不超6个字'
          })
          return false
        }
        if (this.target && this.target.length > 8) {
          uni.showToast({
            icon: 'none',
            title: '沟通目的不超8个字'
          })
          return false
        }
        if (!this.identity) {
          uni.showToast({
            icon: 'error',
            title: '请选择您的身份'
          })
          return false
        }
        if (!this.partner) {
          uni.showToast({
            icon: 'error',
            title: '请选择沟通对象'
          })
          return false
        }
        if (!this.target) {
          uni.showToast({
            icon: 'error',
            title: '请选择沟通目的'
          })
          return false
        }
        const query = {
          sceneKey: this.sceneKey,
          fields: [{
            name: 'identity',
            inputType: 'WORD',
            values: [this.identity]
          }, {
            name: 'partner',
            inputType: 'WORD',
            values: [this.partner]
          }, {
            name: 'target',
            inputType: 'WORD',
            values: [this.target]
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
.rescueTheSocialTerror-page{
  .item-list{
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 30rpx 0 30rpx;
    .item-block{
      background: rgb(98, 121, 111);
      color: #fff;
      border-radius: 16rpx;
      font-size: 24rpx;
      height: 46rpx;
      line-height: 46rpx;
      padding: 0 20rpx;
      margin-right: 6rpx;
      margin-bottom: 10rpx;
    }
  }
}
</style>

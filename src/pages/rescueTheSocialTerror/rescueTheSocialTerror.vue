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
        <view class="item-block" @click="chooseBlock(item.exampleValue, 'identity')" v-for="(item, index) in identityList" :key="index">{{ item.exampleValue }}</view>
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
        <view class="item-block" @click="chooseBlock(item.exampleValue, 'partner')" v-for="(item, index) in objectList" :key="index">{{ item.exampleValue }}</view>
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
        <view class="item-block" @click="chooseBlock(item.exampleValue, 'target')" v-for="(item, index) in purposeList" :key="index">{{ item.exampleValue }}</view>
      </view>
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
        identityList: [],
        objectList: [],
        purposeList: [],
        tempIdentityList: [
          {"exampleValue": "员工"},
          {"exampleValue": "上级"},
          {"exampleValue": "教师"},
          {"exampleValue": "长辈"},
          {"exampleValue": "渣男"},
          {"exampleValue": "渣女"},
          {"exampleValue": "下属"},
          {"exampleValue": "学生"},
          {"exampleValue": "吃货"},
          {"exampleValue": "同事"},
          {"exampleValue": "白痴"},
          {"exampleValue": "白富美"}
        ],
        tempObjectList: [
          {"exampleValue": "员工"},
          {"exampleValue": "家长"},
          {"exampleValue": "教师"},
          {"exampleValue": "长辈"},
          {"exampleValue": "渣男"},
          {"exampleValue": "渣女"},
          {"exampleValue": "下属"},
          {"exampleValue": "学生"},
          {"exampleValue": "吃货"},
          {"exampleValue": "同事"},
          {"exampleValue": "白痴"},
          {"exampleValue": "白富美"}
        ],
        tempPurposeList: [
          {"exampleValue": "表扬态度积极"},
          {"exampleValue": "给我涨工资"},
          {"exampleValue": "道歉"},
          {"exampleValue": "跟他分手"},
          {"exampleValue": "让她减肥"},
          {"exampleValue": "炫富"},
          {"exampleValue": "让他认真学习"},
          {"exampleValue": "今晚去蹦迪"},
          {"exampleValue": "为酒后吹牛找借口"}
        ],
        sceneKey: '',
        identity: '',
        partner: '',
        target: '',
			}
		},
		onLoad(option) {
      this.sceneKey = option.key
      this.identityList = this.tempIdentityList
      this.objectList = this.tempObjectList
      this.purposeList = this.tempPurposeList
      this.getSencesExamplesSearch1()
      this.getSencesExamplesSearch2()
      this.getSencesExamplesSearch3()
		},
		methods: {
      getSencesExamplesSearch1 () {
       api.getSencesExamplesSearch({
          sceneKey: this.sceneKey,
          fieldName: "identity"
        }).then(res => {
          if (res.code === 'SUCCESS' && res.data && res.data.length) {
            this.identityList = res.data
          } else {
            this.identityList = this.tempIdentityList
          }
        })
      },
      getSencesExamplesSearch2 () {
       api.getSencesExamplesSearch({
          sceneKey: this.sceneKey,
          fieldName: "partner"
        }).then(res => {
          if (res.code === 'SUCCESS' && res.data && res.data.length) {
            this.objectList = res.data
          } else {
            this.objectList = this.tempObjectList
          }
        })
      },
      getSencesExamplesSearch3 () {
       api.getSencesExamplesSearch({
          sceneKey: this.sceneKey,
          fieldName: "target"
        }).then(res => {
          if (res.code === 'SUCCESS' && res.data && res.data.length) {
            this.purposeList = res.data
          } else {
            this.purposeList = this.tempPurposeList
          }
        })
      },
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

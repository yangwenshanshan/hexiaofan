<template>
	<view class="radio-list-component">
    <radio-group class="radio-group" @change="radioChange">
      <label :style="'width:' + (100 / column) + '%'" class="list-cell" v-for="item in list" :key="item.value">
        <radio :disabled="disabled" style="transform:scale(0.7)" color="#E05108" :value="item.value" :checked="item.value === currentValue" />
        <view class="radio-name" :class="item.value === currentValue ? 'checked' : ''">{{item.name}}</view>
      </label>
    </radio-group>
	</view>
</template>

<script>
	export default {
    props: {
      column: {
        type: Number,
        default: 2
      },
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
		data() {
			return {
        currentValue: ''
			}
		},
		methods: {
      radioChange (e) {
        this.currentValue = e.detail.value
        this.$emit('change', this.currentValue)
      },
      initRadio () {
        this.currentValue = ''
      }
		}
	}
</script>

<style lang="scss">
.radio-list-component{
  .radio-group{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .list-cell{
      display: flex;
      padding-left: 40rpx;
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
  }
}
</style>

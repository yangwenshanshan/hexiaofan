<template>
	<view class="checkbox-list-component">
    <checkbox-group class="checkbox-group" @change="checkboxChange">
      <label :style="'width:' + (100 / column) + '%'" class="list-cell" v-for="item in checkboxList" :key="item.value">
        <checkbox style="transform:scale(0.7)" :disabled="max && !item.checked && values.length >= max" color="#E05108" :value="item.value" :checked="item.checked" />
        <view class="checkbox-name" :class="item.checked ? 'checked' : ''">{{item.name}}</view>
      </label>
    </checkbox-group>
	</view>
</template>

<script>
	export default {
    props: {
      column: {
        type: Number,
        default: 2
      },
      max: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
		data() {
			return {
        checkboxList: [],
        values: []
			}
		},
    created () {
      this.checkboxList = JSON.parse(JSON.stringify(this.list))
    },
		methods: {
      checkboxChange (e) {
        const values = e.detail.value
        this.values = values
        this.checkboxList.forEach(el => {
          if (values.includes(el.value + '')) {
            this.$set(el, 'checked', true)
          } else {
            this.$set(el, 'checked', false)
          }
        })
        this.$emit('change', values)
      }
		}
	}
</script>

<style lang="scss">
.checkbox-list-component{
  .checkbox-group{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .list-cell{
      display: flex;
      padding-left: 40rpx;
      font-size: 32rpx;
      margin-bottom: 20rpx;
      align-items: center;
      .checkbox-name{
        color: #303B37;
        letter-spacing: 10rpx;
      }
      .checked{
        color: #E05108;
      }
    }
  }
}
</style>

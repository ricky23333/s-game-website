<template>
  <div class="submit-identify disabled-select" :style="`width:${width}; height:${height}`" @click="refreshCode">
    <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{item.code}}</span>
  </div>
</template>

<script>
  export default {
    name: 'submit-identify',
    props: {
      width: {
        type: String,
        default: '100px'
      },
      height: {
        type: String,
        default: '35px'
      },
    },
    data() {
      return {
        codeList: []
      }
    },
    mounted() {
      this.createdCode()
    },
    methods: {
      refreshCode() {
        this.createdCode()
      },
      createdCode() {
        let codeList = [];
        let num1 = Math.round(Math.random() * 10);
        let num2 = Math.round(Math.random() * 10);
        codeList.push(this.getRandomStyle(num1.toString(), true));
        codeList.push(this.getRandomStyle('+'.toString(), false));
        codeList.push(this.getRandomStyle(num2.toString(), true));
        codeList.push(this.getRandomStyle('='.toString(), false));
        // 指向
        this.codeList = codeList;
        // 将当前数据派发出去
        this.$emit('identifyCodeChange', num1 + num2);
      },
      getStyle(data) {
        return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
      },
      getRandomStyle(codeInfo, rotateChar) {
        let rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
        return {
          code: codeInfo,
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: rotateChar ? `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)` : '',
        };
      }
    }
  }
</script>

<style scoped lang="scss">
  .submit-identify {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      display: inline-block;
    }
  }
</style>

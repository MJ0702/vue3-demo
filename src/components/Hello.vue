<template>
  <div>111</div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
export default defineComponent({
    name: 'helloWord',
    props: {
        msg: {
          required: true,
          type: String
        }
    },
    // props 可以访问组件传入的 props ,并且会自动推论成 props 类型
    // context 提供了 this 上最常用的三个属性attrs slots emit
    setup(props, context) {
      props.msg
      context.slots
    }
})
</script>

<style>
</style>
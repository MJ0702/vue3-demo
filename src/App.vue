<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <button @click="openModal">Open Modal</button>
    <Suspense>
      <template #default>
        <async-show/>
        <!-- <dog-show/> -->
      </template>
      <template #fallback>
        <h1>Loding !...</h1>
      </template>
    </Suspense>
    <h1>{{greetings}}</h1>
    <h1 v-if="loading">Loading...</h1>
    <img v-if="loaded" :src="result.message">
    <h1>{{`x: ${x}  y : ${y}`}}</h1>
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose">My Modal !!!</modal>
    <button @click="increase">+1</button>
    <button @click="updateGreeting">greetings</button>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref, toRefs, watch} from 'vue'
import useMousePosition from './hooks/useMousePositon'
import useURLLoader from './hooks/useURLLoader'
import modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
// import DogShow from './components/DogShow.vue'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
interface DogResult {
  message: string;
  status: string;
}
export default{
  name: 'App',
  components: {
    modal,
    AsyncShow,
    // DogShow
  },
  setup() {
    // 在computed回调中会自动将 double 推断为 any 类型，需要给data指定类型 DataProps
    const data: DataProps = reactive({
      count: 0,
      increase: () => { data.count++ },
      double: computed(() => data.count * 2 )
    })
    // 模块化 加载中逻辑抽离
    const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hello!'
    }
    // 模块化代码调用
    const positonData = useMousePosition()
    watch([greetings,() => data.count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })
    const refData = toRefs(data)
    const refXY = toRefs(positonData)
    // modal
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    return {
      // 响应式的值从响应式对象中取出，会变为普通类型，无法更新，故采用toRefs 函数
      ...refData,
      greetings,
      updateGreeting,
      ...refXY,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

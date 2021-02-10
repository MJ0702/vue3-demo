import { reactive, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
  const positon = reactive({
    x: 0,
    y: 0,
    updateMouse: (e: MouseEvent) => {
      positon.x = e.pageX
      positon.y = e.pageY 
    }
  })
  onMounted(() => {
    document.addEventListener('click', positon.updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', positon.updateMouse)
  })
  return positon
}

export default useMousePosition
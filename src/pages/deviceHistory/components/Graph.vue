<script setup>

import { Graph, MiniMap,Export   } from '@antv/x6'
import {onMounted, defineComponent, toRefs, watch, onUnmounted, onBeforeUnmount, nextTick, provide} from "vue";
import { register, getTeleport } from '@antv/x6-vue-shape'
import DeviceHistoryNode from "../../../graph/nodes/DeviceHistoryNode.vue";
import {registerDeviceHistoryEdge, registerDeviceHistoryNode} from "../../../graph/nodes/register.js";

registerDeviceHistoryEdge()
registerDeviceHistoryNode()

//getTeleport() — 获取一个特殊的容器组件，它内部会收集所有需要渲染的 Vue 节点
//<TeleportContainer/> — 放在模板中，它会监听 X6 图中所有使用 Vue 组件的节点，把它们统一渲染到自己内部
const TeleportContainer = getTeleport()

const props = defineProps({
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true },
})

// graph和minimap外部定义，用于销毁graph和minimap
let graph = null
let minimap = null

const {nodes,edges} = toRefs(props);

function init(){

  minimap = new MiniMap({
    container: document.getElementById('minimap'),
    width: 200,
    height: 160,
    padding: 0,
  })
  graph = new Graph({
    container: document.getElementById('container'),
    autoResize: true,
    connecting: {
      allowBlank:false,
      allowPort: true,
      allowNode:false,
      allowEdge:false,
      allowMulti:false,
      allowLoop:false,
      snap: { radius: 20 },
      // 锚点定在连接桩中心
      anchor: 'center',
      // 连接点就使用锚点本身，不再偏移到边框
      connectionPoint: 'anchor',
    },

    mousewheel: {
      enabled: true,              // 开启
      zoomAtMousePosition: true,  // 以鼠标位置为中心缩放
      factor: 1.2,                // 缩放步长，默认 1.2
      minScale: 0.2,              // 最小缩放比
      maxScale: 3,                // 最大缩放比
      // modifiers: ['ctrl'],     // 按住 Ctrl
    },
    interacting: {
      nodeMovable: false,   // 禁止节点拖动
    },
    // 设置画布背景颜色
    background: {
      color: '#ffffff',
    },
  })

  // 鼠标进入节点时，显示该节点的所有连接桩
  // graph.on('cell:mouseenter', ({ cell }) => {
  //   if (cell.isNode()) {
  //     cell.getPorts().forEach(port => {
  //       cell.setPortProp(port.id, 'attrs/circle/style/visibility', 'visible');
  //     });
  //   }
  // });

  // 鼠标离开节点时，隐藏节点的连接桩
  // graph.on('cell:mouseleave', ({ cell }) => {
  //   if (cell.isNode()) {
  //     graph.getNodes().forEach(node => {
  //       node.getPorts().forEach(port => {
  //         node.setPortProp(port.id, 'attrs/circle/style/visibility', 'hidden');
  //       });
  //     });
  //   }
  // });
  graph.use(minimap)
  graph.use(new Export())
}

function updateGraph(){
  const data = {
    nodes:nodes.value,
    edges:edges.value
  }
  graph.fromJSON(data) // 渲染元素
  graph.centerContent() // 居中显示
}

function exportGraph() {
  graph.exportPNG(Date.now(),{
    padding: 20,
  })
}

onMounted(() => {
  init()
})

function destroyGraph(){
  if(minimap){
    minimap.dispose()
    minimap = null
  }
  if(graph){
    graph.dispose()
    graph = null
  }
}

watch(nodes, () => {
  nextTick(()=>{
    updateGraph()
  })
})

onUnmounted(()=>{
  destroyGraph()
})

defineExpose({
  exportGraph
})

</script>

<template>
  <div id="container"></div>
  <div class="minimap" id="minimap"></div>
  <TeleportContainer/>
</template>

<style scoped>
.minimap{
  position: absolute;
  top: 80px;
  right: 30px;
  z-index: 1;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
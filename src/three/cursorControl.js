import * as THREE from 'three'

class CursorControl {
    constructor(camera, renderer, scene, targetModels) {
        this.camera = camera;
        this.renderer = renderer;
        this.scene = scene;
        this.targetModels = targetModels;

        this.selectedModel = null;

        this.clickCallbacks = []


        this.init();
    }
    init() {
        //bind改变this指向，this指向CursorControl，否则指向点击的对象
        this.renderer.domElement.addEventListener('click', this.onClick.bind(this))
        // this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this))
        // this.renderer.domElement.addEventListener('dblclick', this.onDoubleClick.bind(this))
    }
     onClick(event, callback) {

        // --- 步骤一：坐标转换 ---
        // 获取鼠标点击位置的像素坐标
        // 使用 offsetX/offsetY 可以得到相对于 canvas 的坐标，更为准确[reference:16]
        const px = event.offsetX;
        const py = event.offsetY;

        // 获取 canvas 的宽高
        const width = this.renderer.domElement.clientWidth;
        const height = this.renderer.domElement.clientHeight;

        // 将屏幕坐标转换为标准化设备坐标 (NDC)
        // x 和 y 的范围在 -1 到 1 之间[reference:17][reference:18]
        const x = (px / width) * 2 - 1;
        const y = -(py / height) * 2 + 1;

        // --- 步骤二：发射射线 ---
        // 创建一个射线投射器实例
        const raycaster = new THREE.Raycaster();
        // 通过鼠标位置和相机，计算出射线
        raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

        // --- 步骤三：检测相交 ---
        // 检测射线与场景中所有物体的交点
        // 第二个参数 `true` 表示会递归检测模型组 (Group) 的子物体[reference:19][reference:20]
        const intersects = raycaster.intersectObjects(this.targetModels || this.scene, true);

        // 如果 intersects 数组不为空，说明点击到了模型
        if (intersects.length > 0) {
            // 获取第一个被点击到的模型对象
            this.selectedModel = intersects[0].object;
            // 执行你的交互逻辑，例如改变颜色[reference:21][reference:22]
            this.highlightObject(this.selectedModel)

            if(this.clickCallbacks.length){
                this.clickCallbacks.forEach(cb => cb())
            }

        } else {
            if (this.selectedModel) {
                this.restoreObjectMaterial(this.selectedModel)
                this.selectedModel = null
            }
        }
    }

    addClickCallbacks(callback) {
        this.clickCallbacks.push(callback)
    }

    removeClickCallbacks(callback) {
        let index = this.clickCallbacks.indexOf(callback)
        if(index !== -1) {
            this.clickCallbacks.splice(index, 1)
        }
    }

    highlightObject(object) {
        console.log(object.deviceData)
        if (object.material.emissive) {
            object.currentEmissiveIntensity = object.material.emissiveIntensity
            object.material.emissiveIntensity = object.currentEmissiveIntensity * 1.5
        }

        if (object.children) {
            const edges = object.children.find(child => child.isLineSegments)
            if (edges) {
                edges.material.opacity = 1
                edges.material.linewidth = 3
            }
        }
    }

    restoreObjectMaterial(object) {
        if (object.material.emissive && object.currentEmissiveIntensity !== undefined) {
            object.material.emissiveIntensity = object.currentEmissiveIntensity
        }

        object.scale.set(1, 1, 1)

        if (object.children) {
            const edges = object.children.find(child => child.isLineSegments)
            if (edges) {
                edges.material.opacity = 0.8
                edges.material.linewidth = 2
            }
        }
    }

    dispose() {
        this.renderer.domElement.removeEventListener('click', this.onClick.bind(this))
        // this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this))
        // this.renderer.domElement.removeEventListener('dblclick', this.onDoubleClick.bind(this))
    }

}

export default CursorControl
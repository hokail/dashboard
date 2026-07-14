// src/websocket/mockClient.js
// 浏览器端模拟 WebSocket，复制 mockServer.js 的设备数据推送逻辑

const errorCodes = [
    { code: 'E-301', desc: '主轴温度过高' },
    { code: 'E-205', desc: '模具卡死' },
    { code: 'E-110', desc: '传送带偏移' },
    { code: 'E-402', desc: '刀片磨损严重' },
    { code: 'W-102', desc: '液压油压力异常' },
    { code: 'W-308', desc: '焊丝送丝不畅' },
    { code: 'W-201', desc: '包装材料不足' },
    { code: 'E-501', desc: '电机过载' },
    { code: 'E-603', desc: '传感器失灵' },
    { code: 'W-405', desc: '冷却液不足' }
]

const deviceList = [
    { id: 'D001', name: 'CNC-01', type: 'CNC机床', status: 'online', x: 0, y: 0 },
    { id: 'D002', name: 'CNC-02', type: 'CNC机床', status: 'online', x: 1, y: 0 },
    { id: 'D003', name: 'CNC-03', type: 'CNC机床', status: 'error', x: 2, y: 0 },
    { id: 'D004', name: 'CNC-04', type: 'CNC机床', status: 'online', x: 3, y: 0 },
    { id: 'D005', name: 'CNC-05', type: 'CNC机床', status: 'online', x: 4, y: 0 },
    { id: 'D006', name: 'CNC-06', type: 'CNC机床', status: 'online', x: 5, y: 0 },
    { id: 'D007', name: 'CNC-07', type: 'CNC机床', status: 'online', x: 6, y: 0 },
    { id: 'D008', name: 'CNC-08', type: 'CNC机床', status: 'offline', x: 7, y: 0 },
    { id: 'D009', name: '注塑-01', type: '注塑机', status: 'online', x: 0, y: 1 },
    { id: 'D010', name: '注塑-02', type: '注塑机', status: 'online', x: 1, y: 1 },
    { id: 'D011', name: '注塑-03', type: '注塑机', status: 'warning', x: 2, y: 1 },
    { id: 'D012', name: '注塑-04', type: '注塑机', status: 'online', x: 3, y: 1 },
    { id: 'D013', name: '注塑-05', type: '注塑机', status: 'error', x: 4, y: 1 },
    { id: 'D014', name: '注塑-06', type: '注塑机', status: 'online', x: 5, y: 1 },
    { id: 'D015', name: '注塑-07', type: '注塑机', status: 'online', x: 6, y: 1 },
    { id: 'D016', name: '注塑-08', type: '注塑机', status: 'online', x: 7, y: 1 },
    { id: 'D017', name: '冲压-01', type: '冲压机', status: 'online', x: 0, y: 2 },
    { id: 'D018', name: '冲压-02', type: '冲压机', status: 'online', x: 1, y: 2 },
    { id: 'D019', name: '冲压-03', type: '冲压机', status: 'online', x: 2, y: 2 },
    { id: 'D020', name: '冲压-04', type: '冲压机', status: 'online', x: 3, y: 2 },
    { id: 'D021', name: '冲压-05', type: '冲压机', status: 'online', x: 4, y: 2 },
    { id: 'D022', name: '冲压-06', type: '冲压机', status: 'online', x: 5, y: 2 },
    { id: 'D023', name: '冲压-07', type: '冲压机', status: 'error', x: 6, y: 2 },
    { id: 'D024', name: '冲压-08', type: '冲压机', status: 'online', x: 7, y: 2 },
    { id: 'D025', name: '焊接-01', type: '焊接机器人', status: 'online', x: 0, y: 3 },
    { id: 'D026', name: '焊接-02', type: '焊接机器人', status: 'online', x: 1, y: 3 },
    { id: 'D027', name: '焊接-03', type: '焊接机器人', status: 'warning', x: 2, y: 3 },
    { id: 'D028', name: '焊接-04', type: '焊接机器人', status: 'online', x: 3, y: 3 },
    { id: 'D029', name: '焊接-05', type: '焊接机器人', status: 'online', x: 4, y: 3 },
    { id: 'D030', name: '焊接-06', type: '焊接机器人', status: 'online', x: 5, y: 3 },
    { id: 'D031', name: '焊接-07', type: '焊接机器人', status: 'online', x: 6, y: 3 },
    { id: 'D032', name: '焊接-08', type: '焊接机器人', status: 'offline', x: 7, y: 3 },
    { id: 'D033', name: '装配-01', type: '装配线', status: 'online', x: 0, y: 4 },
    { id: 'D034', name: '装配-02', type: '装配线', status: 'online', x: 1, y: 4 },
    { id: 'D035', name: '装配-03', type: '装配线', status: 'error', x: 2, y: 4 },
    { id: 'D036', name: '装配-04', type: '装配线', status: 'online', x: 3, y: 4 },
    { id: 'D037', name: '装配-05', type: '装配线', status: 'online', x: 4, y: 4 },
    { id: 'D038', name: '装配-06', type: '装配线', status: 'online', x: 5, y: 4 },
    { id: 'D039', name: '装配-07', type: '装配线', status: 'online', x: 6, y: 4 },
    { id: 'D040', name: '装配-08', type: '装配线', status: 'online', x: 7, y: 4 }
]

class FakeWebSocket {
    static CONNECTING = 0
    static OPEN = 1
    static CLOSING = 2
    static CLOSED = 3

    constructor(url) {
        this.url = url
        this.readyState = FakeWebSocket.CONNECTING
        this.devices = JSON.parse(JSON.stringify(deviceList))
        this._pushTimer = null
        this._pongReceived = true

        // 异步触发 onopen，模拟连接延迟
        setTimeout(() => {
            this.readyState = FakeWebSocket.OPEN
            console.log('🎭 Mock WebSocket 已连接')
            if (this.onopen) this.onopen({ type: 'open' })
            this._startPush()
        }, 100)
    }

    _startPush() {
        this._pushTimer = setInterval(() => {
            const updateCount = Math.floor(Math.random() * 3) + 1
            const updatedDevices = []

            for (let i = 0; i < updateCount; i++) {
                const idx = Math.floor(Math.random() * this.devices.length)
                const device = this.devices[idx]
                if (device.status === 'offline') continue

                const statuses = ['warning', 'error', 'online']
                device.status = statuses[Math.floor(Math.random() * statuses.length)]
                if (device.status === 'error' || device.status === 'warning') {
                    const fault = errorCodes[Math.floor(Math.random() * errorCodes.length)]
                    device.errorCode = fault.code
                    device.errorDesc = fault.desc
                    const now = new Date()
                    device.startTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
                    device.location = `车间${device.x}-${device.y}`
                    device.alarmId = `A${Date.now()}`
                } else {
                    delete device.errorCode
                    delete device.errorDesc
                    delete device.startTime
                    delete device.alarmId
                }
                updatedDevices.push(JSON.parse(JSON.stringify(device)))
            }

            if (updatedDevices.length > 0 && this.onmessage) {
                this.onmessage({
                    data: JSON.stringify({
                        type: 'device-status',
                        timestamp: Date.now(),
                        data: updatedDevices
                    })
                })
            }
        }, 3000)
    }

    send(data) {
        try {
            const msg = JSON.parse(data)
            if (msg.type === 'ping') {
                // 模拟 pong 响应
                setTimeout(() => {
                    if (this.onmessage) {
                        this.onmessage({ data: JSON.stringify({ type: 'pong', timestamp: Date.now() }) })
                    }
                }, 50)
            }
        } catch (e) { /* ignore */ }
    }

    close() {
        if (this._pushTimer) {
            clearInterval(this._pushTimer)
            this._pushTimer = null
        }
        this.readyState = FakeWebSocket.CLOSED
        if (this.onclose) this.onclose({ code: 1000, reason: '' })
        console.log('🎭 Mock WebSocket 已关闭')
    }
}

export function enableMockWebSocket() {
    window.WebSocket = FakeWebSocket
    console.log('🎭 Mock WebSocket 已启用（生产环境）')
}
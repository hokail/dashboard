/**
 * Mock WebSocket 服务器
 * 使用 mock-socket 库模拟真实的 WebSocket 服务端
 * 用于开发和测试环境，提供设备实时状态数据推送
 */

import { Server } from 'mock-socket'

class MockWebSocketServer {
    /**
     * 构造函数
     * @param {string} url - WebSocket 服务器地址，默认 ws://localhost:8080
     */
    constructor(url = 'ws://localhost:5173') {
        this.url = url
        this.server = null
        this.clients = new Set()

        // 模拟设备数据列表
        this.devices = [
            { id: 'device-001', name: '温度传感器A', type: 'temperature', status: 'online', value: 25.5, unit: '°C', min: 20, max: 30 },
            { id: 'device-002', name: '湿度传感器B', type: 'humidity', status: 'online', value: 60.2, unit: '%', min: 50, max: 70 },
            { id: 'device-003', name: '压力传感器C', type: 'pressure', status: 'offline', value: 0, unit: 'kPa', min: 0, max: 100 },
            { id: 'device-004', name: '流量计D', type: 'flow', status: 'online', value: 120.8, unit: 'L/min', min: 100, max: 150 },
            { id: 'device-005', name: '电压表E', type: 'voltage', status: 'warning', value: 220.5, unit: 'V', min: 210, max: 230 },
            { id: 'device-006', name: '电流表F', type: 'current', status: 'online', value: 15.3, unit: 'A', min: 10, max: 20 },
            { id: 'device-007', name: '转速计G', type: 'speed', status: 'online', value: 1500, unit: 'rpm', min: 1000, max: 2000 },
            { id: 'device-008', name: '液位传感器H', type: 'level', status: 'online', value: 75.6, unit: '%', min: 60, max: 90 }
        ]

        this.pushTimer = null
    }

    /**
     * 启动 Mock WebSocket 服务器
     * 创建服务器实例并监听连接事件
     */
    start() {
        if (this.server) {
            console.warn('Mock WebSocket 服务器已在运行')
            return
        }

        // 创建 WebSocket 服务器实例
        this.server = new Server(this.url)
        console.log(`✅ Mock WebSocket 服务器启动: ${this.url}`)

        // 监听客户端连接事件
        this.server.on('connection', (socket) => {
            this.handleConnection(socket)
        })
    }

    /**
     * 处理客户端连接
     * 发送初始数据、启动定时推送、注册消息和断开连接处理器
     * @param {Object} socket - WebSocket 套接字对象
     */
    handleConnection(socket) {
        const clientId = Date.now()
        console.log(`🔗 客户端 ${clientId} 已连接`)

        // 将客户端添加到集合中管理
        this.clients.add(socket)

        // 发送初始设备数据
        this.sendInitialData(socket)

        // 启动定时数据推送
        this.startPushingData(socket)

        // 注册消息接收处理器
        socket.on('message', (data) => {
            this.handleMessage(socket, data, clientId)
        })

        // 注册断开连接处理器
        socket.on('close', () => {
            console.log(`❌ 客户端 ${clientId} 已断开`)
            this.clients.delete(socket)
            this.stopPushingData(socket)
        })
    }

    /**
     * 发送初始设备数据给客户端
     * 包含所有设备的当前状态和统计信息
     * @param {Object} socket - WebSocket 套接字对象
     */
    sendInitialData(socket) {
        const message = JSON.stringify({
            type: 'init',
            timestamp: Date.now(),
            data: {
                total: this.devices.length,
                online: this.devices.filter(d => d.status === 'online').length,
                offline: this.devices.filter(d => d.status === 'offline').length,
                warning: this.devices.filter(d => d.status === 'warning').length,
                devices: JSON.parse(JSON.stringify(this.devices))
            }
        })

        socket.send(message)
        console.log('📤 已发送初始设备数据')
    }

    /**
     * 启动定时数据推送
     * 每 3 秒向客户端推送一次设备状态更新
     * @param {Object} socket - WebSocket 套接字对象
     */
    startPushingData(socket) {
        // 设置定时器，每 3 秒推送一次
        const timer = setInterval(() => {
            this.pushDeviceUpdate(socket)
        }, 3000)

        // 将定时器保存到 socket 对象上，方便后续清理
        socket._pushTimer = timer
    }

    /**
     * 停止数据推送
     * 清除定时器，释放资源
     * @param {Object} socket - WebSocket 套接字对象
     */
    stopPushingData(socket) {
        if (socket._pushTimer) {
            clearInterval(socket._pushTimer)
            socket._pushTimer = null
        }
    }

    /**
     * 推送设备状态更新
     * 随机选择 1-3 个在线设备，模拟数值波动和状态变化
     * @param {Object} socket - WebSocket 套接字对象
     */
    pushDeviceUpdate(socket) {
        // 随机决定本次更新的设备数量（1-3 个）
        const updateCount = Math.floor(Math.random() * 3) + 1
        const updatedDevices = []

        for (let i = 0; i < updateCount; i++) {
            const deviceIndex = Math.floor(Math.random() * this.devices.length)
            const device = this.devices[deviceIndex]

            // 跳过离线设备，不推送其更新
            if (device.status === 'offline') continue

            // 模拟数值波动：在 ±5% 范围内随机变化
            const fluctuation = (Math.random() - 0.5) * 0.1 * device.value
            const newValue = device.value + fluctuation

            // 确保新值在合理范围内（min ~ max）
            device.value = parseFloat(
                Math.max(device.min || 0, Math.min(device.max || Infinity, newValue)).toFixed(2)
            )

            // 小概率（5%）改变设备状态：在线/警告之间切换
            if (Math.random() < 0.05) {
                const statuses = ['online', 'warning']
                device.status = statuses[Math.floor(Math.random() * statuses.length)]
            }

            // 深拷贝设备对象，避免引用问题
            updatedDevices.push(JSON.parse(JSON.stringify(device)))
        }

        // 如果有更新的设备，则推送给客户端
        if (updatedDevices.length > 0) {
            const message = JSON.stringify({
                type: 'device-status',
                timestamp: Date.now(),
                data: updatedDevices
            })

            try {
                socket.send(message)
            } catch (error) {
                console.error('发送消息失败:', error)
            }
        }
    }

    /**
     * 处理客户端发送的消息
     * 支持心跳响应、订阅/取消订阅等功能
     * @param {Object} socket - WebSocket 套接字对象
     * @param {*} data - 接收到的消息数据
     * @param {number} clientId - 客户端 ID
     */
    handleMessage(socket, data, clientId) {
        try {
            const message = JSON.parse(data)

            // 处理心跳请求：响应 pong
            if (message.type === 'ping') {
                socket.send(JSON.stringify({
                    type: 'pong',
                    timestamp: Date.now()
                }))
                return
            }

            // 处理订阅请求
            if (message.type === 'subscribe') {
                console.log(`客户端 ${clientId} 订阅:`, message.devices)
                socket.send(JSON.stringify({
                    type: 'subscribed',
                    timestamp: Date.now(),
                    data: { message: '订阅成功' }
                }))
                return
            }

            // 处理取消订阅请求
            if (message.type === 'unsubscribe') {
                console.log(`客户端 ${clientId} 取消订阅`)
                socket.send(JSON.stringify({
                    type: 'unsubscribed',
                    timestamp: Date.now(),
                    data: { message: '取消订阅成功' }
                }))
                return
            }

            // 其他消息类型，打印日志
            console.log(`收到客户端 ${clientId} 消息:`, message)
        } catch (error) {
            // 非 JSON 格式消息，直接打印原始内容
            console.log(`收到原始消息:`, data)
        }
    }

    /**
     * 停止 Mock WebSocket 服务器
     * 清理所有客户端连接、定时器和服务器资源
     */
    stop() {
        if (this.server) {
            // 清理所有客户端的定时器
            this.clients.forEach(socket => {
                this.stopPushingData(socket)
            })

            // 停止服务器
            this.server.stop()
            this.server = null
            this.clients.clear()

            console.log('🛑 Mock WebSocket 服务器已停止')
        }
    }
}

// 创建单例实例，确保整个应用只有一个 Mock 服务器
let mockServerInstance = null

/**
 * 创建或获取 Mock WebSocket 服务器单例
 * @param {string} url - WebSocket 服务器地址
 * @returns {MockWebSocketServer} MockWebSocketServer 实例
 */
export function createMockServer(url = 'ws://localhost:5173') {
    if (!mockServerInstance) {
        mockServerInstance = new MockWebSocketServer(url)
    }
    return mockServerInstance
}

export default MockWebSocketServer

export default [
    {
        url: '/api/board/getTrendData',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    trendData: [2, 1, 3, 5, 4, 6, 3]
                }
            }

        }
    },
    {
        url: '/api/board/getKeyMetrics',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    keyMetrics: {
                        power:'1256',
                        activeAlarms:'7',
                        dailyProduction:'8956',
                        operatingHours:'18.5',
                        averageOEE: '98.5%',
                        cost:'3420'
                    }
                }
            }

        }
    },
    {
        url: '/api/board/getAbnormalDevices',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    abnormalDevices: [
                        { id: 'D003', name: 'CNC-03', type: 'CNC机床', location: '车间A-3', errorCode: 'E-301', errorDesc: '主轴温度过高', duration: '2小时15分', level: 'fault', status: 'fault' },
                        { id: 'D013', name: '注塑-05', type: '注塑机', location: '车间B-7', errorCode: 'W-102', errorDesc: '液压油压力异常', duration: '45分钟', level: 'high', status: 'fault' },
                        { id: 'D023', name: '冲压-07', type: '冲压机', location: '车间A-9', errorCode: 'E-205', errorDesc: '模具卡死', duration: '1小时30分', level: 'fault', status: 'fault' },
                        { id: 'D027', name: '焊接-03', type: '焊接机器人', location: '车间C-2', errorCode: 'W-308', errorDesc: '焊丝送丝不畅', duration: '20分钟', level: 'high', status: 'warning' },
                        { id: 'D035', name: '装配-03', type: '装配线', location: '车间B-4', errorCode: 'E-110', errorDesc: '传送带偏移', duration: '3小时', level: 'fault', status: 'fault' },
                        { id: 'D011', name: '注塑-03', type: '注塑机', location: '车间C-5', errorCode: 'W-201', errorDesc: '包装材料不足', duration: '15分钟', level: 'high', status: 'warning' },
                        { id: 'D008', name: 'CNC-08', type: 'CNC机床', location: '车间A-11', errorCode: 'E-402', errorDesc: '刀片磨损严重', duration: '50分钟', level: 'fault', status: 'offline' }
                    ],
                }
            }

        }
    },
    {
        url: '/api/board/getWorkshopDevices',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    workshopDevices: [
                        { id: 'D001', name: 'CNC-01', type: 'CNC机床', status: 'online', x: 0, y: 0 },
                        { id: 'D002', name: 'CNC-02', type: 'CNC机床', status: 'online', x: 1, y: 0 },
                        { id: 'D003', name: 'CNC-03', type: 'CNC机床', status: 'fault', x: 2, y: 0 },
                        { id: 'D004', name: 'CNC-04', type: 'CNC机床', status: 'online', x: 3, y: 0 },
                        { id: 'D005', name: 'CNC-05', type: 'CNC机床', status: 'standby', x: 4, y: 0 },
                        { id: 'D006', name: 'CNC-06', type: 'CNC机床', status: 'online', x: 5, y: 0 },
                        { id: 'D007', name: 'CNC-07', type: 'CNC机床', status: 'online', x: 6, y: 0 },
                        { id: 'D008', name: 'CNC-08', type: 'CNC机床', status: 'offline', x: 7, y: 0 },

                        { id: 'D009', name: '注塑-01', type: '注塑机', status: 'online', x: 0, y: 1 },
                        { id: 'D010', name: '注塑-02', type: '注塑机', status: 'online', x: 1, y: 1 },
                        { id: 'D011', name: '注塑-03', type: '注塑机', status: 'warning', x: 2, y: 1 },
                        { id: 'D012', name: '注塑-04', type: '注塑机', status: 'online', x: 3, y: 1 },
                        { id: 'D013', name: '注塑-05', type: '注塑机', status: 'fault', x: 4, y: 1 },
                        { id: 'D014', name: '注塑-06', type: '注塑机', status: 'online', x: 5, y: 1 },
                        { id: 'D015', name: '注塑-07', type: '注塑机', status: 'online', x: 6, y: 1 },
                        { id: 'D016', name: '注塑-08', type: '注塑机', status: 'online', x: 7, y: 1 },

                        { id: 'D017', name: '冲压-01', type: '冲压机', status: 'online', x: 0, y: 2 },
                        { id: 'D018', name: '冲压-02', type: '冲压机', status: 'online', x: 1, y: 2 },
                        { id: 'D019', name: '冲压-03', type: '冲压机', status: 'online', x: 2, y: 2 },
                        { id: 'D020', name: '冲压-04', type: '冲压机', status: 'standby', x: 3, y: 2 },
                        { id: 'D021', name: '冲压-05', type: '冲压机', status: 'online', x: 4, y: 2 },
                        { id: 'D022', name: '冲压-06', type: '冲压机', status: 'online', x: 5, y: 2 },
                        { id: 'D023', name: '冲压-07', type: '冲压机', status: 'fault', x: 6, y: 2 },
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
                        { id: 'D035', name: '装配-03', type: '装配线', status: 'fault', x: 2, y: 4 },
                        { id: 'D036', name: '装配-04', type: '装配线', status: 'online', x: 3, y: 4 },
                        { id: 'D037', name: '装配-05', type: '装配线', status: 'online', x: 4, y: 4 },
                        { id: 'D038', name: '装配-06', type: '装配线', status: 'standby', x: 5, y: 4 },
                        { id: 'D039', name: '装配-07', type: '装配线', status: 'online', x: 6, y: 4 },
                        { id: 'D040', name: '装配-08', type: '装配线', status: 'online', x: 7, y: 4 }
                    ],
                }
            }

        }
    },
    {
        url: '/api/board/getFaultTableData',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    faultTableData: [
                        { key: '1', deviceId: 'D003', deviceName: 'CNC-03', deviceType: 'CNC机床', faultCode: 'E-301', faultDesc: '主轴温度过高', location: '车间A-3', startTime: '08:20:15', duration: '2小时15分', status: '处理中', priority: '高' },
                        { key: '2', deviceId: 'D023', deviceName: '冲压-07', deviceType: '冲压机', faultCode: 'E-205', faultDesc: '模具卡死', location: '车间A-9', startTime: '09:05:30', duration: '1小时30分', status: '待维修', priority: '高' },
                        { key: '3', deviceId: 'D035', deviceName: '装配-03', deviceType: '装配线', faultCode: 'E-110', faultDesc: '传送带偏移', location: '车间B-4', startTime: '07:35:45', duration: '3小时', status: '处理中', priority: '中' },
                        { key: '4', deviceId: 'D008', deviceName: 'CNC-08', deviceType: 'CNC机床', faultCode: 'E-402', faultDesc: '刀片磨损严重', location: '车间A-11', startTime: '09:45:20', duration: '50分钟', status: '待备件', priority: '中' },
                        { key: '5', deviceId: 'D013', deviceName: '注塑-05', deviceType: '注塑机', faultCode: 'W-102', faultDesc: '液压油压力异常', location: '车间B-7', startTime: '10:10:10', duration: '45分钟', status: '监控中', priority: '低' },
                        { key: '6', deviceId: 'D027', deviceName: '焊接-03', deviceType: '焊接机器人', faultCode: 'W-308', faultDesc: '焊丝送丝不畅', location: '车间C-2', startTime: '10:35:25', duration: '20分钟', status: '监控中', priority: '低' }
                    ],
                }
            }

        }
    },
]

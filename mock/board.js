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
                        { id: 'DEV001', name: 'CNC机床-01', location: '车间A-3', errorCode: 'E-301', errorDesc: '主轴温度过高', duration: '2小时15分', level: 'fault' },
                        { id: 'DEV002', name: '注塑机-05', location: '车间B-7', errorCode: 'W-102', errorDesc: '液压油压力异常', duration: '45分钟', level: 'high' },
                        { id: 'DEV003', name: '冲压机-12', location: '车间A-9', errorCode: 'E-205', errorDesc: '模具卡死', duration: '1小时30分', level: 'fault' },
                        { id: 'DEV004', name: '焊接机器人-03', location: '车间C-2', errorCode: 'W-308', errorDesc: '焊丝送丝不畅', duration: '20分钟', level: 'high' },
                        { id: 'DEV005', name: '装配线-08', location: '车间B-4', errorCode: 'E-110', errorDesc: '传送带偏移', duration: '3小时', level: 'fault' },
                        { id: 'DEV006', name: '包装机-02', location: '车间A-11', errorCode: 'W-201', errorDesc: '包装材料不足', duration: '15分钟', level: 'high' },
                        { id: 'DEV007', name: '切割机-06', location: '车间C-5', errorCode: 'E-402', errorDesc: '刀片磨损严重', duration: '50分钟', level: 'fault' }
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
                        { id: 'D001', name: 'CNC-01', status: 'online', x: 0, y: 0 },
                        { id: 'D002', name: 'CNC-02', status: 'online', x: 1, y: 0 },
                        { id: 'D003', name: 'CNC-03', status: 'fault', x: 2, y: 0 },
                        { id: 'D004', name: 'CNC-04', status: 'online', x: 3, y: 0 },
                        { id: 'D005', name: 'CNC-05', status: 'standby', x: 4, y: 0 },
                        { id: 'D006', name: 'CNC-06', status: 'online', x: 5, y: 0 },
                        { id: 'D007', name: 'CNC-07', status: 'online', x: 6, y: 0 },
                        { id: 'D008', name: 'CNC-08', status: 'offline', x: 7, y: 0 },

                        { id: 'D009', name: '注塑-01', status: 'online', x: 0, y: 1 },
                        { id: 'D010', name: '注塑-02', status: 'online', x: 1, y: 1 },
                        { id: 'D011', name: '注塑-03', status: 'warning', x: 2, y: 1 },
                        { id: 'D012', name: '注塑-04', status: 'online', x: 3, y: 1 },
                        { id: 'D013', name: '注塑-05', status: 'fault', x: 4, y: 1 },
                        { id: 'D014', name: '注塑-06', status: 'online', x: 5, y: 1 },
                        { id: 'D015', name: '注塑-07', status: 'online', x: 6, y: 1 },
                        { id: 'D016', name: '注塑-08', status: 'online', x: 7, y: 1 },

                        { id: 'D017', name: '冲压-01', status: 'online', x: 0, y: 2 },
                        { id: 'D018', name: '冲压-02', status: 'online', x: 1, y: 2 },
                        { id: 'D019', name: '冲压-03', status: 'online', x: 2, y: 2 },
                        { id: 'D020', name: '冲压-04', status: 'standby', x: 3, y: 2 },
                        { id: 'D021', name: '冲压-05', status: 'online', x: 4, y: 2 },
                        { id: 'D022', name: '冲压-06', status: 'online', x: 5, y: 2 },
                        { id: 'D023', name: '冲压-07', status: 'fault', x: 6, y: 2 },
                        { id: 'D024', name: '冲压-08', status: 'online', x: 7, y: 2 },

                        { id: 'D025', name: '焊接-01', status: 'online', x: 0, y: 3 },
                        { id: 'D026', name: '焊接-02', status: 'online', x: 1, y: 3 },
                        { id: 'D027', name: '焊接-03', status: 'warning', x: 2, y: 3 },
                        { id: 'D028', name: '焊接-04', status: 'online', x: 3, y: 3 },
                        { id: 'D029', name: '焊接-05', status: 'online', x: 4, y: 3 },
                        { id: 'D030', name: '焊接-06', status: 'online', x: 5, y: 3 },
                        { id: 'D031', name: '焊接-07', status: 'online', x: 6, y: 3 },
                        { id: 'D032', name: '焊接-08', status: 'offline', x: 7, y: 3 },

                        { id: 'D033', name: '装配-01', status: 'online', x: 0, y: 4 },
                        { id: 'D034', name: '装配-02', status: 'online', x: 1, y: 4 },
                        { id: 'D035', name: '装配-03', status: 'fault', x: 2, y: 4 },
                        { id: 'D036', name: '装配-04', status: 'online', x: 3, y: 4 },
                        { id: 'D037', name: '装配-05', status: 'online', x: 4, y: 4 },
                        { id: 'D038', name: '装配-06', status: 'standby', x: 5, y: 4 },
                        { id: 'D039', name: '装配-07', status: 'online', x: 6, y: 4 },
                        { id: 'D040', name: '装配-08', status: 'online', x: 7, y: 4 }
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
                        { key: '1', deviceId: 'DEV001', deviceName: 'CNC机床-01', faultCode: 'E-301', faultDesc: '主轴温度过高', location: '车间A-3', startTime: '08:20:15', duration: '2小时15分', status: '处理中', priority: '高' },
                        { key: '2', deviceId: 'DEV003', deviceName: '冲压机-12', faultCode: 'E-205', faultDesc: '模具卡死', location: '车间A-9', startTime: '09:05:30', duration: '1小时30分', status: '待维修', priority: '高' },
                        { key: '3', deviceId: 'DEV005', deviceName: '装配线-08', faultCode: 'E-110', faultDesc: '传送带偏移', location: '车间B-4', startTime: '07:35:45', duration: '3小时', status: '处理中', priority: '中' },
                        { key: '4', deviceId: 'DEV007', deviceName: '切割机-06', faultCode: 'E-402', faultDesc: '刀片磨损严重', location: '车间C-5', startTime: '09:45:20', duration: '50分钟', status: '待备件', priority: '中' },
                        { key: '5', deviceId: 'DEV002', deviceName: '注塑机-05', faultCode: 'W-102', faultDesc: '液压油压力异常', location: '车间B-7', startTime: '10:10:10', duration: '45分钟', status: '监控中', priority: '低' },
                        { key: '6', deviceId: 'DEV004', deviceName: '焊接机器人-03', faultCode: 'W-308', faultDesc: '焊丝送丝不畅', location: '车间C-2', startTime: '10:35:25', duration: '20分钟', status: '监控中', priority: '低' }
                    ],
                }
            }

        }
    },
]

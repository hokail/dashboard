<script setup>
import {ref} from 'vue'

const dispatchColumns = ref([
  { title: '', key: 'selection', width: 50, align: 'center' },
  { title: '级别', dataIndex: 'priority', key: 'priority', width: 80, align: 'center' },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100, align: 'center' },
  { title: '设备名称', dataIndex: 'deviceName', key: 'deviceName', width: 150 },
  { title: '故障描述', dataIndex: 'errorDesc', key: 'errorDesc', ellipsis: true },
  { title: '位置', dataIndex: 'location', key: 'location', width: 120 },
  { title: '开始时间', dataIndex: 'startTime', key: 'startTime', width: 160 },
  { title: '持续时长', dataIndex: 'duration', key: 'duration', width: 100 },
  { title: '操作',dataIndex:'action', key: 'action', width: 200, fixed: 'right', align: 'center' }
])

// 报警事件列表数据（模拟）
const alarmList = ref([
  {
    id: 'ALM001',
    deviceId: 'DEV001',
    deviceName: 'CNC加工中心-01',
    priority: 'high',
    status: 'unhandled',
    errorDesc: '主轴温度过高',
    location: '车间A-区域1',
    startTime: '2026-06-03 08:30:00',
    duration: '2小时15分',
    workOrderId: null
  },
  {
    id: 'ALM002',
    deviceId: 'DEV015',
    deviceName: '注塑机-03',
    priority: 'medium',
    status: 'processing',
    errorDesc: '液压系统压力异常',
    location: '车间B-区域2',
    startTime: '2026-06-03 09:45:00',
    duration: '1小时',
    workOrderId: 'WO20260603001'
  },
  {
    id: 'ALM003',
    deviceId: 'DEV023',
    deviceName: '冲压机-07',
    priority: 'low',
    status: 'dispatched',
    errorDesc: '润滑油位偏低',
    location: '车间A-区域3',
    startTime: '2026-06-03 10:20:00',
    duration: '25分钟',
    workOrderId: 'WO20260603002'
  },
  {
    id: 'ALM004',
    deviceId: 'DEV008',
    deviceName: '焊接机器人-02',
    priority: 'high',
    status: 'unhandled',
    errorDesc: '焊丝送丝故障',
    location: '车间C-区域1',
    startTime: '2026-06-03 10:50:00',
    duration: '5分钟',
    workOrderId: null
  },
  {
    id: 'ALM005',
    deviceId: 'DEV032',
    deviceName: '装配线-05',
    priority: 'medium',
    status: 'unhandled',
    errorDesc: '传送带速度异常',
    location: '车间B-区域4',
    startTime: '2026-06-03 07:15:00',
    duration: '3小时30分',
    workOrderId: null
  }
])

let dispatchForm = ref({
  // 报警信息（从选中的记录中获取）
  alarmId: '',           // 报警ID
  deviceId: '',          // 设备ID
  deviceName: '',        // 设备名称
  errorDesc: '',         // 故障描述
  location: '',          // 设备位置

  // 工单信息
  workOrderId: '',       // 生成的工单号（可选，系统自动生成）

  // 派单相关信息
  assignee: '',          // 指派人/维修人员
  assigneePhone: '',     // 指派人联系电话
  priority: '',          // 优先级（high/medium/low）
  expectedTime: '',      // 预计完成时间
  remark: '',            // 备注说明

})

const dispatchFormRef = ref(null)

const dispatchFormRules = {
  assignee: [
    { required: true, message: '请选择指派人', trigger: 'change' }
  ],
  assigneePhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  priority: [
    { required: true, message: '请选择优先级', trigger: 'change' }
  ],
  expectedTime: [
    { required: true, message: '请选择预计完成时间', trigger: 'change' }
  ]
}

let dispatchVisible = ref(false)

function closeDispatchModal(){
  dispatchVisible.value = false
}
function confirmDispatch(){
  console.log('confirmDispatch', arguments)
  dispatchVisible.value = false
}

function handleDispatch(record){
  dispatchVisible.value = true
  // 填充报警信息
  dispatchForm.value = {
    alarmId: record.id,
    deviceId: record.deviceId,
    deviceName: record.deviceName,
    errorDesc: record.errorDesc,
    location: record.location,
    workOrderId: `WO${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.random()).substr(2, 3)}`,
    assignee: '',
    assigneePhone: '',
    priority: record.priority,
    expectedTime: '',
    remark: ''
  }
  console.log('handleDispatch', arguments)
}
</script>
<template>
   <a-card size="small" bordered>
      <a-row>
        <a-table
            style="width: 100%"
          :columns = "dispatchColumns"
          :data-source = "alarmList"
          :pagination = "false"
          :scroll = "{ x: 1500 }"
          :row-key = "record => record.id"
        >
          <template #bodyCell = "{column, record}">
            <template v-if="column.key === 'action'">
              <a-button type="primary" size="small" @click="handleDispatch(record)">派单</a-button>
            </template>

            <template v-else-if="column.key === 'priority'">
              <a-tag v-if="column.key === 'priority'" color="red">{{ record[column.key] }}</a-tag>
              <a-tag v-else-if="column.key === 'status'" color="orange">{{ record[column.key] }}</a-tag>
              <a-tag v-else-if="column.key === 'location'" color="green">{{ record[column.key] }}</a-tag>
              <a-tag v-else>{{ record[column.key] }}</a-tag>
            </template>

            <template v-else-if="column.key === 'status'">
              <a-tag v-if="column.key === 'priority'" color="red">{{ record[column.key] }}</a-tag>
              <a-tag v-else-if="column.key === 'status'" color="orange">{{ record[column.key] }}</a-tag>
              <a-tag v-else-if="column.key === 'location'" color="green">{{ record[column.key] }}</a-tag>
              <a-tag v-else>{{ record[column.key] }}</a-tag>
            </template>
          </template>
        </a-table>
      </a-row>
   </a-card>
    <a-modal
      title="派单"
      :ok-text="'派单'"
      :cancel-text="'取消'"
      :visible="dispatchVisible"
      @cancel="closeDispatchModal"
      @ok="confirmDispatch"
      width="1000px"
    >
      <a-form
        ref="dispatchFormRef"
        :model="dispatchForm"
        :rules="dispatchFormRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <!-- 报警信息区域 -->
        <a-card size="small" title="报警信息">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="报警ID">
                <a-input v-model:value="dispatchForm.alarmId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="设备ID">
                <a-input v-model:value="dispatchForm.deviceId" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="设备名称">
                <a-input v-model:value="dispatchForm.deviceName" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="位置">
                <a-input v-model:value="dispatchForm.location" disabled />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item label="故障描述" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-textarea v-model:value="dispatchForm.errorDesc" :rows="2" disabled />
          </a-form-item>

        </a-card>
        <!-- 工单信息区域 -->

        <a-card size="small" title="工单信息">
          <a-form-item label="工单号" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-input v-model:value="dispatchForm.workOrderId" disabled />
          </a-form-item>
        </a-card>
        <!-- 派单信息区域 -->
        <a-card size="small" title="派单信息">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="指派人" name="assignee">
                <a-select v-model:value="dispatchForm.assignee" placeholder="请选择指派人">
                  <a-select-option value="worker1">张三</a-select-option>
                  <a-select-option value="worker2">李四</a-select-option>
                  <a-select-option value="worker3">王五</a-select-option>
                  <a-select-option value="worker4">赵六</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话" name="assigneePhone">
                <a-input v-model:value="dispatchForm.assigneePhone" placeholder="请输入联系电话" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="优先级" name="priority">
                <a-select v-model:value="dispatchForm.priority" placeholder="请选择优先级">
                  <a-select-option value="high">
                    <a-tag color="red">高</a-tag>
                  </a-select-option>
                  <a-select-option value="medium">
                    <a-tag color="orange">中</a-tag>
                  </a-select-option>
                  <a-select-option value="low">
                    <a-tag color="green">低</a-tag>
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="预计完成时间" name="expectedTime">
                <a-date-picker
                    v-model:value="dispatchForm.expectedTime"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="请选择预计完成时间"
                    style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item label="备注说明" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-textarea
                v-model:value="dispatchForm.remark"
                placeholder="请输入备注说明"
                :rows="3"
            />
          </a-form-item>

        </a-card>






      </a-form>
    </a-modal>
</template>

<style scoped>
  .report-dispatch {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .report-dispatch-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>
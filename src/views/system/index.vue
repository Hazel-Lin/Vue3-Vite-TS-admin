<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import moment from 'moment'
import { systemData } from './config/systemData'
import mySearch from '@/components/Search/mySearch.vue'
import myTable from '@/components/Mytable/myTable.vue'
const list: any = []
for (let i = 0; i < 20; i++) {
  list.push({
    address: '',
    updateByName: 'xxx',
    provCode: '430000',
    cityCode: '430200',
    companyName: '超级资源有限公司',
    provAndCityName: '湖南省株洲市',
    updateTime: 1658366012000,
    subordinateCode: '',
    parentId: 1,
    companyId: 7,
    companyNo: '',
    createTime: 1658110963000,
    updateBy: 2676,
    businessStr: '业务2',
  })
}

// 渲染表格每一列的数据
const organizationList = [
  {
    label: '公司名称',
    prop: 'companyName',
  },
  {
    label: '业务类型',
    prop: 'businessStr',
  },
  {
    label: '所属地区',
    prop: 'provAndCityName',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '操作人',
    prop: 'updateByName',
  },
  {
    label: '操作时间',
    prop: 'updateTime',
  },
  {
    label: '操作',
    prop: 'handler',
    elProps: {
      width: '160',
    },
  },
]
const tableData: any = ref([])
onMounted(() => {
  tableData.value = list
})
const handleSearch = (): void => {
  // 获取到筛选项数据 => 请求接口进行过滤 => 返回的结果展示给列表组件
}
const handleReset = (): void => {
  // 清空筛选项数据 并且重新获取数据
}
const getTime = (time: number): string => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
const pageSize = ref(10)
const currentPage = ref(1)
const handleEdit = () => {}
const handleDelete = () => {}
const getList = ({ page, limit }: any) => {
  console.log(page, 'page')
  console.log(limit, 'limit')
}
</script>

<template>
  <div>
    <mySearch
      :form-data="systemData"
      @search="handleSearch"
      @reset="handleReset"
    >
      <template #title>
        <div>菜单管理筛选项</div>
      </template>
      <template #footer>
        <!-- <el-button type="primary">
          导入
        </el-button>
        <el-button type="primary">
          导出
        </el-button> -->
      </template>
    </mySearch>

    <myTable
      :column-data="organizationList"
      :table-data="list"
      :total="list.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @pagination="getList"
    >
      <template #title>
        <div>菜单管理</div>
      </template>
      <!-- 标记需要更改的prop属性 再传入修改后的数据 -->
      <template #createTime="{ row }">
        <div>
          {{ getTime(row.createTime) }}
        </div>
      </template>
      <template #updateTime="{ row }">
        <div>
          {{ getTime(row.updateTime) }}
        </div>
      </template>
      <template #handler="{ row }">
        <el-button
          type="primary"
          text
          @click="handleEdit()"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          text
          @click="handleDelete()"
        >
          删除
        </el-button>
      </template>
      <template #button>
        <el-button type="primary">
          导出
        </el-button>
        <el-button type="primary">
          新建
        </el-button>
      </template>
    </myTable>
  </div>
</template>

<style lang="scss" scoped>
</style>


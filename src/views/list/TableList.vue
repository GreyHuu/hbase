<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="部门 rowKey">
              <a-input v-model="queryParam" placeholder="请输入部门的rowKey以查询此部门或者此部门的子部门"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button @click="getDepartmentByRowKey" type="primary" icon="search">
              搜索部门
            </a-button>
            <a-button @click="getAllSubDepartments" icon="search" style="margin-left: 20px">
              搜索子部门
            </a-button>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button @click="getAllDepartments" type="primary">
              获得全部部门
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        rowKey="rowKey"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="action" slot-scope="text, record">
          <a>查看详情</a>
        </span>
      </a-table>
    </a-card>
  </a-card>
</template>

<script>
  import { getAllDept, getDeptByRowKey, getSubDeptByRowKey } from '@/api/hbaseApi'

  export default {
    name: 'TableList',
    components: {},
    data() {
      return {
        //查询的内容
        queryParam: '',
        // 表头
        columns: [
          {
            title: 'rowKey',
            dataIndex: 'rowKey'
          },
          {
            title: '部门名称',
            dataIndex: 'dept'
          },
          {
            title: '父部门',
            dataIndex: 'f_pid',
            customRender: (text) => text || '暂无父部门'
          },
          {
            title: '子部门数量',
            dataIndex: 'subDept',
            customRender: (text) => text.length > 0 ? text.length + ' 个' : '暂无子部门'
          }
        ],
        data: [],
        allData: [],
        loading: false
      }
    },
    beforeMount() {
      this.getAllDepartments()
    },
    methods: {
      /**
       * 获得全部的部门
       */
      getAllDepartments() {
        this.queryParam = ''
        if (!this.allData.length)
          getAllDept().then(res => {
            const { data } = res
            let newData = []
            for (let item of data) {
              newData.push({
                rowKey: item.rowKey,
                dept: item.base_name,
                f_pid: item.base_f_pid,
                subDept: item.subDept
              })
            }
            this.allData = newData
            this.data = this.allData
          })
        else
          this.data = this.allData
      },
      /**
       * 根据rowkey获得部门
       */
      getDepartmentByRowKey() {
        getDeptByRowKey({
          rowKey: this.queryParam
        }).then(res => {
          const { data } = res
          this.data = []
          if (data) {
            this.data.push({
              rowKey: data.rowKey,
              dept: data.base_name,
              f_pid: data.base_f_pid,
              subDept: data.subDept
            })
          }
        })
      },
      /**
       * 获得子部门
       */
      getAllSubDepartments() {
        getSubDeptByRowKey({
          rowKey: this.queryParam
        }).then(res => {
          const { data } = res
          let newData = []
          if (data)
            for (let item of data) {
              newData.push({
                rowKey: item.rowKey,
                dept: item.base_name,
                f_pid: item.base_f_pid,
                subDept: item.subDept
              })
            }
          this.data = newData
        })
      }
    }
  }
</script>

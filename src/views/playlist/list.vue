<template>
  <div>
    <el-table v-loading="loading" :data="playlist" stripe>
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="copywriter" label="描述"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除歌单《{{playlistName}}》吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from '@/api/playlist'
import formatTime from '@/utils/formatTime'
import scroll from '@/utils/scroll' // 滚动条到底部执行回调方法

export default {
  data() {
    return {
      playlist: [],
      count: 50,
      loading: false,
      delDialogVisible: false, //删除歌单对话框是否显示
      playlistName:'', // 要删除的歌单名称
      info: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    scroll.start(this.getList) // 滚动到底部获取数据
  },
  methods: {
    // 获取歌单数据
    getList() {
      this.loading = true
      fetchList({ // 接口参数
        start: this.playlist.length, // 从第几条数据开始获取
        count: this.count // 取几条数据
      }).then((res) => {

        res.data.map((item) => {
          item.createTime = formatTime(new Date(item.createTime))
        })

        this.playlist = this.playlist.concat(res.data)
        if (res.data.length < this.count) { // 已加载全部
          scroll.end()
        }
        this.loading = false
      })
    },
    // 编辑
    onEdit(row) {
      this.$router.push(`/playlist/edit/${row._id}`)
    },
    // 删除
    onDel(row) {
      this.delDialogVisible = true
      this.playlistName = row.name
      this.info.id = row._id
    },
    // 确定删除
    doDel() {
      del({id: this.info.id}).then((res) => {
        this.delDialogVisible = false
        if (res.data.deleted > 0) { // 删除条数大于0
          this.playlist = []
          this.getList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  }
}
</script>

<style lang='scss'>
</style>

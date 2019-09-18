<template>
  <div>
    <el-form ref="form" :model="playlist" label-width="80px">
      <el-form-item label="歌单名称">
        <el-input v-model="playlist.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="playlist.copywriter"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="!isChange">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchById, update } from '@/api/playlist'

export default {
  data() {
    return {
      playlist: {},
      oldName: '',
      oldCopywriter: '',
      isChange: false
    }
  },
  created() {
    // 获取歌单信息
    fetchById({
      id: this.$route.params.id // 取到route传来的id，注意是route 不是router
    }).then((res) => {
      this.playlist = res.data
      this.oldName = res.data.name
      this.oldCopywriter = res.data.copywriter
    })
  },
  watch: {
    ['playlist.name']() {
      this._isChange()
    },
    ['playlist.copywriter']() {
      this._isChange()
    }

  },
  methods: {
    // 是否有内容更新
    _isChange() {
      if (this.playlist.name !== this.oldName || this.playlist.copywriter !== this.oldCopywriter) {
        this.isChange = true
      } else {
        this.isChange = false
      }
    },
    // 提交更新
    onSubmit() {
      update(this.playlist).then((res) => {
        if (res.data.modified > 0) { // 更新条数 大于 0
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        } else {
          this.$message.error('更新失败')
        }
        this.$router.push('/playlist/list')
      })
    },
    // 取消
    onCancel() {
      this.$router.push('/playlist/list')
    }
  }
}
</script>

<style lang='scss'>
</style>

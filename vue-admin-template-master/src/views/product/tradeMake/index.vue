<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="showword"
      >添加</el-button
    >

    <el-table style="width: 100%" border :data="list">
      <el-table-column
        prop="prop"
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" @click="showword2"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
        
     -->
    <el-pagination
      style="margin-top: 10px; textAlign: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="tmfor" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" style="width: 80%" prop="tmName">
          <el-input autocomplete="off" v-model="tmfor.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop='logoUrl'>
          <el-upload
            class="avatar-uploader"
            action=" "
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmfor.logoUrl" :src="tmfor.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="suboradd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMake",
  data() {
    var validatetmName = (rule, value, callback) => {
        if(value.length<2||value.length>10){
          callback(new Error("重新输入"))
        }else{
          callback()
        }
      };
    return {
      //当面页数
      page: 1,
      //每页显示的条数
      limit: 3,
      //总共的数据
      list: [],
      //总共的页数
      total: 1,
      dialogFormVisible: false,

      tmfor: {
        logoUrl: "",
        tmName: "",

      },
      rules: {
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
             { validator: validatetmName, trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择品牌图片',}
          ],
      }
    };
  },
  methods: {
    async getlist() {
      const { page, limit } = this;
      let result = await this.$API.trademake.reqGetlist(page, limit);
      if (result.code == 200) {
        this.page = result.data.current;
        this.limit = result.data.size;
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    
    //修改当前页
    handleCurrentChange(pager) {
      this.page = pager;
      this.getlist();
    },
    //修改每页展示的数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getlist();
    },
    //添加按钮
    showword() {
      this.dialogFormVisible = true;
      this.tmfor = { tmName: "", logoUrl: "" };
    },
    //修改按钮
    showword2() {
      this.dialogFormVisible = true;
    },
    //将数据传给data
    handleAvatarSuccess(res, file) {
     
      this.tmfor.logoUrl = res.data;
    },
    //upload
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    async suboradd() {
      this.dialogFormVisible = false;
      let result = await this.$API.trademake.reqchangeBrands(this.tmfor);
      console.log(result);
      


      // if (result.code == 200) {
      //   this.$message({
      //     message: this.tmfor.id ? "修改成功" : "添加成功",
      //     type: "success",
      //   });
      //   this.getlist();
      // }
      
    },
  },

  mounted() {
    this.getlist();
  },
};
</script>

<style type="text/css" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

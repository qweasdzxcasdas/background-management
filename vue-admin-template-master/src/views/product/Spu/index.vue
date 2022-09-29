<template>
  <div>
    <el-card style="margin: 20px 0">
      <categorySelect @getcateGorylist="getcateGorylist"></categorySelect>
    </el-card>
    <el-card>
      <div v-show="scence == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addspu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SkU"
                @click="addsku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="changespu(row)"
              ></el-button>

              <el-button
                type="info"
                icon="el-icon-message"
                size="mini"
                title="查看当前SPU全部sku列表"
                @click="checksku(row)"
              ></el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除SPU"
                  style="margin-left: 10px"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close='close'>
          <el-table :data="skulist" style="width: 100%" v-loading="loading">
            <el-table-column prop="skuName" label="名称" width="width">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="width">
            </el-table-column>
            <el-table-column prop="weight" label="重量" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="默认图片" width="width">
              <template slot-scope="{row,$index}">
                <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>

        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <Spuform v-show="scence == 1" @cancel="cancel" ref="spu"></Spuform>
      <Skuform v-show="scence == 2" ref="sku" @cancal="cancal"></Skuform>
    </el-card>
  </div>
</template>

<script>
import Spuform from "./Spuform";
import Skuform from "./Skuform";
export default {
  components: {
    Spuform,
    Skuform,
  },
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      Show: true,
      page: 1,
      records: [],
      limit: 3,
      total: 10,
      scence: 0,
      dialogTableVisible: false,
      spu: {},
      skulist: [],
      loading:true
    };
  },
  methods: {
    cancal(scence) {
      this.scence = scence;
    },
    //取消
    cancel() {
      this.scence = 0;
      this.getSpulist();
    },
    //添加spu
    addspu() {
      this.scence = 1;
      this.$refs.spu.getInfo(this.category3Id);
    },
    //修改spu
    changespu(row) {
      this.scence = 1;
      this.$refs.spu.initSpulist(row);
    },
    handleCurrentChange(pages) {
      this.page = pages;
      this.getSpulist();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpulist();
    },
    getcateGorylist({ categoryid, level }) {
      if (level == 1) {
        this.category1Id = categoryid;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryid;
        this.category3Id = "";
      } else {
        this.category3Id = categoryid;
        this.getSpulist();
      }
    },
    async getSpulist() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqgetSpu(page, limit, category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
        console.log(result);
      }
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDelete(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpulist(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku
    addsku(row) {
      this.scence = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //查看sku列表
    async checksku(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      let result = await this.$API.sku.reqchecksku(spu.id);
      if (result.code == 200) {
        
        this.skulist = result.data;
        this.loading=false
      }
    },
    close(done){
      this.loading=true
      this.skulist=[]
      done()
    }
  },
};
</script>

<style type="text/css" scoped>
</style>

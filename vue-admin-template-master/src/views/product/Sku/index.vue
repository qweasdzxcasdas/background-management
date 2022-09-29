<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="100px">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80px">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 1"
            @click="addsku(row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-bottom"
            size="mini"
            v-else
            @click="cancelsku(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editadd(row)"
          ></el-button>
          <el-button type="info" icon="el-icon-info" size="mini"></el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="delsku(row)">
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              style="margin:0 10px"
              
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="6">名称</el-col>
        <el-col :span="16">{{ skulist.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">描述</el-col>
        <el-col :span="16">{{ skulist.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">价格</el-col>
        <el-col :span="16">{{ skulist.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(att, index) in skulist.skuAttrValueList"
              :key="att.id"
              style="margin: 0 10px"
              >{{ att.attrId }}-{{ att.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">商品图片</el-col>
        <el-col :span="16">
          <div class="block" :autoplay="false">
            <el-carousel height="350px">
              <el-carousel-item
                v-for="(img, index) in skulist.skuImageList"
                :key="img.id"
              >
                <img
                  :src="img.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 30,
      records: [],
      isSale: 1,
      drawer: false,
      skulist: {},
    };
  },
  mounted() {
    this.getSku();
  },
  methods: {
    //删除
    async delsku(row){
      let result=await this.$API.sku.reqDelete(row.id)
      if(result.code==200){
        this.$message({type:'success',message:'删除成功'})
        this.getSku()
      }
    },
    //编辑查看
    async editadd(row) {
      this.drawer = true;
      let result = await this.$API.sku.reqSkuid(row.id);
      if (result.code == 200) {
        this.skulist = result.data;
      }
    },
    async getSku() {
      const { page, limit } = this;
      let result = await this.$API.sku.reqGetskulist(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.page = result.data.current;
        this.limit = result.data.size;
        this.total = result.data.total;
      }
    },
    //当前第几页
    handleCurrentChange(pages) {
      this.page = pages;
      this.getSku();
    },
    //当前页显示我条数
    handleSizeChange(limits) {
      this.limit = limits;
      this.getSku();
    },
    //上传
    async addsku(row) {
      let result = await this.$API.sku.reqOnsale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "上传成功" });
        row.isSale = 0;
      }
    },
    async cancelsku(row) {
      let result = await this.$API.sku.reqcancelsale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
        row.isSale = 1;
      }
    },
  },
};
</script>

<style type="text/css" scoped>
.el-row .el-col-6 {
  text-align: right;
  padding-right: 50px;
  font-weight: bolder;
}
.el-row {
  margin: 50px 10px;
}
</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  background-color: blue;
  border-radius: 50%;
}
</style>
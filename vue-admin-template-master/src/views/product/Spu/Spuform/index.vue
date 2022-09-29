<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择名牌" v-model="spu.tmId">
          <el-option
            :label="tmName"
            :value="tm.id"
            v-for="(tm, index) in Trademake"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPu描述">
        <el-input
          placeholder="描述"
          type="textarea"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPu图片">
        <el-upload
          action="/dev-api/admin/product/upload"
          list-type="picture-card"
          :file-list="imglist"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAdd"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" width="20px">
        <el-select
          :placeholder="`还有${unSelectAttr.length}项未选择`"
          v-model="attrADd"
        >
          <el-option
            :label="tm.name"
            :value="`${tm.id}:${tm.name}`"
            v-for="(tm, index) in unSelectAttr"
            :key="tm.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrADd"
          @click="addSelet"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>

              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="savaAddorUpdata">保存</el-button>
        <el-button type="info" @click="$emit('cancel', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
      Trademake: [], //品牌
      imglist: [], //图片列表
      BaseAttrlist: [],
      attrADd: "",
    };
  },
  methods: {
    //添加属性值列表元素
    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      let newAttr = { baseSaleAttrId, saleAttrValueName: inputValue };
      if (inputValue.trim() == "") {
        this.$message("123");
        return;
      }
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) {
        this.$message("请勿重复输入");
        return;
      }
      row.spuSaleAttrValueList.push(newAttr);
      row.inputVisible = false;
    },

    handleAdd(response, file, fileList) {
      this.imglist = fileList;
    },
    handleRemove(file, fileList) {
      this.imglist = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initSpulist(spu) {
      let result = await this.$API.spu.reqspu(spu.id);
      if (result.code == 200) {
        this.spu = result.data;
      }
      let result1 = await this.$API.spu.reqTrademake();
      if (result1.code == 200) {
        this.Trademake = result1.data;
      }
      let result2 = await this.$API.spu.reqSpuimglist(spu.id);
      if (result2.code == 200) {
        let attr = result2.data;
        attr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.imglist = attr;
      }
      let result3 = await this.$API.spu.reqBaseAttrlist();
      if (result3.code == 200) {
        this.BaseAttrlist = result3.data;
      }
    },
    //添加销售属性
    addSelet() {
      const [baseSaleAttrId, saleAttrName] = this.attrADd.split(":");
      let Attrs = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spu.spuSaleAttrList.push(Attrs);
    },
    //保存按钮
    async savaAddorUpdata() {
      this.spu.spuImageList = this.imglist.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response.data && item.response) || item.url,
        };
      });
      let result = await this.$API.spu.reqAddouUpdate(this.spu);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("cancel", 0);
      }
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    async getInfo(category3Id) {
      this.category3Id = category3Id;
      let result1 = await this.$API.spu.reqTrademake();
      if (result1.code == 200) {
        this.Trademake = result1.data;
      }
      let result3 = await this.$API.spu.reqBaseAttrlist();
      if (result3.code == 200) {
        this.BaseAttrlist = result3.data;
      }
    },
  },
  computed: {
    unSelectAttr() {
      return this.BaseAttrlist.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>


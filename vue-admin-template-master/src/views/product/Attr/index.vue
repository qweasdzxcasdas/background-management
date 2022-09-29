<template>
  <div>
    <el-card style="margin: 20px 0">
      <categorySelect @getcateGorylist="getcateGorylist" :Show='!isShow'></categorySelect>
    </el-card>
    <el-card>
      <div v-show="isShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3id"
          @click="addAttrs"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="lists">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attr, index) in row.attrValueList"
                :key="attr.id"
                style="margin: 0 20px"
                >{{ attr.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="250">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="changeAttr(row)"
                >修改</el-button
              >
              
              <el-popconfirm :title="`确定删除${row.attrName}吗？`" @onConfirm='delAttr2($index)'>
                <el-button
                type="danger"
                icon="el-icon-delete"
                
                slot="reference"
                size="mimi"
                >删除</el-button
              >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShow">
        <el-form :inline="true" ref="form" width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >

        <el-button @click="isShow = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="200"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                v-if="row.flag"
                @blur="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                style="display: block"
                @click="toCheck(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm='delAttr($index)'>
                <el-button
                type="danger"
                icon="el-icon-delete"
                
                slot="reference"
                
                >删除</el-button
              >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1id: "",
      category2id: "",
      category3id: "",
      lists: [],
      isShow: true,
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: "",
        categoryLevel: "",
      },
    };
  },
  methods: {
    //保存
    async saveAttr(){
      this.attrInfo.attrValueList= this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAttrinfo(this.attrInfo)
        this.isShow=true
        this.$message({type:'success',message:'保存成功'})
        this.getCategorylists()
      } catch (error) {
        this.$message('保存失败')
      }
      
    },
    //删除
    delAttr2(index) {
     
      this.lists.splice('index',1)
    },
    delAttr(index) {
      this.attrInfo.attrValueList.splice('index',1)
    },
    getcateGorylist({ categoryid, level }) {
      if (level == 1) {
        this.category1id = categoryid;
        this.category2id = "";
        this.category3id = "";
      } else if (level == 2) {
        this.category2id = categoryid;
        this.category3id = "";
      } else {
        this.category3id = categoryid;
        this.getCategorylists();
      }
    },
    async getCategorylists() {
      const { category1id, category2id, category3id } = this;
      let result = await this.$API.attr.reqGetcategorylists(
        category1id,
        category2id,
        category3id
      );
      if (result.code == 200) {
        this.lists = result.data;
      }
    },
    //添加属性值
    addAttr() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性
    addAttrs() {
      this.isShow = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3id,
        categoryLevel: 3,
      };
    },
    //修改属性
    changeAttr(row) {
      this.isShow = false;
      this.attrInfo = cloneDeep(row);
      this.$nextTick(() => {
        this.attrInfo.attrValueList.forEach((item) => {
          this.$set(item, "flag", false);
        });
      });
    },
    //输入属性
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请输入文本");
        return;
      }
      let isRept = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRept) {
        this.$message("数据重复请重新输入");
        return;
      }
      row.flag = false;
    },
    //查看属性
    toCheck(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
  },
};
</script>

<style type="text/css" scoped>
</style>

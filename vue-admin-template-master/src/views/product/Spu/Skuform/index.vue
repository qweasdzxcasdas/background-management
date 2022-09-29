<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称" v-model="spu">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input
          placeholder="价格"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input placeholder="重量" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          type="textarea"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label=" attr.attrName " v-for="(attr,index) in Attrinfolist" :key="attr.id">
            <el-select  placeholder="请选择" v-model='attr.addorupdata' >
              <el-option   :label="att.valueName" :value="`${attr.id}:${att.id}`" v-for="(att,index) in attr.attrValueList" :key="att.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attclo.saleAttrName" v-for="(attclo,index) in spuSaleattrlist" :key="attclo.id">
            <el-select  placeholder="请选择" v-model="attclo.attshuxing">
              <el-option :label="attqwe.saleAttrValueName" :value="`${attclo.id}:${attqwe.id}`" v-for="(attqwe,index) in attclo.spuSaleAttrValueList" :key="attqwe.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="imgList" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            prop="prop"
            label="label"
            width="80px"
            
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" @click="attrdef(row)" v-if="row.isDefault==0">设为默认</el-button>
              <el-button type="primary" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="info" @click="cancal">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        skuName: "",
        weight: "",
        price: 0,
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuDefaultImg: "",
        skuDesc: "",
        skuImageList: [
          //
        ],

        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      //存储图片信息
      imgList: [],
      //存储销售属性
      spuSaleattrlist: [],
      //存储平台属性
      Attrinfolist: [],
      spu: {},
      imglists:[]
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      (this.skuInfo.category3Id = spu.category3Id),
        (this.skuInfo.spuId = spu.id),
        (this.skuInfo.tmId = spu.tmId),
        (this.spu = spu);
      let result = await this.$API.sku.reqGetspulist(spu.id);
      if (result.code == 200) {
        let list = result.data
        list.forEach(item=>{
          item.isDefault=0
        })
        this.imgList=list
      }
      let result2 = await this.$API.sku.reqGetspuattr(spu.id);
      if (result2.code == 200) {
        this.spuSaleattrlist = result2.data;
      }
      let result3 = await this.$API.sku.reqAttrinfo(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result3.code == 200) {
        this.Attrinfolist = result3.data;
      }
    },
    //取消按钮
    cancal(){
      this.$emit("cancal",0)
      Object.assign(this._data,this.$options.data())
    },
    //排他操作
    attrdef(row){
      this.imgList.forEach(item=>{
        item.isDefault=0
      })
      row.isDefault=1
      this.skuInfo.skuDefaultImg=row.imgUrl
    },
    handleSelectionChange(params){
      this.imglists=params
    },
    //保存
    async save(){
      const {Attrinfolist,skuInfo,spuSaleattrlist,imglists}=this
      let attr=[]
      Attrinfolist.forEach(item=>{
        if(item.addorupdata){
          const [attrId,valueId]= item.addorupdata.split(':')
          let obj={attrId,valueId}
          attr.push(obj)
        }
      })
      skuInfo.skuAttrValueList=attr

      skuInfo.skuSaleAttrValueList= spuSaleattrlist.reduce((prev,item)=>{
        if(item.attshuxing){
          const [saleAttrId,saleAttrValueId]= item.attshuxing.split(':')
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])
      skuInfo.imgList= imglists.map(item=>{
        return{
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuId:item.spuId
        }
      })
      let result= await this.$API.sku.reqAttrsave(skuInfo)
      console.log(result);
    },
  },
};
</script>

<style type="text/css" scoped>
</style>

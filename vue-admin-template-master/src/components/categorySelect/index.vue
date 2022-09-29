<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" value="" v-model="cForm.category1id" @change="handle1" :disabled="Show">
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key='c1.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="cForm.category2id" @change="handle2" :disabled="Show">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="cForm.category3id" @change="handle3" :disabled="Show">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
          
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:['Show'],
  name: "categorySelect",
  data() {
    return {
      list1:[],
      list2:[],
      list3:[],
      cForm:{
        category1id:'',
        category2id:'',
        category3id:'',
      }
    };
  },
  methods: {
    async Getcategorylist(){
      
      let result= await this.$API.attr.reqGetcategorylist()
      if(result.code==200){
        this.list1=result.data
      }
    },
    async handle1(){
      const {category1id}=this.cForm
      this.list2=[],
      this.list3=[],
      this.cForm.category2id=''
      this.cForm.category3id=''
      let result= await this.$API.attr.reqGetcategorylist2(category1id)
      this.$emit('getcateGorylist',{categoryid:category1id,level:1})
      if(result.code==200){
        this.list2=result.data
      }
    },
    async handle2(){
      const {category2id}=this.cForm
      this.list3=[],
      this.cForm.category3id=''
      let result=await this.$API.attr.reqGetcategorylist3(category2id)
       this.$emit('getcateGorylist',{categoryid:category2id,level:2})
      if(result.code==200){
        this.list3=result.data
      }
    },
    async handle3(){
      const {category1id,category2id,category3id}=this.cForm
      let result=await this.$API.attr.reqGetcategorylist3(category1id,category2id,category3id)
      this.$emit('getcateGorylist',{categoryid:category3id,level:3})
      console.log(result);
    }
  },
  mounted() {
    this.Getcategorylist()
  },
};
</script>

<style type="text/css" scoped>
</style>

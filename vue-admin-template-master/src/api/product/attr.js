import request from '@/utils/request'
//获取一级分类
export const reqGetcategorylist=()=>{
    return request({url:'/admin/product/getCategory1',method:'get'})
}
//获取二级分类
export const reqGetcategorylist2=(category1Id)=>{
    return request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
}
//获取三级分类
export const reqGetcategorylist3=(category2Id)=>{
    return request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})
}
//获取商品列表
export const reqGetcategorylists=(category1Id,category2Id,category3Id)=>{
    return request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
}

//收集属性名
export const reqAttrinfo=(data)=>{
    return request({url:'/admin/product/saveAttrInfo',method:'post',data})
}

// {
//     "attrName": "string",
//     "attrValueList": [
//       {
//         "attrId": 0,
//         "id": 0,
//         "valueName": "string"
//       }
//     ],
//     "categoryId": 0,
//     "categoryLevel": 0,
//     "id": 0
//   }
import request from '@/utils/request'
//获取spu图片列表
export const reqGetspulist=(spuId)=>{
    return request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
}
//获取销售属性
export const reqGetspuattr=(spuId)=>{
    return request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})
}
//获取平台属性
export const reqAttrinfo=(category1Id,category2Id,category3Id)=>{
    return request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
}
//保存
export const reqAttrsave=(skuInfo)=>{
    return request({url:'/admin/product/saveSkuInfo',method:'post',data:'skuInfo'})
}
//查看sku列表
export const reqchecksku=(spuId)=>{
    return request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
}
//获取sku列表
export const reqGetskulist=(page,limit)=>{
    return request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
}
//上架
export const reqOnsale=(skuId)=>{
    return request({url:`/admin/product/onSale/${skuId}`,method:'get'})
}
//下架
export const reqcancelsale=(skuId)=>{
    return request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
}
//抽屉
export const reqSkuid=(skuId)=>{
    return request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
}
//删除
export const reqDelete=(skuId)=>{
    return request({url:`/admin/product/deleteSku/${skuId}`,method:'delete'})
}
import request from '@/utils/request'

export const reqgetSpu=(page,limit,category3Id)=>{
    return request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})
}
//获取spu基本信息
export const reqspu=(spuId)=>{
    return request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})
}
//获取品牌信息
export const reqTrademake=()=>{
    return request({url:"/admin/product/baseTrademark/getTrademarkList",method:'get'})
}
//获取spu图片
export const reqSpuimglist=(spuId)=>{
    return request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
}
//获取全平台销售属性
export const reqBaseAttrlist=()=>{
    return request({url:'/admin/product/baseSaleAttrList',method:'get'})
}
//保存和添加按钮
export const reqAddouUpdate=(spuInfo)=>{
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}
//删除
export const reqDelete=(spuId)=>{
    return request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})
}
    

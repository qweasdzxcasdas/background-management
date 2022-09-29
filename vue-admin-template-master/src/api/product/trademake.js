import request from '@/utils/request'
export const reqGetlist=(page,limit)=>{
    return request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
}

//添加品牌和品牌
export const reqchangeBrands=(tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',data:'tradeMark',method:'put'})
    }else{
        return request({url:'/admin/product/baseTrademark/save',data:'tradeMark',method:'post'})
    }
}
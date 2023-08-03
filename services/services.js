import axiosApi from "@/api/items";

export const get_process_types=async(SubCatID)=>{
     const response = await axiosApi.get(`properties?cat=${SubCatID}`)
     console.log(`response`,response)
     return response.data
}

export const get_models=async(BrandId)=>{
    const response = await axiosApi.get(`get-options-child/${BrandId}`)
    console.log(`response`,response)
    return response.data
}

export const get_types=async(ModelId)=>{
    const response = await axiosApi.get(`get-options-child/${ModelId}`)
    console.log(`response`,response)
    return response.data
}

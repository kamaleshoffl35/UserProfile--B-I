import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

export const fetchCategories=createAsyncThunk("categories/fetchAll",async () => {
    const res=await axios.get(API_URL)
    return res.data
})

export const addCategory=createAsyncThunk("categories/add",async (category) => {
    const res =await axios.post(API_URL)
    return res.data
})

export const deleteCategory=createAsyncThunk("categories/delete",async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const categorySlice=createSlice({
    name:"categories",
    initialState:{
        items:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategories.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
           state.status="failed"
           state.items=action.error.message
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.items=state.items.filter((c)=>c._id !== action.payload )
        })
        
    }
})
export default categorySlice.reducer
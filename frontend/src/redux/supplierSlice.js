import { createSlice,createAsyncThunk, buildCreateSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://localhost:5000/api/suppliers"

export const fetchsuppliers=createAsyncThunk("suppliers/fetchAll",async () => {
    const res = await axios.get(API_URL)
    return res.data
})

export const addSupplier=createAsyncThunk("suppliers/add",async (supplier) => {
    const res = await axios.post(API_URL,supplier)
    return res.data
})

export const deleteSupplier=createAsyncThunk("suppliers/delete",async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const supplierSlice=createSlice({
    name:"suppliers",
    initialState:{
        items:[],
    status:"idle",
error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchsuppliers.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchsuppliers.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchsuppliers.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addSupplier.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deleteSupplier.fulfilled,(state,action)=>{
            state.items=state.items.filter((s)=>s._id !== action.payload)
        })
    }
})

export default supplierSlice.reducer
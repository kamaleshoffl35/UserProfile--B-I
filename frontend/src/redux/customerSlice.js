import { createSlice,createAsyncThunk, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:5000/api/customers"

export const fetchcustomers = createAsyncThunk("customers/fetchAll",async () => {
    const res=await axios.get(API_URL)
    return res.data
})

export const addcustomer=createAsyncThunk("customers/add",async (customer) => {
    const res = await axios.post(API_URL,customer)
    return res.data
})

export const deletecustomer=createAsyncThunk("customers/delete",async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const customerSlice=createSlice({
    name:"customers",
    initialState:{
        items:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchcustomers.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchcustomers.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchcustomers.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
    })
    .addCase(addcustomer.fulfilled,(state,action)=>{
        state.items.push(action.payload)
    })
    .addCase(deletecustomer.fulfilled,(state,action)=>{
        state.items=state.items.filter((c)=>c._id !== action.payload)
    })
    }
        
})

export default customerSlice.reducer
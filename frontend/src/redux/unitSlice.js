import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL ="http://localhost:5000/api/products"

export const fetchUnits=createAsyncThunk("units/fetchAll",async()=>{
    const res=await axios.get(API_URL)
    return res.data
})

export const addUnit=createAsyncThunk("units/add",async(unit)=>{
    const res=await axios.post(API_URL)
    return res.data
})

export const deleteUnit=createAsyncThunk("units/delete",async(id)=>{
    await axios.get(`${API_URL}/${id}`)
    return id
})

const unitSlice= createSlice({
    name:"units",
    initialState:{
        items:[],
        status:"idle",
        reducers:{},
        extrareducers:(builder)=>{
            builder
            .addcase(fetchUnits.pending,(state)=>{
                state.status="loading"
            })
            .addcase(fetchUnits.fulfilled,(state,action)=>{
                state.status="success"
                state.items=action.payload
            })
            .addcase(fetchUnits.rejected,(state,action)=>{
                state.status="failed"
                state.items=action.error.message
            })
            .addcase(addUnit.fulfilled,(state,action)=>{
                state.items.push(action.payload)
            })
            .addcase(deleteUnit.fulfilled,(state,action)=>{
                state.items = state.items.filter((u)=>u._id !== action.payload)
            })
        }
    }
})

export default unitSlice.reducer
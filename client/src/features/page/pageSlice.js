import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";

const initialState = { status: 'idle', data: {}, error: null, message: null };

export const fetchPage = createAsyncThunk('page/fetch', async ({id,chapterId,moduleId,fromLocalOrUseDefault}) => {
    const data = await useFetch(`/mycourses/page/${id}`);
    const [page, setPage] = useLocalStorage(`page/${id}`, {
        initial: {
            fromLocalOrUseDefault: fromLocalOrUseDefault ?? true,
            data: data.page
        },
        dataType: 'JSON'
    });

    page.chapterId = chapterId;
    page.moduleId = moduleId;

    if (page.title === undefined) {
        if (data.success) {
            setPage(data.page);
            return data.page;
        } else {
            setPage({});
            return {};
        }
    }
    return page;
});

const sendMessage = (message,dispatch,success=true,delay=5000) => {
    let actionCreator;
    if(success){
        actionCreator = pageActionSuccessCaptured;
    }else{
        actionCreator = pageActionErrorCaptured;
    }
    dispatch(actionCreator(message));
    setTimeout(() => {
        dispatch(actionCreator(null));
    },delay);
};

export const saveToCloud = createAsyncThunk('page/saveTocloud',async (_,{getState,dispatch}) => {
    try{
        const {page} = getState();
        const {chapterId,moduleId} = page.data;
        const {success} = await useFetch(`/mycourses/page/${page.data.id}`,page.data,'PUT');
        if(success){
            sendMessage('Content Saved to cloud',dispatch);
            // dispatch(fetchPage({id:page.data.id,chapterId,moduleId,fromLocalOrUseDefault:false}));
        }else{
            sendMessage('Cannot able to save to cloud!',dispatch,false);
        }
    }catch(error){
        sendMessage('Cannot able to save to cloud!',dispatch,false);
    }
});

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        pageContentUpdated(state, action) {
            state.data.content = action.payload
        },
        pageActionSuccessCaptured(state,action){
            state.message = {message : action.payload,success:true};
        },
        pageActionErrorCaptured(state,action){
            state.message = {message : action.payload,success:false};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPage.pending, (state) => {
            state.status = 'Loading';
        })
            .addCase(fetchPage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
    }
});

export const { pageContentUpdated,pageActionErrorCaptured,pageActionSuccessCaptured } = pageSlice.actions;
export default pageSlice.reducer;
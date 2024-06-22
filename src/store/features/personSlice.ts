import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PersonState {
  persons: {
    id: number;
    name: string;
  }[];
}

const initialState: PersonState = {
  persons: []
}
export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<{ name: string }>) => {
      state.persons.push({
        id: state.persons.length,
        name: action.payload.name,
      })
    }
  }
})
  
export default PersonSlice.reducer;
export const { addPerson } = PersonSlice.actions;
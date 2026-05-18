import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { fetchUsersApi } from '../services/api';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchUsersApi(page);
      return { results: response.results, page };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        // If it's the first page, we might want a full screen loader, but we keep it simple here
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.users = action.payload.results;
        } else {
          // Append only new users to avoid duplicates if API acts weird
          const existingIds = new Set(state.users.map(u => u.login.uuid));
          const newUsers = action.payload.results.filter(u => !existingIds.has(u.login.uuid));
          state.users = [...state.users, ...newUsers];
        }
        state.page = action.payload.page;
        if (action.payload.results.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch users';
      });
  },
});

export const { setSearchQuery, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;

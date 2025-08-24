import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TimesheetEntry {
  id: string;
  date: string;
  project: string;
  module: string;
  activity: string;
  description: string;
  start: string;
  end: string;
  hours: number;
}

interface TimesheetState {
  entries: TimesheetEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: TimesheetState = {
  entries: [],
  loading: false,
  error: null,
};

export const fetchTimesheetData = createAsyncThunk<TimesheetEntry[]>(
  'timesheet/fetchTimesheetData',
  async () => {
    const raw = await (await import('@/lib/httpService')).get('/timesheet');
    const today = new Date().toISOString().slice(0,10);
    return raw.map((e: any) => ({
      id: crypto.randomUUID(),
      date: today,
      project: e.project || '',
      module: e.module || '',
      activity: e.activity || '',
      description: e.description || '',
      start: e.start || '',
      end: e.end || '',
      hours: e.hours || 0
    }));
  }
);

const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    setEntries(state, action: PayloadAction<TimesheetEntry[]>) {
      state.entries = action.payload;
    },
    addEntry(state, action: PayloadAction<TimesheetEntry>) {
      state.entries.push(action.payload);
    },
    removeEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimesheetData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimesheetData.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchTimesheetData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch timesheet data';
      });
  },
});

export const { setEntries, addEntry, removeEntry } = timesheetSlice.actions;
export default timesheetSlice.reducer;

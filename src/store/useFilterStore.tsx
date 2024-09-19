// store.ts
import { create } from 'zustand';

interface Filter {
    id: number;
    field: string;
    condition: string;
    value: string;
}

interface FilterState {
    filters: Filter[];
    appliedFilters: Filter[];
    tableFields: { value: string; label: string }[];
    activeFilterId: number | null;
    activeFilterCondition: string;
    activeFilterField: string; // New state for the currently selected field
    setActiveFilterId: (id: number | null) => void;
    setActiveFilterField: (field: string) => void; // New setter function
    addFilter: () => void;
    removeFilter: (id: number) => void;
    clearAllFilters: () => void;
    updateFilterField: (id: number, fieldValue: string) => void;
    updateFilterCondition: (id: number, conditionValue: string) => void;
    updateFilterValue: (id: number, value: string) => void;
    setTableFields: (fields: { value: string; label: string }[]) => void;
    applyFilters: () => void;
    getActiveFilterCondition: () => string;
    setActiveFilterCondition: (condition: string) => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
    filters: [{ id: Date.now(), field: '', condition: '', value: '' }],
    activeFilterCondition: '',
    appliedFilters: [],
    tableFields: [],
    activeFilterId: null,
    activeFilterField: '', // Initialize with empty string
    setActiveFilterId: (id: number | null) => set(() => ({ activeFilterId: id })),
    setActiveFilterField: (field: string) => {
        set(() => ({ activeFilterField: field }));
        console.log('Selected field:', field); // Log selected field here
    },
    addFilter: () =>
        set((state) => ({
            filters: [...state.filters, { id: Date.now(), field: '', condition: '', value: '' }],
        })),
    removeFilter: (id: number) =>
        set((state) => ({
            filters: state.filters.filter((filter) => filter.id !== id),
        })),
    clearAllFilters: () => set(() => ({ filters: [] })),
    updateFilterField: (id: number, fieldValue: string) =>
        set((state) => ({
            filters: state.filters.map((filter) =>
                filter.id === id ? { ...filter, field: fieldValue } : filter,
            ),
        })),
    updateFilterCondition: (id: number, conditionValue: string) =>
        set((state) => ({
            filters: state.filters.map((filter) =>
                filter.id === id ? { ...filter, condition: conditionValue } : filter,
            ),
        })),
    updateFilterValue: (id: number, value: string) =>
        set((state) => ({
            filters: state.filters.map((filter) =>
                filter.id === id ? { ...filter, value } : filter,
            ),
        })),
    setTableFields: (fields: { value: string; label: string }[]) => set(() => ({ tableFields: fields })),
    applyFilters: () => set((state) => ({
        appliedFilters: state.filters
    })),
    getActiveFilterCondition: () => {
        const state = get();
        const activeFilter = state.filters.find(filter => filter.id === state.activeFilterId);
        return activeFilter ? activeFilter.condition : '';
    },
      setActiveFilterCondition: (condition: string) => set({ activeFilterCondition: condition }),
}));

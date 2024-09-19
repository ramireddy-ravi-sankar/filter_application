import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CrossCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import { useFilterStore } from '@/store/useFilterStore';
import FilterFieldSelector from './FilterFieldSelector';
import ConditionSelector from './ConditionSelector';
import DateRangeSelector from './DateRangeSelector';


const FilterControls: React.FC = () => {
  const {
    filters,
    addFilter,
    removeFilter,
    clearAllFilters,
    updateFilterValue,
    setActiveFilterId,
    applyFilters,
    activeFilterField,
  } = useFilterStore();

  useEffect(() => {
    console.log("Selected field:", activeFilterField);
  }, [activeFilterField]);

  const isDateField = activeFilterField === 'Date' || activeFilterField === 'createdAt';
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-100">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="font-medium leading-none">In this view, show records:</p>
          </div>
          <hr />
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="flex flex-row space-x-1"
              onClick={() => setActiveFilterId(filter.id)}  // Set active filter
            >
              <div className="flex items-center">
                <Label htmlFor="where">Where</Label>
                <div className="ml-2">
                  <FilterFieldSelector /> {/* No props needed */}
                </div>
              </div>
             {!isDateField && (
                <div className="flex items-center">
                  <div className="ml-2">
                    <ConditionSelector /> {/* No props needed */}
                  </div>
                </div>
              )}
              <div className="flex items-center">
                {activeFilterField === 'Date' || activeFilterField === 'createdAt' ? (
                  // Conditionally render DateRangeSelector if selectedField is Date or createdAt
                  <DateRangeSelector />
                ) : (
                  // Otherwise, show Input field for entering value
                  <Input
                    id="enter value"
                    placeholder="Enter value..."
                    className="ml-2 h-8 w-24"
                    value={filter.value}
                    onChange={(e) => updateFilterValue(filter.id, e.target.value)} // Pass both id and value
                  />
                )}
              </div>
              <div className="flex items-center cursor-pointer" onClick={() => removeFilter(filter.id)}>
                <CrossCircledIcon />
              </div>
            </div>
          ))}
          <hr />
          <div className="flex justify-between items-center">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={addFilter}>
              <PlusIcon />
              Add filter
            </Button>
            <div className="flex gap-2">
              <Button
                className="bg-transparent text-black hover:bg-transparent hover:text-black focus:ring-0 focus:outline-none active:bg-transparent"
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={() => {
                applyFilters(); // Apply filters on button click
              }}>
                Apply filters
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterControls;

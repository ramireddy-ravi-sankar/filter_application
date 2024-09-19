import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFilterStore } from '@/store/useFilterStore';


const filterWays = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'greater than', label: 'Greater than' },
  { value: 'less than', label: 'Less than' },
  { value: 'between', label: 'Between' },
];

function FiltersOptionsList() {
  const { getActiveFilterCondition, setActiveFilterCondition } = useFilterStore();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(getActiveFilterCondition());

  React.useEffect(() => {
    setValue(getActiveFilterCondition());
  }, [getActiveFilterCondition]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? filterWays.find((filterWay) => filterWay.value === value)?.label : 'Select condition'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search filter option" className="h-9" />
          <CommandList>
            <CommandEmpty>No filter ways found.</CommandEmpty>
            <CommandGroup>
              {filterWays.map((filterWay) => (
                <CommandItem
                  key={filterWay.value}
                  value={filterWay.value}
                  onSelect={(currentValue) => {
                    const selectedValue = currentValue === value ? '' : currentValue;
                    setValue(selectedValue);
                    setActiveFilterCondition(selectedValue); // Update Zustand state
                    setOpen(false);
                  }}
                >
                  {filterWay.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === filterWay.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FiltersOptionsList;

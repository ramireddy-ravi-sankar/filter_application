// FilterList.tsx
import { useState } from 'react';
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFilterStore } from '@/store/useFilterStore';


function FilterList() {
  const { tableFields, setActiveFilterField } = useFilterStore();  // Access store functions
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? tableFields.find((field) => field.value === value)?.label : 'Select filter'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search attributes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No field found.</CommandEmpty>
            <CommandGroup>
              {tableFields.map((field) => (
                <CommandItem
                  key={field.value}
                  value={field.value}
                  onSelect={(currentValue) => {
                    const selectedValue = currentValue === value ? '' : currentValue;
                    setValue(selectedValue);
                    setActiveFilterField(selectedValue);  // Set active field and log it
                    setOpen(false);
                  }}
                >
                  {field.label}
                  <CheckIcon
                    className={value === field.value ? 'ml-auto h-4 w-4 opacity-100' : 'ml-auto h-4 w-4 opacity-0'}
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

export default FilterList;

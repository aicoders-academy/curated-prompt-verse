
import React from 'react';
import { Category, Tool } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Filter, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';

type PromptFilterBarProps = {
  categories: Category[];
  tools: Tool[];
  selectedCategories: string[];
  selectedTools: string[];
  onCategoryChange: (ids: string[]) => void;
  onToolChange: (ids: string[]) => void;
  onResetFilters: () => void;
};

export function PromptFilterBar({
  categories,
  tools,
  selectedCategories,
  selectedTools,
  onCategoryChange,
  onToolChange,
  onResetFilters,
}: PromptFilterBarProps) {
  // Toggle category selection
  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      onCategoryChange(selectedCategories.filter(catId => catId !== id));
    } else {
      onCategoryChange([...selectedCategories, id]);
    }
  };

  // Toggle tool selection
  const toggleTool = (id: string) => {
    if (selectedTools.includes(id)) {
      onToolChange(selectedTools.filter(toolId => toolId !== id));
    } else {
      onToolChange([...selectedTools, id]);
    }
  };

  // Get names for selected IDs
  const getSelectedCategoryNames = () => {
    return categories
      .filter(cat => selectedCategories.includes(cat.id))
      .map(cat => cat.name);
  };

  const getSelectedToolNames = () => {
    return tools
      .filter(tool => selectedTools.includes(tool.id))
      .map(tool => tool.name);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTools.length > 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 px-1 font-normal">
                {selectedCategories.length + selectedTools.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar filtros..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              
              <CommandGroup heading="Categorias">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category.id);
                  return (
                    <CommandItem
                      key={category.id}
                      onSelect={() => toggleCategory(category.id)}
                    >
                      <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${isSelected ? 'bg-primary border-primary' : 'border-input'}`}>
                        {isSelected ? <Check className="h-3 w-3 text-primary-foreground" /> : null}
                      </div>
                      <span>{category.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              
              <CommandSeparator />
              
              <CommandGroup heading="Ferramentas">
                {tools.map((tool) => {
                  const isSelected = selectedTools.includes(tool.id);
                  return (
                    <CommandItem
                      key={tool.id}
                      onSelect={() => toggleTool(tool.id)}
                    >
                      <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${isSelected ? 'bg-primary border-primary' : 'border-input'}`}>
                        {isSelected ? <Check className="h-3 w-3 text-primary-foreground" /> : null}
                      </div>
                      <span>{tool.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              
              {hasActiveFilters && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={onResetFilters} className="justify-center text-center">
                      Limpar filtros
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1 items-center">
          {getSelectedCategoryNames().map((name) => (
            <Badge key={name} variant="secondary" className="px-2 py-1">
              {name}
            </Badge>
          ))}
          
          {getSelectedToolNames().map((name) => (
            <Badge key={name} className="bg-accent text-accent-foreground px-2 py-1">
              {name}
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={onResetFilters}
          >
            <X className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        </div>
      )}
    </div>
  );
}

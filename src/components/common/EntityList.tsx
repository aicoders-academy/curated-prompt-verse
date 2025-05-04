
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EntityCard } from './EntityCard';
import type { Category, Tool } from '@/lib/mock-data';

type EntityListProps = {
  entities: (Category | Tool)[];
  type: 'category' | 'tool';
  onDelete?: (id: string) => void;
  title: string;
};

export function EntityList({ entities, type, onDelete, title }: EntityListProps) {
  const entityPath = type === 'category' ? 'categories' : 'tools';
  const entityNameSingular = type === 'category' ? 'categoria' : 'ferramenta';
  const entityNamePlural = type === 'category' ? 'categorias' : 'ferramentas';
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link to={`/${entityPath}/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova {entityNameSingular}
          </Button>
        </Link>
      </div>
      
      {entities.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-muted/20">
          <p className="text-lg text-muted-foreground">
            Nenhuma {entityNameSingular} encontrada
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Clique no botão acima para adicionar {entityNamePlural}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entities.map(entity => (
            <EntityCard
              key={entity.id}
              entity={entity}
              type={type}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Category, Tool } from '@/lib/mock-data';

type EntityCardProps = {
  entity: Category | Tool;
  type: 'category' | 'tool';
  onDelete?: (id: string) => void;
};

export function EntityCard({ entity, type, onDelete }: EntityCardProps) {
  const entityPath = type === 'category' ? 'categories' : 'tools';
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{entity.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {entity.description || <em>Sem descrição</em>}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/${entityPath}/edit/${entity.id}`}>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
        </Link>
        
        {onDelete && (
          <Button 
            variant="outline" 
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(entity.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

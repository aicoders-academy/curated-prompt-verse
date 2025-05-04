
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Prompt, Category, Tool } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type PromptCardProps = {
  prompt: Prompt;
  categories: Category[];
  tools: Tool[];
  onDelete?: (id: string) => void;
  className?: string;
};

export function PromptCard({ prompt, categories, tools, onDelete, className }: PromptCardProps) {
  // Filtrar categorias e ferramentas associadas a este prompt
  const promptCategories = categories.filter(category => 
    prompt.categories.includes(category.id)
  );
  
  const promptTools = tools.filter(tool => 
    prompt.tools.includes(tool.id)
  );
  
  // Formatar data de criação
  const formattedDate = new Date(prompt.createdAt).toLocaleDateString('pt-BR');

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{prompt.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-muted-foreground text-sm">
            {truncateText(prompt.description || '', 100)}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {promptCategories.map(category => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {promptTools.map(tool => (
              <Badge key={tool.id} className="bg-accent text-accent-foreground text-xs">
                {tool.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4 bg-muted/30">
        <span className="text-xs text-muted-foreground">Criado em {formattedDate}</span>
        
        <div className="flex space-x-2">
          <Link to={`/prompts/${prompt.id}`}>
            <Button variant="outline" size="sm" className="h-8 px-2">
              Ver
            </Button>
          </Link>
          
          <Link to={`/prompts/edit/${prompt.id}`}>
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(prompt.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Tool, Category, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex flex-col w-64 bg-accent p-4 h-screen", className)}>
      <div className="flex items-center mb-8">
        <Book className="mr-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">Prompt Library</h1>
      </div>
      
      <nav className="space-y-1 flex-1">
        <Link 
          to="/" 
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent-foreground/10 transition-colors"
        >
          <Book className="mr-2 h-5 w-5" />
          Prompts
        </Link>
        
        <Link 
          to="/categories" 
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent-foreground/10 transition-colors"
        >
          <Category className="mr-2 h-5 w-5" />
          Categorias
        </Link>
        
        <Link 
          to="/tools" 
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent-foreground/10 transition-colors"
        >
          <Tool className="mr-2 h-5 w-5" />
          Ferramentas
        </Link>
      </nav>
      
      <div className="mt-auto pt-4">
        <Link 
          to="/prompts/new" 
          className="flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="mr-2 h-5 w-5" />
          Novo Prompt
        </Link>
      </div>
    </div>
  );
}

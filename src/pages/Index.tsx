
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Layout } from '@/components/layout/Layout';
import { PromptCard } from '@/components/prompt/PromptCard';
import { PromptFilterBar } from '@/components/prompt/PromptFilterBar';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { 
  filterPrompts, 
  getActivePrompts, 
  getAllCategories, 
  getAllTools,
  deletePrompt
} from '@/lib/mock-data';
import type { Prompt, Category, Tool } from '@/lib/mock-data';

const Index = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [promptToDelete, setPromptToDelete] = useState<string | null>(null);

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  // Filtrar prompts quando os filtros mudarem
  useEffect(() => {
    const filteredPrompts = filterPrompts(selectedCategories, selectedTools);
    setPrompts(filteredPrompts);
  }, [selectedCategories, selectedTools]);

  const loadData = () => {
    setPrompts(getActivePrompts());
    setCategories(getAllCategories());
    setTools(getAllTools());
  };

  const handleDeletePrompt = (id: string) => {
    setPromptToDelete(id);
  };

  const confirmDeletePrompt = () => {
    if (promptToDelete) {
      deletePrompt(promptToDelete);
      setPrompts(getActivePrompts());
      toast.success('Prompt excluído com sucesso!');
      setPromptToDelete(null);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTools([]);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Biblioteca de Prompts</h1>
        
        <PromptFilterBar
          categories={categories}
          tools={tools}
          selectedCategories={selectedCategories}
          selectedTools={selectedTools}
          onCategoryChange={setSelectedCategories}
          onToolChange={setSelectedTools}
          onResetFilters={resetFilters}
        />
        
        {prompts.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-muted/20">
            <p className="text-lg text-muted-foreground">
              Nenhum prompt encontrado
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {selectedCategories.length > 0 || selectedTools.length > 0
                ? "Tente ajustar os filtros aplicados"
                : "Clique em 'Novo Prompt' para adicionar seu primeiro prompt"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                categories={categories}
                tools={tools}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        )}
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger className="hidden">
          Open
        </AlertDialogTrigger>
        <ConfirmDialog
          isOpen={!!promptToDelete}
          title="Excluir Prompt"
          description="Tem certeza que deseja excluir este prompt? Esta ação não poderá ser desfeita."
          onConfirm={confirmDeletePrompt}
          onCancel={() => setPromptToDelete(null)}
          confirmText="Excluir"
          cancelText="Cancelar"
          danger
        />
      </AlertDialog>
    </Layout>
  );
};

export default Index;

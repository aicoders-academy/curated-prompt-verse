
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { EntityList } from '@/components/common/EntityList';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getAllCategories, deleteCategory } from '@/lib/mock-data';
import type { Category } from '@/lib/mock-data';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(getAllCategories());
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      loadCategories();
      toast.success('Categoria excluída com sucesso!');
      setCategoryToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <EntityList
          title="Gerenciar Categorias"
          entities={categories}
          type="category"
          onDelete={handleDeleteCategory}
        />
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger className="hidden">
          Open
        </AlertDialogTrigger>
        <ConfirmDialog
          isOpen={!!categoryToDelete}
          title="Excluir Categoria"
          description="Tem certeza que deseja excluir esta categoria? Esta ação não poderá ser desfeita e a categoria será removida de todos os prompts associados."
          onConfirm={confirmDeleteCategory}
          onCancel={() => setCategoryToDelete(null)}
          confirmText="Excluir"
          cancelText="Cancelar"
          danger
        />
      </AlertDialog>
    </Layout>
  );
};

export default Categories;

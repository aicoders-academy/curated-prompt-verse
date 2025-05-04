
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { EntityForm } from '@/components/common/EntityForm';
import {
  getCategoryById,
  createCategory,
  updateCategory
} from '@/lib/mock-data';
import type { Category } from '@/lib/mock-data';

const CreateEditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && id) {
      const foundCategory = getCategoryById(id);
      
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        toast.error('Categoria não encontrada');
        navigate('/categories');
      }
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = (data: Omit<Category, 'id'>) => {
    setIsSubmitting(true);
    
    try {
      if (isEditing && id) {
        const updatedCategory = updateCategory(id, data);
        
        if (updatedCategory) {
          toast.success('Categoria atualizada com sucesso!');
          navigate('/categories');
        } else {
          toast.error('Ocorreu um erro ao atualizar a categoria');
        }
      } else {
        const newCategory = createCategory(data);
        toast.success('Categoria criada com sucesso!');
        navigate('/categories');
      }
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      toast.error('Ocorreu um erro ao salvar a categoria');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditing 
              ? 'Modifique as informações da categoria existente' 
              : 'Adicione uma nova categoria à biblioteca de prompts'}
          </p>
        </div>
        
        <EntityForm
          type="category"
          entity={category || undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default CreateEditCategory;

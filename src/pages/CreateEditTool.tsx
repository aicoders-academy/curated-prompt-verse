
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { EntityForm } from '@/components/common/EntityForm';
import {
  getToolById,
  createTool,
  updateTool
} from '@/lib/mock-data';
import type { Tool } from '@/lib/mock-data';

const CreateEditTool = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && id) {
      const foundTool = getToolById(id);
      
      if (foundTool) {
        setTool(foundTool);
      } else {
        toast.error('Ferramenta não encontrada');
        navigate('/tools');
      }
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = (data: Omit<Tool, 'id'>) => {
    setIsSubmitting(true);
    
    try {
      if (isEditing && id) {
        const updatedTool = updateTool(id, data);
        
        if (updatedTool) {
          toast.success('Ferramenta atualizada com sucesso!');
          navigate('/tools');
        } else {
          toast.error('Ocorreu um erro ao atualizar a ferramenta');
        }
      } else {
        const newTool = createTool(data);
        toast.success('Ferramenta criada com sucesso!');
        navigate('/tools');
      }
    } catch (error) {
      console.error('Erro ao salvar ferramenta:', error);
      toast.error('Ocorreu um erro ao salvar a ferramenta');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Editar Ferramenta' : 'Nova Ferramenta'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditing 
              ? 'Modifique as informações da ferramenta existente' 
              : 'Adicione uma nova ferramenta à biblioteca de prompts'}
          </p>
        </div>
        
        <EntityForm
          type="tool"
          entity={tool || undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default CreateEditTool;

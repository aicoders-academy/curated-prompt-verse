
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { PromptForm } from '@/components/prompt/PromptForm';
import {
  getPromptById,
  updatePrompt,
  getAllCategories,
  getAllTools
} from '@/lib/mock-data';
import type { Prompt } from '@/lib/mock-data';

const EditPrompt = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPrompt = getPromptById(id);
      if (foundPrompt) {
        setPrompt(foundPrompt);
      } else {
        toast.error('Prompt não encontrado');
        navigate('/');
      }
    }
    
    setCategories(getAllCategories());
    setTools(getAllTools());
  }, [id, navigate]);

  const handleSubmit = (data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'authorId'>) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedPrompt = updatePrompt(id, data);
      
      if (updatedPrompt) {
        toast.success('Prompt atualizado com sucesso!');
        navigate(`/prompts/${id}`);
      } else {
        toast.error('Ocorreu um erro ao atualizar o prompt');
      }
    } catch (error) {
      console.error('Erro ao atualizar prompt:', error);
      toast.error('Ocorreu um erro ao atualizar o prompt');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!prompt) {
    return (
      <Layout>
        <div className="container mx-auto text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Editar Prompt</h1>
          <p className="text-muted-foreground mt-2">
            Modifique as informações do prompt existente
          </p>
        </div>
        
        <PromptForm
          prompt={prompt}
          categories={categories}
          tools={tools}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default EditPrompt;

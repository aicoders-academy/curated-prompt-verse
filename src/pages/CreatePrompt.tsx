
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { PromptForm } from '@/components/prompt/PromptForm';
import {
  createPrompt,
  getAllCategories,
  getAllTools,
  mockUsers
} from '@/lib/mock-data';
import type { Prompt } from '@/lib/mock-data';

const CreatePrompt = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Usando o primeiro usuário (admin) como autor para o momento
  // Na implementação real, isso viria da autenticação
  const currentUser = mockUsers[0];

  useEffect(() => {
    setCategories(getAllCategories());
    setTools(getAllTools());
  }, []);

  const handleSubmit = (data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'authorId'>) => {
    setIsSubmitting(true);
    
    try {
      const newPrompt = createPrompt({
        ...data,
        authorId: currentUser.id,
      });
      
      toast.success('Prompt criado com sucesso!');
      navigate(`/prompts/${newPrompt.id}`);
    } catch (error) {
      console.error('Erro ao criar prompt:', error);
      toast.error('Ocorreu um erro ao criar o prompt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Criar Novo Prompt</h1>
          <p className="text-muted-foreground mt-2">
            Adicione um novo prompt à biblioteca
          </p>
        </div>
        
        <PromptForm
          categories={categories}
          tools={tools}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default CreatePrompt;

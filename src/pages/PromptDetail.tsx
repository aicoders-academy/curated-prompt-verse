
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Edit, Trash2, Copy, ArrowLeft } from 'lucide-react';
import {
  getPromptById,
  getAllCategories,
  getAllTools,
  deletePrompt
} from '@/lib/mock-data';
import type { Prompt, Category, Tool } from '@/lib/mock-data';

const PromptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPrompt = getPromptById(id);
      if (foundPrompt) {
        setPrompt(foundPrompt);
      }
      setCategories(getAllCategories());
      setTools(getAllTools());
    }
  }, [id]);

  const promptCategories = categories.filter(
    category => prompt?.categories.includes(category.id)
  );
  
  const promptTools = tools.filter(
    tool => prompt?.tools.includes(tool.id)
  );

  const handleCopyPrompt = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.content);
      toast.success('Prompt copiado para a área de transferência!');
    }
  };

  const handleDeletePrompt = () => {
    if (id) {
      deletePrompt(id);
      toast.success('Prompt excluído com sucesso!');
      window.history.back();
    }
  };

  if (!prompt) {
    return (
      <Layout>
        <div className="container mx-auto text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Prompt não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O prompt que você está procurando não existe ou foi excluído.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Biblioteca
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Biblioteca
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">{prompt.title}</CardTitle>
                {prompt.description && (
                  <CardDescription className="text-base mt-2">
                    {prompt.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {promptCategories.map(category => (
                    <Badge key={category.id} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                  {promptTools.map(tool => (
                    <Badge key={tool.id} className="bg-accent text-accent-foreground">
                      {tool.name}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
                    {prompt.content}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyPrompt}
                    className="absolute top-2 right-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t">
                <span className="text-sm text-muted-foreground">
                  Criado em {new Date(prompt.createdAt).toLocaleDateString('pt-BR')}
                </span>
                <div className="space-x-2">
                  <Link to={`/prompts/edit/${prompt.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Data de Criação</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(prompt.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Última Atualização</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(prompt.updatedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Categorias</h3>
                  <div className="flex flex-wrap gap-1">
                    {promptCategories.length > 0 ? (
                      promptCategories.map(category => (
                        <Badge key={category.id} variant="secondary" className="text-xs">
                          {category.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma categoria</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Ferramentas</h3>
                  <div className="flex flex-wrap gap-1">
                    {promptTools.length > 0 ? (
                      promptTools.map(tool => (
                        <Badge key={tool.id} className="bg-accent text-accent-foreground text-xs">
                          {tool.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma ferramenta</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger className="hidden">
          Open
        </AlertDialogTrigger>
        <ConfirmDialog
          isOpen={showDeleteDialog}
          title="Excluir Prompt"
          description="Tem certeza que deseja excluir este prompt? Esta ação não poderá ser desfeita."
          onConfirm={handleDeletePrompt}
          onCancel={() => setShowDeleteDialog(false)}
          confirmText="Excluir"
          cancelText="Cancelar"
          danger
        />
      </AlertDialog>
    </Layout>
  );
};

export default PromptDetail;

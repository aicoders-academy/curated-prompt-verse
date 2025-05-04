
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { EntityList } from '@/components/common/EntityList';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getAllTools, deleteTool } from '@/lib/mock-data';
import type { Tool } from '@/lib/mock-data';

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolToDelete, setToolToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = () => {
    setTools(getAllTools());
  };

  const handleDeleteTool = (id: string) => {
    setToolToDelete(id);
  };

  const confirmDeleteTool = () => {
    if (toolToDelete) {
      deleteTool(toolToDelete);
      loadTools();
      toast.success('Ferramenta excluída com sucesso!');
      setToolToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <EntityList
          title="Gerenciar Ferramentas"
          entities={tools}
          type="tool"
          onDelete={handleDeleteTool}
        />
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger className="hidden">
          Open
        </AlertDialogTrigger>
        <ConfirmDialog
          isOpen={!!toolToDelete}
          title="Excluir Ferramenta"
          description="Tem certeza que deseja excluir esta ferramenta? Esta ação não poderá ser desfeita e a ferramenta será removida de todos os prompts associados."
          onConfirm={confirmDeleteTool}
          onCancel={() => setToolToDelete(null)}
          confirmText="Excluir"
          cancelText="Cancelar"
          danger
        />
      </AlertDialog>
    </Layout>
  );
};

export default Tools;

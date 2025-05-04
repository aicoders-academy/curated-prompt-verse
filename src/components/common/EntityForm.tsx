
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Category, Tool } from '@/lib/mock-data';

// Esquema de validação
const entitySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
});

type EntityFormValues = z.infer<typeof entitySchema>;

type EntityFormProps = {
  type: 'category' | 'tool';
  entity?: Category | Tool;
  onSubmit: (data: EntityFormValues) => void;
  isSubmitting?: boolean;
};

export function EntityForm({ type, entity, onSubmit, isSubmitting = false }: EntityFormProps) {
  const form = useForm<EntityFormValues>({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      name: entity?.name || '',
      description: entity?.description || '',
    },
  });

  const entityTypeText = type === 'category' ? 'Categoria' : 'Ferramenta';

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{entity ? `Editar ${entityTypeText}` : `Nova ${entityTypeText}`}</CardTitle>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder={`Nome da ${entityTypeText.toLowerCase()}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Descrição da ${entityTypeText.toLowerCase()}`} 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Uma breve descrição para explicar o propósito desta {entityTypeText.toLowerCase()}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : entity ? 'Atualizar' : 'Criar'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

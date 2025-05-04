
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Prompt, Category, Tool } from '@/lib/mock-data';

// Esquema de validação
const promptSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z.string().min(10, 'Conteúdo do prompt deve ter pelo menos 10 caracteres'),
  description: z.string().optional(),
  categories: z.array(z.string()).min(1, 'Selecione pelo menos uma categoria'),
  tools: z.array(z.string()).min(1, 'Selecione pelo menos uma ferramenta'),
});

type PromptFormValues = z.infer<typeof promptSchema>;

type PromptFormProps = {
  prompt?: Prompt;
  categories: Category[];
  tools: Tool[];
  onSubmit: (data: PromptFormValues) => void;
  isSubmitting?: boolean;
};

export function PromptForm({ prompt, categories, tools, onSubmit, isSubmitting = false }: PromptFormProps) {
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      title: prompt?.title || '',
      content: prompt?.content || '',
      description: prompt?.description || '',
      categories: prompt?.categories || [],
      tools: prompt?.tools || [],
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{prompt ? 'Editar Prompt' : 'Criar Novo Prompt'}</CardTitle>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um título descritivo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Um título claro que descreva o propósito do prompt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo do Prompt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Digite o texto completo do prompt..." 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    O texto completo do prompt, incluindo quaisquer variáveis entre chaves {'{como_esta}'}.
                  </FormDescription>
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
                      placeholder="Uma descrição curta sobre o que este prompt faz..." 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Uma descrição breve explicando o propósito e uso do prompt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <FormDescription>
                    Selecione uma ou mais categorias que se aplicam a este prompt.
                  </FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {categories.map((category) => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, category.id]);
                                  } else {
                                    field.onChange(field.value.filter(id => id !== category.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {category.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ferramentas</FormLabel>
                  <FormDescription>
                    Selecione uma ou mais ferramentas às quais este prompt se aplica.
                  </FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {tools.map((tool) => (
                      <FormField
                        key={tool.id}
                        control={form.control}
                        name="tools"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tool.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, tool.id]);
                                  } else {
                                    field.onChange(field.value.filter(id => id !== tool.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {tool.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
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
              {isSubmitting ? 'Salvando...' : prompt ? 'Atualizar Prompt' : 'Criar Prompt'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

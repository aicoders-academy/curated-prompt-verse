
// Arquivo para simular dados enquanto não implementamos a autenticação e backend

// Tipos
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface Tool {
  id: string;
  name: string;
  description: string | null;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  description: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categories: string[]; // IDs das categorias
  tools: string[]; // IDs das ferramentas
}

// Mock data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'USER',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Escrita Criativa',
    description: 'Prompts para auxiliar na criação de conteúdo criativo',
  },
  {
    id: '2',
    name: 'Programação',
    description: 'Prompts relacionados ao desenvolvimento de software',
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Prompts para criação de conteúdo de marketing',
  },
  {
    id: '4',
    name: 'Educação',
    description: 'Prompts para criar conteúdo educacional',
  },
];

export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Modelo de linguagem da OpenAI',
  },
  {
    id: '2',
    name: 'DALL-E',
    description: 'Gerador de imagens da OpenAI',
  },
  {
    id: '3',
    name: 'Midjourney',
    description: 'Gerador de imagens avançado',
  },
  {
    id: '4',
    name: 'Claude',
    description: 'Assistente de IA da Anthropic',
  },
];

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Gerador de Histórias',
    content: 'Crie uma história curta de fantasia ambientada em {cenário} com personagens que são {tipo_personagem}. A história deve incluir {elemento_surpresa} e terminar com {tipo_final}.',
    description: 'Um prompt para gerar histórias de fantasia com elementos personalizáveis',
    authorId: '1',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
    deletedAt: null,
    categories: ['1'],
    tools: ['1', '4'],
  },
  {
    id: '2',
    title: 'Debugador de Código',
    content: 'Analise o seguinte código em {linguagem} e identifique quaisquer bugs ou problemas de performance:\n\n```\n{código}\n```\n\nExplique os problemas encontrados e sugira correções.',
    description: 'Prompt para ajudar a encontrar bugs em código',
    authorId: '1',
    createdAt: '2023-02-20T15:45:00Z',
    updatedAt: '2023-02-22T09:15:00Z',
    deletedAt: null,
    categories: ['2'],
    tools: ['1', '4'],
  },
  {
    id: '3',
    title: 'Gerador de Posts para Redes Sociais',
    content: 'Crie {número} posts para {rede_social} sobre {tópico} dirigidos a {público_alvo}. Cada post deve ter no máximo {comprimento_máximo} caracteres e incluir {elementos_adicionais}.',
    description: 'Gera posts otimizados para diferentes redes sociais',
    authorId: '1',
    createdAt: '2023-03-10T08:20:00Z',
    updatedAt: '2023-03-12T14:10:00Z',
    deletedAt: null,
    categories: ['3'],
    tools: ['1'],
  },
  {
    id: '4',
    title: 'Criador de Plano de Aula',
    content: 'Desenvolva um plano de aula detalhado para ensinar {tópico} a estudantes do {nível_escolar}. O plano deve incluir objetivos de aprendizagem, materiais necessários, atividades para {duração_minutos} minutos, e métodos de avaliação.',
    description: 'Ajuda professores a criar planos de aula estruturados',
    authorId: '1',
    createdAt: '2023-04-05T11:30:00Z',
    updatedAt: '2023-04-05T11:30:00Z',
    deletedAt: null,
    categories: ['4'],
    tools: ['1', '4'],
  },
  {
    id: '5',
    title: 'Descrição de Imagem para IA',
    content: 'Gere uma imagem detalhada de {assunto_principal} em estilo {estilo_artístico}. A cena deve incluir {elementos_cena}, com iluminação {tipo_iluminação} e paleta de cores {paleta_cores}.',
    description: 'Prompt para criar descrições detalhadas para geradores de imagem por IA',
    authorId: '1',
    createdAt: '2023-05-18T16:40:00Z',
    updatedAt: '2023-05-20T09:25:00Z',
    deletedAt: null,
    categories: ['1'],
    tools: ['2', '3'],
  },
];

// Funções utilitárias para manipular os dados
let prompts = [...mockPrompts];
let categories = [...mockCategories];
let tools = [...mockTools];

// Função para obter todos os prompts não excluídos
export const getActivePrompts = () => {
  return prompts.filter(prompt => prompt.deletedAt === null);
};

// Função para obter um prompt por ID
export const getPromptById = (id: string) => {
  return prompts.find(prompt => prompt.id === id && prompt.deletedAt === null);
};

// Função para criar um novo prompt
export const createPrompt = (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
  const newPrompt: Prompt = {
    ...promptData,
    id: String(prompts.length + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  };
  prompts.push(newPrompt);
  return newPrompt;
};

// Função para atualizar um prompt existente
export const updatePrompt = (id: string, promptData: Partial<Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>) => {
  const index = prompts.findIndex(prompt => prompt.id === id);
  if (index !== -1) {
    prompts[index] = {
      ...prompts[index],
      ...promptData,
      updatedAt: new Date().toISOString(),
    };
    return prompts[index];
  }
  return null;
};

// Função para deletar um prompt (soft delete)
export const deletePrompt = (id: string) => {
  const index = prompts.findIndex(prompt => prompt.id === id);
  if (index !== -1) {
    prompts[index] = {
      ...prompts[index],
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return true;
  }
  return false;
};

// Funções para categorias
export const getAllCategories = () => {
  return categories;
};

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

export const createCategory = (categoryData: Omit<Category, 'id'>) => {
  const newCategory: Category = {
    ...categoryData,
    id: String(categories.length + 1),
  };
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = (id: string, categoryData: Partial<Omit<Category, 'id'>>) => {
  const index = categories.findIndex(category => category.id === id);
  if (index !== -1) {
    categories[index] = {
      ...categories[index],
      ...categoryData,
    };
    return categories[index];
  }
  return null;
};

export const deleteCategory = (id: string) => {
  const index = categories.findIndex(category => category.id === id);
  if (index !== -1) {
    categories.splice(index, 1);
    // Também remover a categoria de todos os prompts
    prompts = prompts.map(prompt => ({
      ...prompt,
      categories: prompt.categories.filter(catId => catId !== id),
    }));
    return true;
  }
  return false;
};

// Funções para ferramentas
export const getAllTools = () => {
  return tools;
};

export const getToolById = (id: string) => {
  return tools.find(tool => tool.id === id);
};

export const createTool = (toolData: Omit<Tool, 'id'>) => {
  const newTool: Tool = {
    ...toolData,
    id: String(tools.length + 1),
  };
  tools.push(newTool);
  return newTool;
};

export const updateTool = (id: string, toolData: Partial<Omit<Tool, 'id'>>) => {
  const index = tools.findIndex(tool => tool.id === id);
  if (index !== -1) {
    tools[index] = {
      ...tools[index],
      ...toolData,
    };
    return tools[index];
  }
  return null;
};

export const deleteTool = (id: string) => {
  const index = tools.findIndex(tool => tool.id === id);
  if (index !== -1) {
    tools.splice(index, 1);
    // Também remover a ferramenta de todos os prompts
    prompts = prompts.map(prompt => ({
      ...prompt,
      tools: prompt.tools.filter(toolId => toolId !== id),
    }));
    return true;
  }
  return false;
};

// Função para filtrar prompts por categoria e/ou ferramenta
export const filterPrompts = (categoryIds: string[] = [], toolIds: string[] = []) => {
  return prompts.filter(prompt => {
    const categoryMatch = categoryIds.length === 0 || 
      categoryIds.some(id => prompt.categories.includes(id));
    
    const toolMatch = toolIds.length === 0 || 
      toolIds.some(id => prompt.tools.includes(id));
    
    return prompt.deletedAt === null && categoryMatch && toolMatch;
  });
};

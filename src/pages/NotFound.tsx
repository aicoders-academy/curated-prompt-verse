
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
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
};

export default NotFound;

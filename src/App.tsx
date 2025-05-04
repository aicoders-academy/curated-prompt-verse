
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PromptDetail from "./pages/PromptDetail";
import CreatePrompt from "./pages/CreatePrompt";
import EditPrompt from "./pages/EditPrompt";
import Categories from "./pages/Categories";
import CreateEditCategory from "./pages/CreateEditCategory";
import Tools from "./pages/Tools";
import CreateEditTool from "./pages/CreateEditTool";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/prompts/:id" element={<PromptDetail />} />
        <Route path="/prompts/new" element={<CreatePrompt />} />
        <Route path="/prompts/edit/:id" element={<EditPrompt />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/new" element={<CreateEditCategory />} />
        <Route path="/categories/edit/:id" element={<CreateEditCategory />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/new" element={<CreateEditTool />} />
        <Route path="/tools/edit/:id" element={<CreateEditTool />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

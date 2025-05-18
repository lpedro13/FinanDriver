
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const TransactionForm = ({ onSubmit, type, categorias }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: categorias && categorias.length > 0 ? categorias[0] : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' ? value.replace(/[^0-9.,]/g, '') : value
    }));
  };

  const handleCategoriaChange = (value) => {
    setFormData(prev => ({
      ...prev,
      categoria: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.descricao.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe uma descrição",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.valor) {
      toast({
        title: "Erro",
        description: "Por favor, informe um valor",
        variant: "destructive"
      });
      return;
    }
    
    const valorNumerico = parseFloat(formData.valor.replace(',', '.'));
    
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, informe um valor válido",
        variant: "destructive"
      });
      return;
    }
    
    const newTransaction = {
      ...formData,
      id: Date.now().toString(),
      valor: valorNumerico,
      data: formData.data
    };
    
    onSubmit(newTransaction);
    
    setFormData({
      descricao: '',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      categoria: categorias && categorias.length > 0 ? categorias[0] : ''
    });
    
    toast({
      title: "Sucesso",
      description: "Registro adicionado com sucesso",
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Input
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva o registro"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="valor">Valor (R$)</Label>
        <Input
          id="valor"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          placeholder="0,00"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="data">Data</Label>
        <Input
          id="data"
          name="data"
          type="date"
          value={formData.data}
          onChange={handleChange}
        />
      </div>
      
      {categorias && categorias.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={formData.categoria} onValueChange={handleCategoriaChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Button type="submit" className="w-full">
        Adicionar
      </Button>
    </motion.form>
  );
};

export default TransactionForm;

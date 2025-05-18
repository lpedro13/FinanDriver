
import React from 'react';
import { motion } from 'framer-motion';
import { Car, Fuel, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categoriasDespesasCarro = [
  'Manutenção',
  'Seguro',
  'Limpeza',
  'Estacionamento',
  'Pedágio',
  'Financiamento',
  'Diária do Carro',
  'Outro'
];

const categoriasDespesasCombustivel = [
  'Gasolina',
  'Álcool',
  'Diesel',
  'GNV',
  'Recarga Elétrica'
];

const Despesas = ({ despesasCarro, despesasCombustivel, addDespesaCarro, addDespesaCombustivel, deleteItem }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Despesas do Veículo</h1>
        <p className="text-muted-foreground mt-1">Registre os gastos com seu carro e combustível</p>
      </motion.div>
      
      <Tabs defaultValue="carro">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="carro" className="flex items-center space-x-2">
            <Car className="h-4 w-4" />
            <span>Despesas do Carro</span>
          </TabsTrigger>
          <TabsTrigger value="combustivel" className="flex items-center space-x-2">
            <Fuel className="h-4 w-4 mr-1" /> <Zap className="h-4 w-4" />
            <span>Combustível / Recarga</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="carro" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Despesa do Carro</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionForm 
                    onSubmit={addDespesaCarro} 
                    type="despesasCarro" 
                    categorias={categoriasDespesasCarro}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Despesas do Carro</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionList 
                    items={despesasCarro} 
                    onDelete={deleteItem} 
                    type="despesasCarro"
                    emptyMessage="Nenhuma despesa do carro registrada ainda."
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="combustivel" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Despesa de Combustível/Recarga</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionForm 
                    onSubmit={addDespesaCombustivel} 
                    type="despesasCombustivel" 
                    categorias={categoriasDespesasCombustivel}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Despesas de Combustível/Recarga</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionList 
                    items={despesasCombustivel} 
                    onDelete={deleteItem} 
                    type="despesasCombustivel"
                    emptyMessage="Nenhuma despesa de combustível/recarga registrada ainda."
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Despesas;

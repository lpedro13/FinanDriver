
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';

import Dashboard from '@/pages/Dashboard';
import Ganhos from '@/pages/Ganhos';
import Despesas from '@/pages/Despesas';
import DespesasPessoais from '@/pages/DespesasPessoais';
import Relatorios from '@/pages/Relatorios';
import ReservaEmergencia from '@/pages/ReservaEmergencia';
import Layout from '@/components/Layout';

const App = () => {
  const [financialData, setFinancialData] = useState(() => {
    try {
      const savedData = localStorage.getItem('financialData');
      const parsedData = savedData ? JSON.parse(savedData) : {};
      return {
        ganhos: Array.isArray(parsedData.ganhos) ? parsedData.ganhos : [],
        despesasCarro: Array.isArray(parsedData.despesasCarro) ? parsedData.despesasCarro : [],
        despesasCombustivel: Array.isArray(parsedData.despesasCombustivel) ? parsedData.despesasCombustivel : [],
        despesasPessoais: Array.isArray(parsedData.despesasPessoais) ? parsedData.despesasPessoais : [],
        reservaEmergencia: Array.isArray(parsedData.reservaEmergencia) ? parsedData.reservaEmergencia : []
      };
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
      return {
        ganhos: [],
        despesasCarro: [],
        despesasCombustivel: [],
        despesasPessoais: [],
        reservaEmergencia: []
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('financialData', JSON.stringify(financialData));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  }, [financialData]);

  const addToList = useCallback((listName, item) => {
    setFinancialData(prev => ({
      ...prev,
      [listName]: [...(prev[listName] || []), item]
    }));
  }, []);

  const addGanho = useCallback((ganho) => addToList('ganhos', ganho), [addToList]);
  const addDespesaCarro = useCallback((despesa) => addToList('despesasCarro', despesa), [addToList]);
  const addDespesaCombustivel = useCallback((despesa) => addToList('despesasCombustivel', despesa), [addToList]);
  const addDespesaPessoal = useCallback((despesa) => addToList('despesasPessoais', despesa), [addToList]);
  const addReservaEmergencia = useCallback((reserva) => addToList('reservaEmergencia', reserva), [addToList]);
  
  const deleteItem = useCallback((type, id) => {
    setFinancialData(prev => {
      if (!prev[type] || !Array.isArray(prev[type])) {
        console.warn(`Tentativa de deletar item de um tipo não existente ou inválido: ${type}`);
        return prev;
      }
      return {
        ...prev,
        [type]: prev[type].filter(item => item && item.id !== id)
      };
    });
  }, []);

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard financialData={financialData} />} />
            <Route path="ganhos" element={<Ganhos ganhos={financialData.ganhos} addGanho={addGanho} deleteItem={deleteItem} />} />
            <Route path="despesas" element={<Despesas 
              despesasCarro={financialData.despesasCarro} 
              despesasCombustivel={financialData.despesasCombustivel} 
              addDespesaCarro={addDespesaCarro} 
              addDespesaCombustivel={addDespesaCombustivel} 
              deleteItem={deleteItem} 
            />} />
            <Route path="despesas-pessoais" element={<DespesasPessoais 
              despesasPessoais={financialData.despesasPessoais} 
              addDespesaPessoal={addDespesaPessoal} 
              deleteItem={deleteItem} 
            />} />
             <Route path="reserva-emergencia" element={<ReservaEmergencia 
              reservaEmergencia={financialData.reservaEmergencia} 
              addReservaEmergencia={addReservaEmergencia} 
              deleteItem={deleteItem} 
            />} />
            <Route path="relatorios" element={<Relatorios financialData={financialData} />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
};

export default App;

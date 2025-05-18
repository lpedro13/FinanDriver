
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, CalendarDays } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PeriodFilter from '@/components/relatorios/PeriodFilter';
import FinancialSummaryCard from '@/components/relatorios/FinancialSummaryCard';
import ExpenseDistributionCard from '@/components/relatorios/ExpenseDistributionCard';
import CategoryAnalysisSection from '@/components/relatorios/CategoryAnalysisSection';
import { filtrarDadosPorPeriodoRelatorios, getNomePeriodoAtual } from '@/lib/relatoriosUtils';

const Relatorios = ({ financialData }) => {
  const [periodoFiltro, setPeriodoFiltro] = useState('mensal');
  
  const safeFinancialData = useMemo(() => ({
    ganhos: financialData?.ganhos || [],
    despesasCarro: financialData?.despesasCarro || [],
    despesasCombustivel: financialData?.despesasCombustivel || [],
    despesasPessoais: financialData?.despesasPessoais || [],
    reservaEmergencia: financialData?.reservaEmergencia || [],
  }), [financialData]);

  const dadosFiltrados = useMemo(() => {
    const {
      ganhosFiltrados,
      despesasCarroFiltradas,
      despesasCombustivelFiltradas,
      despesasPessoaisFiltradas,
      reservaEmergenciaFiltradas,
    } = filtrarDadosPorPeriodoRelatorios(safeFinancialData, periodoFiltro);
    
    const totalGanhos = ganhosFiltrados.reduce((acc, item) => acc + (item?.valor || 0), 0);
    const totalDespesasCarro = despesasCarroFiltradas.reduce((acc, item) => acc + (item?.valor || 0), 0);
    const totalDespesasCombustivel = despesasCombustivelFiltradas.reduce((acc, item) => acc + (item?.valor || 0), 0);
    const totalDespesasPessoais = despesasPessoaisFiltradas.reduce((acc, item) => acc + (item?.valor || 0), 0);
    
    const depositosReserva = reservaEmergenciaFiltradas
      .filter(item => item?.categoria === 'Depósito')
      .reduce((acc, item) => acc + (item?.valor || 0), 0);
    
    const totalDespesasTrabalho = totalDespesasCarro + totalDespesasCombustivel + depositosReserva;
    const lucroLiquido = totalGanhos - totalDespesasTrabalho;
    const saldoFinal = lucroLiquido - totalDespesasPessoais;
    
    return {
      totalGanhos,
      totalDespesasCarro,
      totalDespesasCombustivel,
      totalDespesasPessoais,
      totalDespesasTrabalho,
      lucroLiquido,
      saldoFinal,
      despesasCarroDetalhadas: despesasCarroFiltradas,
      despesasCombustivelDetalhadas: despesasCombustivelFiltradas,
      despesasPessoaisDetalhadas: despesasPessoaisFiltradas,
      depositosReserva,
    };
  }, [safeFinancialData, periodoFiltro]);
  
  const nomePeriodo = getNomePeriodoAtual(periodoFiltro);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6 text-blue-500" />
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        </div>
        <p className="text-muted-foreground mt-1">Análise detalhada das suas finanças</p>
      </motion.div>
      
      <PeriodFilter 
        periodoFiltro={periodoFiltro} 
        setPeriodoFiltro={setPeriodoFiltro} 
        nomePeriodo={nomePeriodo} 
        opcoesAdicionais={true}
      />
      
      <Tabs defaultValue="resumo">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
          <TabsTrigger value="resumo" className="flex items-center space-x-2">
            <PieChart className="h-4 w-4" />
            <span>Resumo Financeiro</span>
          </TabsTrigger>
          <TabsTrigger value="analiseCategorias" className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4" />
            <span>Análise Detalhada por Categoria</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumo" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FinancialSummaryCard dados={dadosFiltrados} />
            <ExpenseDistributionCard dados={dadosFiltrados} />
          </div>
        </TabsContent>
        
        <TabsContent value="analiseCategorias" className="mt-6">
          <CategoryAnalysisSection dados={dadosFiltrados} />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Relatorios;

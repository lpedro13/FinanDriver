
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Car, Fuel, CreditCard, ShieldCheck, DollarSign } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { filtrarDadosPorPeriodoDashboard, agruparPorCategoria } from '@/lib/dashboardUtils';

const Dashboard = ({ financialData }) => {
  const [periodoFiltro, setPeriodoFiltro] = useState('geral');

  const dadosFiltrados = useMemo(() => {
    return filtrarDadosPorPeriodoDashboard(financialData, periodoFiltro);
  }, [financialData, periodoFiltro]);

  const stats = useMemo(() => {
    const ganhos = dadosFiltrados.ganhos || [];
    const despesasCarro = dadosFiltrados.despesasCarro || [];
    const despesasCombustivel = dadosFiltrados.despesasCombustivel || [];
    const despesasPessoais = dadosFiltrados.despesasPessoais || [];
    const reservaEmergencia = dadosFiltrados.reservaEmergencia || [];

    const totalGanhos = ganhos.reduce((acc, item) => acc + item.valor, 0);
    
    const despesasCarroAgrupadas = agruparPorCategoria(despesasCarro);
    const despesasCombustivelAgrupadas = agruparPorCategoria(despesasCombustivel);
    
    const totalDespesasCarro = Object.values(despesasCarroAgrupadas).reduce((acc, val) => acc + val, 0);
    const totalDespesasCombustivel = Object.values(despesasCombustivelAgrupadas).reduce((acc, val) => acc + val, 0);
    const totalDespesasPessoais = despesasPessoais.reduce((acc, item) => acc + item.valor, 0);
    
    const depositosReserva = reservaEmergencia
      .filter(item => item.categoria === 'Depósito')
      .reduce((acc, item) => acc + item.valor, 0);

    const retiradasReserva = reservaEmergencia
      .filter(item => item.categoria === 'Retirada')
      .reduce((acc, item) => acc + item.valor, 0);
    
    const saldoReservaEmergencia = depositosReserva - retiradasReserva;

    const totalDespesasTrabalho = totalDespesasCarro + totalDespesasCombustivel + depositosReserva;
    const lucroLiquido = totalGanhos - totalDespesasTrabalho;
    // const saldoFinal = lucroLiquido - totalDespesasPessoais; // Removido pois o resumo financeiro foi removido
    
    return {
      totalGanhos,
      totalDespesasCarro,
      totalDespesasCombustivel,
      totalDespesasPessoais,
      saldoReservaEmergencia,
      lucroLiquido,
      // despesasCarroPorCategoria: despesasCarroAgrupadas, // Removido - não usado diretamente mais no dashboard
      // despesasCombustivelPorCategoria: despesasCombustivelAgrupadas, // Removido
      // totalDespesasTrabalho, // Removido
      // saldoFinal, // Removido
      // depositosReserva, // Removido
    };
  }, [dadosFiltrados]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral das suas finanças ({periodoFiltro.charAt(0).toUpperCase() + periodoFiltro.slice(1)})</p>
        </div>
        <Tabs value={periodoFiltro} onValueChange={setPeriodoFiltro} className="mt-4 sm:mt-0">
          <TabsList>
            <TabsTrigger value="diario">Diário</TabsTrigger>
            <TabsTrigger value="semanal">Semanal</TabsTrigger>
            <TabsTrigger value="mensal">Mensal</TabsTrigger>
            <TabsTrigger value="geral">Geral</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="Ganhos Totais" 
          value={stats.totalGanhos} 
          icon={TrendingUp} 
          valuePrefix="R$ "
          className="border-l-4 border-green-500"
        />
        <StatCard 
          title="Despesas Combustível" 
          value={stats.totalDespesasCombustivel} 
          icon={Fuel} 
          valuePrefix="R$ "
          className="border-l-4 border-orange-500"
        />
        <StatCard 
          title="Despesas do Carro" 
          value={stats.totalDespesasCarro} 
          icon={Car} 
          valuePrefix="R$ "
          className="border-l-4 border-red-500"
        />
        <StatCard 
          title="Despesas Pessoais" 
          value={stats.totalDespesasPessoais} 
          icon={CreditCard} 
          valuePrefix="R$ "
          className="border-l-4 border-purple-500"
        />
        <StatCard 
          title="Reserva de Emergência" 
          value={stats.saldoReservaEmergencia} 
          icon={ShieldCheck} 
          valuePrefix="R$ "
          className="border-l-4 border-teal-500"
        />
        <StatCard 
          title="Lucro Líquido" 
          value={stats.lucroLiquido} 
          icon={DollarSign} 
          valuePrefix="R$ "
          className={`border-l-4 ${stats.lucroLiquido >= 0 ? 'border-sky-500' : 'border-pink-500'}`}
        />
      </div>
      
    </div>
  );
};

export default Dashboard;

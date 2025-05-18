
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PeriodFilter = ({ periodoFiltro, setPeriodoFiltro, nomePeriodo, opcoesAdicionais = false }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl font-semibold whitespace-nowrap">
        Período: {nomePeriodo}
      </h2>
      
      <div className="w-full sm:w-48">
        <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            {opcoesAdicionais && <SelectItem value="diario">Diário</SelectItem>}
            {opcoesAdicionais && <SelectItem value="semanal">Semanal</SelectItem>}
            <SelectItem value="mensal">Mês atual</SelectItem>
            <SelectItem value="anual">Ano atual</SelectItem>
            <SelectItem value="geral">Todo o período</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PeriodFilter;

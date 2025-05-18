
import { format, getYear, getMonth, getWeek, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const filtrarDadosPorPeriodoRelatorios = (financialData, periodoFiltro) => {
  const dataAtual = new Date();

  let dataInicio;
  let dataFim;

  switch (periodoFiltro) {
    case 'diario':
      dataInicio = startOfDay(dataAtual);
      dataFim = endOfDay(dataAtual);
      break;
    case 'semanal':
      dataInicio = startOfWeek(dataAtual, { locale: ptBR });
      dataFim = endOfWeek(dataAtual, { locale: ptBR });
      break;
    case 'mensal':
      dataInicio = startOfMonth(dataAtual);
      dataFim = endOfMonth(dataAtual);
      break;
    case 'anual':
      dataInicio = startOfYear(dataAtual);
      dataFim = endOfYear(dataAtual);
      break;
    default: 
      dataInicio = null;
      dataFim = null;
      break;
  }

  const filtrar = (items) => {
    if (!Array.isArray(items)) return [];
    return items.filter(item => {
      if (!item || !item.data) return false;
      const dataItem = parseISO(item.data); 
      if (!isValid(dataItem)) return false;

      if (dataInicio && dataFim) {
        return dataItem >= dataInicio && dataItem <= dataFim;
      }
      return true; 
    });
  };

  return {
    ganhosFiltrados: filtrar(financialData?.ganhos),
    despesasCarroFiltradas: filtrar(financialData?.despesasCarro),
    despesasCombustivelFiltradas: filtrar(financialData?.despesasCombustivel),
    despesasPessoaisFiltradas: filtrar(financialData?.despesasPessoais),
    reservaEmergenciaFiltradas: filtrar(financialData?.reservaEmergencia),
  };
};

export const agruparPorCategoria = (items) => {
  if (!Array.isArray(items)) return {};
  return items.reduce((acc, item) => {
    if (!item || typeof item.valor !== 'number') return acc;
    const categoria = item.categoria || 'Sem categoria';
    if (!acc[categoria]) {
      acc[categoria] = 0;
    }
    acc[categoria] += item.valor;
    return acc;
  }, {});
};

export const getNomePeriodoAtual = (periodoFiltro) => {
  const dataAtual = new Date();
  if (periodoFiltro === 'diario') {
    return format(dataAtual, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } else if (periodoFiltro === 'semanal') {
    const inicioSemana = startOfWeek(dataAtual, { locale: ptBR });
    const fimSemana = endOfWeek(dataAtual, { locale: ptBR });
    return `Semana de ${format(inicioSemana, "dd/MM")} à ${format(fimSemana, "dd/MM/yyyy")}`;
  } else if (periodoFiltro === 'mensal') {
    return format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR });
  } else if (periodoFiltro === 'anual') {
    return format(dataAtual, "yyyy", { locale: ptBR });
  }
  return 'Todo o período';
};

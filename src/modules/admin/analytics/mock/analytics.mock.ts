// 1. DOMAIN INTERFACES & TYPES (Garantía de tipado estricto para gráficas de alta fidelidad)

export interface MonthlyPerformance {
  month: string;
  revenue: number;
  ordersCount: number;
  targetRevenue: number;
  variance: number; // Delta porcentual automatizado
}

export interface MetricDistribution {
  segment: string;
  percentage: number;
  tokenColor: 'brand' | 'accent' | 'muted' | 'critical' | 'success'; 
  // No inyectamos HEX aquí; la UI mapea esto al CSS Variable o Design Token del tema
}

export interface WeeklyThroughput {
  day: string;
  orderedUnits: number;
  dispatchedUnits: number;
  backlogUnits: number; // Crítico para cuellos de botella en confección
}

export interface TextileProductLeaderboard {
  name: string;
  sku: string;
  unitsSold: number;
  grossRevenue: number;
  marginPercentage: number; // Vender mucho con poco margen es un error analítico
  growthMoM: number;
}

export interface EnterpriseKPIs {
  financial: {
    totalRevenue: number;
    revenueGrowthMoM: number;
    avgOrderValue: number;
    avgOrderGrowthMoM: number;
  };
  operations: {
    totalOrders: number;
    ordersGrowthMoM: number;
    conversionRate: number;
    conversionGrowthMoM: number;
    factoryReturnRate: number; // Control de calidad (mermas/devoluciones de planta)
    returnRateGrowthMoM: number;
  };
}

export interface TextileAnalyticsSchema {
  monthlySales: MonthlyPerformance[];
  fabricCategoryRevenue: MetricDistribution[];
  weeklyThroughput: WeeklyThroughput[];
  topTextileProducts: TextileProductLeaderboard[];
  customerLifetimeSegments: MetricDistribution[];
  coreKPIs: EnterpriseKPIs;
}

// 2. DATA IMPLEMENTATION (SurtiCamisetas Core Dataset)

export const analyticsData: TextileAnalyticsSchema = {
  monthlySales: [
    { month: 'Ene', revenue: 4200000, ordersCount: 48, targetRevenue: 4000000, variance: 5.0 },
    { month: 'Feb', revenue: 3800000, ordersCount: 42, targetRevenue: 4000000, variance: -5.0 },
    { month: 'Mar', revenue: 5100000, ordersCount: 61, targetRevenue: 4500000, variance: 13.3 },
    { month: 'Abr', revenue: 4700000, ordersCount: 55, targetRevenue: 4500000, variance: 4.4 },
    { month: 'May', revenue: 5800000, ordersCount: 70, targetRevenue: 5000000, variance: 16.0 },
    { month: 'Jun', revenue: 6200000, ordersCount: 78, targetRevenue: 5500000, variance: 12.7 },
    { month: 'Jul', revenue: 5500000, ordersCount: 65, targetRevenue: 5500000, variance: 0.0 },
    { month: 'Ago', revenue: 6800000, ordersCount: 82, targetRevenue: 6000000, variance: 13.3 },
    { month: 'Sep', revenue: 7200000, ordersCount: 90, targetRevenue: 6500000, variance: 10.7 },
    { month: 'Oct', revenue: 6900000, ordersCount: 85, targetRevenue: 6500000, variance: 6.1 },
    { month: 'Nov', revenue: 8100000, ordersCount: 102, targetRevenue: 7000000, variance: 15.7 },
    { month: 'Dic', revenue: 9500000, ordersCount: 120, targetRevenue: 8000000, variance: 18.7 },
  ],

  // Ajustado al core de SurtiCamisetas (Tipos de tejido/líneas de producto real)
  fabricCategoryRevenue: [
    { segment: 'Algodón Peinado 24/1', percentage: 45, tokenColor: 'brand' },
    { segment: 'Poliéster Sublimable', percentage: 25, tokenColor: 'accent' },
    { segment: 'Mezclas PolyCotton', percentage: 15, tokenColor: 'muted' },
    { segment: 'Rib de Cuello (Accesorios)', percentage: 10, tokenColor: 'success' },
    { segment: 'Lotes Especiales / Reactivos', percentage: 5, tokenColor: 'critical' },
  ],

  weeklyThroughput: [
    { day: 'Lun', orderedUnits: 1200, dispatchedUnits: 1000, backlogUnits: 200 },
    { day: 'Mar', orderedUnits: 1800, dispatchedUnits: 1500, backlogUnits: 300 },
    { day: 'Mié', orderedUnits: 1500, dispatchedUnits: 1400, backlogUnits: 100 },
    { day: 'Jue', orderedUnits: 2200, dispatchedUnits: 1800, backlogUnits: 400 },
    { day: 'Vie', orderedUnits: 2800, dispatchedUnits: 2400, backlogUnits: 400 },
    { day: 'Sáb', orderedUnits: 3500, dispatchedUnits: 3000, backlogUnits: 500 },
    { day: 'Dom', orderedUnits: 2000, dispatchedUnits: 1700, backlogUnits: 300 },
  ],

  topTextileProducts: [
    { name: 'Camiseta Básica Premium Negro', sku: 'CAM-OVS-BLK', unitsSold: 2450, grossRevenue: 85750000, marginPercentage: 42.5, growthMoM: 12 },
    { name: 'Camiseta Heavyweight Blanca', sku: 'CAM-HWT-WHT', unitsSold: 1800, grossRevenue: 117000000, marginPercentage: 48.0, growthMoM: 8 },
    { name: 'Camiseta Polo Piqué Azul Navy', sku: 'POL-PIQ-NVY', unitsSold: 1560, grossRevenue: 138840000, marginPercentage: 38.2, growthMoM: -3 },
    { name: 'Camiseta Slim Fit Gris Jaspe', sku: 'CAM-SLM-GRS', unitsSold: 1340, grossRevenue: 100500000, marginPercentage: 41.0, growthMoM: 22 },
    { name: 'Esqueleto Algodón Deportivo', sku: 'ESQ-FIT-DRY', unitsSold: 980, grossRevenue: 117600000, marginPercentage: 51.5, growthMoM: 5 },
  ],

  customerLifetimeSegments: [
    { segment: 'Distribuidores Mayoristas', percentage: 45, tokenColor: 'brand' },
    { segment: 'Marcas Privadas (SaaS Clientes)', percentage: 30, tokenColor: 'accent' },
    { segment: 'Tiendas Físicas / Retail', percentage: 15, tokenColor: 'success' },
    { segment: 'E-Commerce / Drop-shippers', percentage: 10, tokenColor: 'muted' },
  ],

  coreKPIs: {
    financial: {
      totalRevenue: 738000000, // Ajustado a cifras Enterprise coherentes
      revenueGrowthMoM: 18.5,
      avgOrderValue: 821830,
      avgOrderGrowthMoM: 5.6,
    },
    operations: {
      totalOrders: 8980,
      ordersGrowthMoM: 12.3,
      conversionRate: 3.8,
      conversionGrowthMoM: 0.4,
      factoryReturnRate: 1.2, // El "Return Rate" original del 68% significaba que la empresa estaba en quiebra técnica por mermas. Un 1.2% es óptimo.
      returnRateGrowthMoM: -0.4,
    },
  },
};
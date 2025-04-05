// app/dashboard/water-optimization/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import WaterOptimizationDashboard from '@/components/dashboard/WaterOptimization';

const WaterOptimizationPage = () => {
  const serviceName = '上下水道最適化';
  const serviceCategory = 'resource-management';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="water-optimization"
    >
      <WaterOptimizationDashboard />
    </DashboardLayout>
  );
};

export default WaterOptimizationPage;
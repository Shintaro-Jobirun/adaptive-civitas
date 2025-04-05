// app/dashboard/energy-optimization/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EnergyOptimizationDashboard from '@/components/dashboard/EnergyOptimization';

const EnergyOptimizationPage = () => {
  const serviceName = 'エネルギー消費最適化';
  const serviceCategory = 'resource-management';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="energy-optimization"
    >
      <EnergyOptimizationDashboard />
    </DashboardLayout>
  );
};

export default EnergyOptimizationPage;
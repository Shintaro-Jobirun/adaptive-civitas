// app/dashboard/infrastructure-prediction/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import InfrastructurePredictionDashboard from '@/components/dashboard/InfrastructurePrediction';

const InfrastructurePredictionPage = () => {
  const serviceName = 'インフラ劣化予測';
  const serviceCategory = 'resource-management';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="infrastructure-prediction"
    >
      <InfrastructurePredictionDashboard />
    </DashboardLayout>
  );
};

export default InfrastructurePredictionPage;
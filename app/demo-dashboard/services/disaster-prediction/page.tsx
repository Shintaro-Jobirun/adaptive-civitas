// app/dashboard/disaster-prediction/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DisasterPredictionDashboard from '@/components/dashboard/DisasterPrediction';

const DisasterPredictionPage = () => {
  const serviceName = '災害予測・避難支援';
  const serviceCategory = 'resource-management';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="disaster-prediction"
    >
      <DisasterPredictionDashboard />
    </DashboardLayout>
  );
};

export default DisasterPredictionPage;
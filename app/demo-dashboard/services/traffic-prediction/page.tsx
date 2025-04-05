// app/dashboard/traffic-prediction/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TrafficPredictionDashboard from '@/components/dashboard/TrafficPrediction';

const TrafficPredictionPage = () => {
  const serviceName = '交通予測分析';
  const serviceCategory = 'revitalization';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="traffic-prediction"
    >
      <TrafficPredictionDashboard />
    </DashboardLayout>
  );
};

export default TrafficPredictionPage;
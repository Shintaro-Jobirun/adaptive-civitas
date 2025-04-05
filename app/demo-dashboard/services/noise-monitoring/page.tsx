// app/dashboard/noise-monitoring/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NoiseMonitoringDashboard from '@/components/dashboard/NoiseMonitoring';

const NoiseMonitoringPage = () => {
  const serviceName = '騒音・振動モニタリング';
  const serviceCategory = 'revitalization';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="noise-monitoring"
    >
      <NoiseMonitoringDashboard />
    </DashboardLayout>
  );
};

export default NoiseMonitoringPage;
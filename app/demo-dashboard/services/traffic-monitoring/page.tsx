// app/dashboard/traffic-monitoring/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TrafficDashboard from '@/components/dashboard/TrafficMonitoring';

const TrafficMonitoringPage = () => {
  const serviceName = 'AI交通量計測';
  const serviceCategory = 'revitalization';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="traffic-monitoring"
    >
      <TrafficDashboard />
    </DashboardLayout>
  );
};

export default TrafficMonitoringPage;
// app/dashboard/anomaly-detection/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AnomalyDetectionDashboard from '@/components/dashboard/AnomalyDetection';

const AnomalyDetectionPage = () => {
  const serviceName = 'AI異常検知';
  const serviceCategory = 'resource-management';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="anomaly-detection"
    >
      <AnomalyDetectionDashboard />
    </DashboardLayout>
  );
};

export default AnomalyDetectionPage;
// app/dashboard/air-quality/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AirQualityDashboard from '@/components/dashboard/AirQuality';

const AirQualityPage = () => {
  const serviceName = '大気質モニタリング';
  const serviceCategory = 'revitalization';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="air-quality"
    >
      <AirQualityDashboard />
    </DashboardLayout>
  );
};

export default AirQualityPage;
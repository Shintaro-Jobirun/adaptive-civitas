// types/servicesTypes.ts
export interface Faq {
    question: string;
    answer: string;
  }
  
  export interface ImplementationStep {
    icon: string;
    title: string;
    description: string;
  }
  
  export interface ServiceFeature {
    name: string;
    description: string;
    features: string[];
  }
  
  export interface Service {
    id: string;
    name: string;
    category: 'revitalization' | 'resource-management';
    overview: string;
    challenges: string[];
    services: ServiceFeature[];
    benefits: string[];
    faqs: Faq[];
    implementationProcess: ImplementationStep[];
    description?: string; 
  }
  
  export interface Tab {
    id: string;
    name: string;
  }
  
  // カテゴリータブProps
  export interface CategoryTabsProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
  }
  
  // サービスタブProps
  export interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
    accentColor: string;
  }
  
  // サービスカードProps
  export interface ServiceCardsProps {
    activeService: Service;
    activeCategory: string;
    textAccentColor: string;
  }
  
  // サービス内容セクションProps
  export interface ServiceContentProps {
    service: Service;
    textAccentColor: string;
  }
  
  // 導入メリットセクションProps
  export interface BenefitsSectionProps {
    benefits: string[];
    accentColor: string;
    textAccentColor: string;
  }
  
  // 導入プロセスProps
  export interface ImplementationProcessProps {
    steps: ImplementationStep[];
    accentColor: string;
    textAccentColor: string;
  }
  
  // FAQセクションProps
  export interface FAQProps {
    faqs: Faq[];
  }
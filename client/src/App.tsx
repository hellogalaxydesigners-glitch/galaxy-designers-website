import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import {
  AboutPage,
  ConsultationPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  PrivacyPage,
  ProjectPage,
  ServicePage,
  ServicesPage,
  StartProjectPage,
  WorkPage,
} from '@/routes/pages';

function PageLoading() {
  return (
    <div className="container-site flex min-h-[60vh] items-center justify-center" role="status">
      <span className="sr-only">Loading page</span>
      <span aria-hidden className="size-8 animate-spin rounded-full border-2 border-line border-t-violet" />
    </div>
  );
}

export function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/start-a-project" element={<StartProjectPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

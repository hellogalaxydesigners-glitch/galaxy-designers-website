/**
 * Page components for the BROWSER: each page is a separate download (code splitting).
 * The build-time renderer uses pages.server.ts instead (see vite.config.ts).
 */
import { lazy } from 'react';
export { default as HomePage } from '@/pages/HomePage';
export const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
export const ServicePage = lazy(() => import('@/pages/ServicePage'));
export const WorkPage = lazy(() => import('@/pages/WorkPage'));
export const ProjectPage = lazy(() => import('@/pages/ProjectPage'));
export const AboutPage = lazy(() => import('@/pages/AboutPage'));
export const ContactPage = lazy(() => import('@/pages/ContactPage'));
export const StartProjectPage = lazy(() => import('@/pages/StartProjectPage'));
export const ConsultationPage = lazy(() => import('@/pages/ConsultationPage'));
export const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

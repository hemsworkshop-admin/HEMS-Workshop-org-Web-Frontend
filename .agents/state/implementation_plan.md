# Implementation Plan: HEMS Website Modernization

## 🛑 Critical System Constraint: DO NOT SCRAPE
> [!CAUTION]
> **DO NOT SCRAPE THE EXISTING LEGACY SITE.** 
> The existing www.hems-workshop.org site contains over 5GB of large files (PDF and PPTX proceedings spanning 25+ years). Automated scraping by agents will cause bandwidth saturation, memory crashes, and severe delays in processing. All archive ingestion must follow the designated Google Cloud Storage bucket upload pipeline defined below.

## 1. Foundation (Phase 1)
*   **Infrastructure Setup:** Configure GCP Project, Vercel Account, and Firestore security rules.
*   **Frontend Initialization:** Spin up a Next.js (React) project with Tailwind CSS, establishing the "Rugged Science" dark theme.

## 2. Archive Ingestion Pipeline (Phase 2)
*   **Cloud Function:** Develop a Python Cloud Function to automatically process uploaded proceedings from GCS.
*   **Extraction:** Extract text from PDFs/PPTXs using `pyxtxt` or `EasyOCR`. Generate visual thumbnail previews via `ImageMagick`.
*   **Indexing:** Push the extracted metadata and text to Algolia to power the <50ms instant search.

## 3. Conference Features (Phase 3)
*   **Landing Page:** Build the 15th HEMS Workshop (Virginia Beach) home page featuring the countdown, vision, and map logistics.
*   **Schedule & Directory:** Implement the responsive, mobile-friendly interactive agenda and speaker bio modules.
*   **Submissions & Portal:** Provide a clean abstract submission form and implement Firebase Authentication for the Reviewer Portal.

## 4. Launch & SEO (Phase 4)
*   **Deployment:** Connect the `hems-workshop.org` domain to the Vercel deployment.
*   **Discovery:** Generate a comprehensive Sitemap and utilize `Next-SEO` to guarantee all archive papers are properly indexed by Google Scholar.

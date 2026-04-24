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
*   **Archive Layouts:** The UI architecture established at `/archive/2022` serves as the structural and styling template for all historical workshop archives. Future ingestions will mirror this typography, spacing, and visual hierarchy.

## 4. Launch & SEO (Phase 4)
*   **Deployment:** Connect the `hems-workshop.org` domain to the Vercel deployment.
*   **Discovery:** Generate a comprehensive Sitemap and utilize `Next-SEO` to guarantee all archive papers are properly indexed by Google Scholar.

## 5. Sub-Plan: Legacy Standardisation (Workshops 1-12)
*   **Objective:** Standardize the remaining 12 legacy HEMS Workshop archives (1st through 12th) using the newly created archive-template.tsx.
*   **Rule Enforcement:** Read the text of the table on the provided URL only. Do NOT click any links, do not follow 'Abstract' links, and do not navigate to any page containing the word 'Home' or 'Workshop'. Treat the page as a flat text document and ignore its structure.
*   **Pipeline:** Write a localized Python extraction script (e.g. scratch/flat_text_extractor.py) that uses urllib and BeautifulSoup to perform a single, stateless GET request to each of the 12 'Program Book Links'. The script will strip away all HTML structure, extract only the inner text of the <table> elements, and save the raw string data to local text files. Then, map that flat text into the new TSX template.

---

## 6. Sub-Plan: Data-Driven Archive Architecture (Local Database)

**@prod** and **@arch** have drafted this "Best Practices" architectural pivot to enable seamless, scalable content management for all historical and future workshops.

### Proposed Changes

#### 1. Local JSON Database (`src/frontend/src/data/archives/`)
We will create a strict "Local Database" composed of human-readable JSON files (e.g., `1999.json`, `2022.json`). This cleanly separates the *content* from the *code*. 
*   **To edit previous info:** You simply open the `.json` file in your editor and tweak the text.
*   **To enter a new workshop:** You duplicate a provided `template.json`, fill out the fields (venue, dates, schedule array), and save it. 

#### 2. Next.js Dynamic Routing (`src/frontend/src/app/archive/[year]/page.tsx`)
*   **[DELETE]** `src/frontend/src/app/archive/1999/page.tsx` through `2022/page.tsx` (13 folders).
*   **[NEW]** `src/frontend/src/app/archive/[year]/page.tsx`
Instead of maintaining 25 independent hardcoded TSX files, we will create ONE dynamic route template. At build-time, Next.js will automatically read the local JSON database, pipeline the data into the template, and generate the static webpages. This guarantees zero visual drift across workshops and makes global styling changes instant.

#### 3. Migration Pipeline Script (`scratch/json_migrator.py`)
*   **[NEW]** `scratch/json_migrator.py`
To preserve the hard work done in Phase 5, we will write a one-off python script that repurposes our text-extraction engine to output the 13 legacy workshops directly into our new JSON database schema, instantly populating the database.

## User Review Required
> [!IMPORTANT]
> **@bo:** Does this Data-Driven Dynamic Routing approach align with your vision for the "local database"? If approved, we will immediately execute the JSON migration and consolidate the frontend codebase.

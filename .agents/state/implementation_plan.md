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
*   **Manual Download Protocol:** Automated crawling has been halted due to systemic hangups. **@bo** will manually download the raw HTML files for the 12 'Program Book' pages.
*   **Local Staging Structure:** @bo will save the downloaded HTML files into the following directory: `docs/archives_translation/raw_html/[year]_program.html`.
*   **Pipeline:** Write a local Python extraction script (e.g. `scratch/local_text_extractor.py`) that reads the manually downloaded HTML files from `docs/archives_translation/raw_html/`. The script will parse the local files with BeautifulSoup, extract only the inner text of the `<table>` elements, and output the structured data into our local JSON database.

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

## 7. Sub-Plan: Artifact Ingestion & Hosting

In alignment with the architectural vision (Google Cloud Storage for 25+ years of PDF/PPTX proceedings), we will safely decouple the newly extracted presentation links from the fragile legacy servers.

### Proposed Pipeline
1. **Manual Download:** **@bo** will manually download the PDF/PPTX artifacts to avoid crawl failures.
2. **Local Staging:** @bo will place the downloaded artifacts into structured folders: `docs/archives_translation/proceedings/[year]/[filename]`.
3. **Cloud Upload**: A script (`scratch/artifact_uploader.py`) will bulk upload the staging directories to a permanent **Google Cloud Storage (GCS)** bucket configured for public read access.
4. **Database Remapping**: Update the JSON database to point `presentationUrl` and `abstractUrl` to the new GCS base URLs.

## 8. Sub-Plan: Corporate Sponsor Asset Ingestion

In order to support the migration of corporate sponsors to the new site, we will add a dynamic asset ingestion module.

### Proposed Pipeline
1. **Dynamic Frontend Section:** Expand the `scratch/presenter_ingestion_ui.py` with a "Corporate Sponsors" interface.
2. **Dynamic Fields:** Provide text inputs for `Company Name` and `Year Began Sponsorship`, and a Drag-and-Drop zone for the logo image file.
3. **Global Directory Structure:** Since sponsors are a persistent global entity across all workshops, the server will route these uploads to a new, dedicated global staging directory: `docs/archives_translation/sponsors/`.
4. **Filename Schema:** Uploads will be automatically renamed to: `[CompanyName]_[YearBegan].[ext]`.

## 9. Sub-Plan: Poster Presentation Manual Ingestion

In order to support the manual ingestion of newly discovered poster presentations and their associated abstracts, we will add a dynamic poster ingestion module to the UI.

### Proposed Pipeline
1. **Dynamic Frontend Section:** Expand the `scratch/presenter_ingestion_ui.py` with a "Poster Presentations" interface.
2. **Dynamic Fields:** Provide text inputs for `Name`, `Affiliation`, and `Title`.
3. **Dual Dropzones:** Each row will feature two distinct drag-and-drop zones—one for the Poster Presentation and one for the Abstract. Each dropzone will have an independent "Mark Not Provided" button.
4. **Target Directory Structure:** Uploads will be routed to `docs/archives_translation/proceedings/14th/Poster/` and `docs/archives_translation/proceedings/14th/Abstract/` respectively.
5. **Metadata Syncing:** A new `poster_metadata.json` tracker will be maintained, aggregating the Name, Affiliation, Title, and paths for both uploaded artifacts.

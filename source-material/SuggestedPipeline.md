This document outlines the strategic plan to transition the **Workshop on Harsh-Environment Mass Spectrometry (HEMS)** website from its current legacy state into a modern, high-performance, and searchable scientific hub.

# HEMS Website Modernization Plan (2026 Strategy)

## 1. Architectural Vision
The architecture follows a **Serverless-First** approach. By decoupling the frontend from the backend and using managed services, we ensure the site remains fast, secure, and virtually free to operate during off-peak seasons.

### The Stack
* **Frontend:** Next.js (React) hosted on **Vercel**.
    * *Why:* Next.js provides Static Site Generation (SSG) for lightning-fast archive browsing and Server-Side Rendering (SSR) for the live conference schedule.
* **Backend:** **Google Cloud Functions** (Python/Node.js).
    * *Why:* Executes logic (like PDF processing) only when needed, staying within the "Always Free" tier.
* **Database:** **Cloud Firestore** (NoSQL).
    * *Why:* Stores session data, speaker bios, and metadata. Its flexible schema handles the varying data types of different workshop years.
* **Search Engine:** **Algolia** (Free Tier).
    * *Why:* Delivers an "instant" search experience for the 5GB+ archive without the overhead of maintaining a heavy search server.
* **Storage:** **Google Cloud Storage (GCS)**.
    * *Why:* Robust, cheap hosting for 25+ years of PDF and PPTX proceedings.



---

## 2. The Archive Management Strategy
Handling 5GB of legacy presentations is the most complex part of this project. We will transform "static files" into "searchable assets."

### A. The Processing Pipeline (Automated)
To avoid manual data entry, we will implement an automated ingestion pipeline:
1.  **Upload:** A committee member drops a PDF/PPTX into a specific GCS bucket.
2.  **Trigger:** A Cloud Function wakes up automatically.
3.  **Extraction:** * The function uses `pyxtxt` or `EasyOCR` to pull text from the slides.
    * It uses `ImageMagick` to snap a high-quality thumbnail of the first slide.
4.  **Indexing:** * The text and metadata (Year, Title, Author) are pushed to **Algolia**.
    * The thumbnail and file URL are stored in **Firestore**.

### B. Search & Preview UX
* **Instant Search:** As users type, Algolia filters results in <50ms.
* **Visual Previews:** Instead of downloading a 20MB PDF to check its relevance, users see the generated `.webp` thumbnail of the title slide.
* **Deep Filtering:** Users can filter the archive by "Environment" (e.g., Space, Deep Sea, Battlefield) or "Workshop Year."

---

## 3. Frontend & User Experience (UX)
The current site is text-heavy. The new site will prioritize "Scientific Impact."

### Design Directions
* **The "Rugged Science" Aesthetic:** Use a dark-themed UI (Slate/Charcoal) with vibrant accents (Electric Blue or Safety Orange). Incorporate high-resolution imagery of mass spectrometers in harsh environments (Mars rovers, underwater drones).
* **Responsive Schedule:** A mobile-friendly grid where attendees can "star" sessions to create a personal itinerary.
* **Accessibility (WCAG 2.1):** High-contrast ratios and screen-reader-friendly navigation, essential for academic and government-funded participation.

### Site Map
1.  **Home:** Vision, 2025/2026 Workshop countdown, and "Save the Date."
2.  **Program:** Interactive agenda and Keynote profiles.
3.  **Archive:** The Algolia-powered search interface for past papers.
4.  **Logistics:** Integrated Google Maps for the Virginia Beach venue and hotel booking links.
5.  **Submit:** A clean form for abstract submissions linked directly to the GCP backend.

---

## 4. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
* Setup GCP Project and Vercel Account.
* Configure Firestore security rules.
* Initialize Next.js project with Tailwind CSS for styling.

### Phase 2: The "Ingestion" Tool (Weeks 3-4)
* Develop the Python Cloud Function to process the 5GB archive.
* Perform a "Bulk Upload" of all past proceedings (1999–2022).
* Connect the Algolia index to the frontend search bar.

### Phase 3: Conference Features (Weeks 5-6)
* Build the 15th HEMS Workshop landing page (Virginia Beach).
* Implement the dynamic schedule and speaker bio modules.
* Set up Firebase Authentication for the "Reviewer Portal."

### Phase 4: Launch & SEO (Week 7)
* Connect the `hems-workshop.org` domain.
* Generate a Sitemap and use `Next-SEO` to ensure every archive paper is indexed by Google Scholar.

---

## 5. Cost & Scalability Assessment

| Service | Tier | Estimated Cost (Monthly) |
| :--- | :--- | :--- |
| **Vercel** | Hobby | $0 (Free for non-profits) |
| **GCP Cloud Run/Functions** | Free Tier | $0 (Up to 2M requests) |
| **Cloud Storage** | Standard | ~$0.15 (for 5GB-10GB) |
| **Firestore** | Free Tier | $0 (Up to 50k reads/day) |
| **Algolia** | Build Plan | $0 (Up to 10k records/searches) |
| **Total** | | **<$1.00 / month** |

---

## 6. Critical Reconsiderations & Risks
* **Legacy Formats:** Some 1999-era files may be in obsolete formats. These will require a one-time manual conversion to PDF before the automated pipeline can handle them.
* **Algolia Limits:** If the archive grows beyond 10,000 "chunks" of text, we should reconsider the indexing strategy (e.g., indexing only the Title/Abstract rather than every word of every slide).
* **Maintenance:** Since this is a serverless stack, there are no OS patches or server security updates to manage. The only maintenance is the annual update of the conference dates and location.

---


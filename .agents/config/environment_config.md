# 🔑 Environment & Account Manifest

**Custodian:** `@ops`
**Purpose:** This document tracks all version control, hosting, and third-party service configurations required for the HEMS Website Modernization project. 

> [!WARNING]
> **SECURITY MANDATE:** Never hardcode actual API keys, secrets, or passwords in this document. Use this file strictly to track account ownership, URLs, and environment variable *names*.

---

## 1. Version Control (Git)
*   **Repository Name:** `hems-website-frontend`
*   **Remote URL:** [https://github.com/rbellAdapt/hems-website-frontend](https://github.com/rbellAdapt/hems-website-frontend)
*   **Primary Branch:** `main`
*   **Local Root Path:** `src/frontend/`

---

## 2. Frontend Hosting (Vercel)
*   **Platform:** Vercel (Next.js native hosting)
*   **Project Name:** `[Pending Setup]`
*   **Production URL:** `[Pending Deployment]`
*   **Connected Repo:** `rbellAdapt/hems-website-frontend`
*   **Auto-Deploy:** Enabled on pushes to `main`

---

## 3. Search Engine (Algolia)
*   **Platform:** Algolia
*   **Purpose:** Instant search (<50ms) for the 25+ year paper archive.
*   **Account Owner:** `[Pending]`
*   **Application ID:** `[Pending]`
*   **Environment Variables Needed:**
    *   `NEXT_PUBLIC_ALGOLIA_APP_ID`
    *   `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` (Safe for client)
    *   `ALGOLIA_ADMIN_KEY` (SERVER-SIDE ONLY)

---

## 4. Backend & Storage (Google Cloud / Firebase)
*   **Platform:** Google Cloud Platform (GCS / Cloud Functions) & Cloud Firestore
*   **Purpose:** Automated ingestion pipeline for PDFs and NoSQL metadata storage.
*   **GCP Project ID:** `[Pending]`
*   **GCS Bucket Name (Archive):** `[Pending]`
*   **Firebase Environment Variables Needed:**
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `FIREBASE_CLIENT_EMAIL` (Server-side)
    *   `FIREBASE_PRIVATE_KEY` (Server-side)

---

## 5. Domain & DNS
*   **Primary Domain:** `www.hems-workshop.org`
*   **Registrar:** `[Pending - e.g., GoDaddy, Namecheap]`
*   **DNS Provider:** `[Pending - e.g., Cloudflare, Vercel]`
*   **Status:** Legacy site currently active. Will require DNS repointing to Vercel upon final launch.

# Pipeline Deployment for Workshop 14 (2022)

We are ready to deploy the initial version of the modernized HEMS website and the Workshop 14 assets to a live staging environment. This will allow us to verify the Serverless-First architecture online before porting the actual `hems-workshop.org` domain.

## User Review Required

> [!IMPORTANT]
> @bo: To stand up this pipeline, I need to know your preference on hosting the assets and deploying the code.
> 1. **Vercel Account:** Do you have a Vercel account ready to authenticate via the CLI? I will run `npx vercel login` and `npx vercel link` to connect this repository to a free `hems-website.vercel.app` staging URL.
> 2. **Google Cloud Storage (GCS):** The architecture plan calls for GCS to host the PDFs. Do you have a GCP project and the `gcloud` CLI installed locally? If not, we can either:
>    - Option A: You set up a GCP bucket manually and give me the bucket name.
>    - Option B: We use **Vercel Blob Storage** (built into Vercel) for now since it's instantly available without leaving the CLI.
> 
> Let me know how you want to proceed with the storage bucket!

## Proposed Changes

---

### Step 1: Storage Provisioning & Syncing
- Create/connect to the remote storage bucket (GCS or Vercel Blob).
- Sync the local `docs/archives_translation/proceedings/14th/` directory to the remote bucket.
- This will generate public URLs for all the PDFs and thumbnails.

### Step 2: Update Data Manifests
- Create a one-off migration script to update `src/frontend/src/data/archives/2022.json`.
- Replace all legacy `url` and `presentationUrl` references with the new permanent storage URLs.

### Step 3: Vercel Deployment
- Build and deploy the Next.js frontend to Vercel.
- The `manager` API routes will be excluded or secured to prevent public access.
- The site will be instantly accessible via a temporary `.vercel.app` URL.

## Verification Plan

### Manual Verification
1. I will provide the `.vercel.app` URL.
2. We will navigate to the 2022 (14th) Workshop Archive.
3. We will verify that clicking "Program Download", presentations, and abstracts instantly streams the PDF from the edge storage bucket.
4. We will verify the site speed and mobile responsiveness.

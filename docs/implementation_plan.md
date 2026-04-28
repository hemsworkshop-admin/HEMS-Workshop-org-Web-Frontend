# Administrative Files Ingestion

We will add the ability to automatically download the Workshop Program and Participant List via legacy URL pasting in the Manager Metadata section. We will also update the workshop frontend template to dynamically link these files in the "Workshop Resources" section and remove the deprecated "Corporate Sponsors" grid.

## User Review Required

> [!IMPORTANT]
> @bo: I will remove the "Legacy Corporate Sponsors" grid from the workshop template.
> For the new "Workshop Resources", when you click them on the live site, should they link directly to the **Legacy URLs** (e.g., `http://hems-workshop.org/...`), or should they link to a local path (if so, where are the downloaded files hosted in production)? I will map them to the legacy URLs for now, but let me know if they need to point to a GCloud bucket or local API path instead!

## Proposed Changes

---

### Backend API

#### [MODIFY] `src/frontend/src/app/api/manager/save/route.ts`
- Update the translation logic to populate `yearData.resources`.
- If `ws.program_url` exists, push a resource object: `{ label: "Workshop Program", icon: "FileText", url: ws.program_url }`.
- If `ws.participant_list_url` exists, push a resource object: `{ label: "Participant List", icon: "Users", url: ws.participant_list_url }`.

---

### Frontend Manager UI

#### [MODIFY] `src/frontend/src/app/manager/page.tsx`
- In the Metadata section, add two new input fields with `onPaste` handlers:
  - "Legacy Program URL"
  - "Legacy Participant List URL"
- Leverage the existing `/api/manager/download-legacy` endpoint.
- Downloading these will categorize them under "Administrative" and save them to `docs/archives_translation/proceedings/{wsNum}th/Administrative/`.
- Maintain a local state (via `useRef` and `useState` for downloading indicators) similar to how we handled `PresentationsManager.tsx`.

---

### Frontend Template

#### [MODIFY] `src/frontend/src/app/archive/[year]/page.tsx`
- Locate the `<div className="flex flex-wrap gap-4">` under "Workshop Resources".
- Map through `data.resources` to dynamically render the buttons with their respective icons (`FileText`, `Users`).
- Completely remove the `Legacy Corporate Sponsors` grid section (lines ~101-118).

## Verification Plan

### Manual Verification
1. Open the Manager UI.
2. In the Metadata section for a workshop, paste a Program PDF URL. Verify it turns yellow (Downloading) then green, and successfully saves `_Program.pdf` in the `Administrative` folder.
3. Click "Save and Present on Local Host".
4. The template will open. Verify that the "Workshop Resources" section now displays the "Workshop Program" button and that the Corporate Sponsors section is completely gone.

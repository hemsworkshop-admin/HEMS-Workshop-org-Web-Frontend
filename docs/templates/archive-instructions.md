# Archive Blueprint Instructions

## Overview
This document provides explicit instructions for initializing a new HEMS Workshop Archive page using the `archive-template.tsx` file. All future agents (@dev, @qa, @brand, etc.) must adhere strictly to these rules to maintain the identical styling, structure, and layout of the legacy 1999-2022 HEMS archives.

## 1. Setup the File
1. Copy the `archive-template.tsx` file to the new workshop directory (e.g., `src/app/archive/2024/page.tsx`).
2. Update the default export function name to match the year: `export default function Workshop[YEAR]() {`

## 2. Global Metadata Filling
All placeholders in the template are denoted by `[METADATA_NAME: Example Value]`. Replace these directly with the workshop's specific metadata:
- `[WORKSHOP_YEAR]`: The 4-digit year (e.g., `2024`).
- `[WORKSHOP_EDITION_NUMBER]`: The ordinal edition (e.g., `15th`).
- `[WORKSHOP_DESCRIPTION_PARAGRAPH]`: A 1-2 sentence high-level summary of the workshop.
- `[WORKSHOP_DATES]`: Date string (e.g., `September 26-29, 2022`).
- `[WORKSHOP_VENUE_NAME]` and `[WORKSHOP_VENUE_ADDRESS]`: The physical location.

## 3. Workshop Resources
Provide exact URLs or relative paths to the legacy `.pdf` or `.html` files for the resources block.
- **Rule**: If a resource (like a Participant List) does not exist for that year, **do not remove the button**; instead, comment it out or apply an `opacity-50 cursor-not-allowed` class, so the layout grid structure remains identical.

## 4. Sponsor Logos
If legacy corporate sponsors exist:
1. Ensure the logo images exist in `public/images/sponsors/`.
2. Duplicate the `<Image>` block for each sponsor.
3. Replace `[IMAGE_SRC_RELATIVE_TO_PUBLIC]` and `[SPONSOR_NAME]`.
> [!WARNING]
> Do NOT modify the `grayscale hover:grayscale-0` transition classes; they preserve the premium dark-mode aesthetic.

## 5. Technical Program Structure
The schedule is strictly divided first by Days, then by Events.
- **Days:** Duplicate the `<!-- [REPEAT THIS BLOCK FOR EACH DAY] -->` section for every day of the workshop.
- **Events:** Choose the correct structural template for each event type. **Never invent new structures or inline styles.**

### Event Type 1: Standard/Misc Event
- **Usage:** Breaks, Registration, Meals, Welcome Receptions, Evening Free time.
- **Styling:** Neutral background (`border-transparent`, `hover:bg-surface/30`).
- **Fields:** `[TIME]`, `[EVENT_TITLE]`, `[EVENT_SUBTITLE_OR_LOCATION]`.

### Event Type 2: Plenary Lecture / Keynote
- **Usage:** Special single-talk feature presentations or keynote speakers.
- **Styling:** Accent color (`bg-secondary/5`, `border-secondary`, `text-secondary`).
- **Fields:** Similar to Technical Sessions but generally without a sub-time for the single talk. Note the use of `[SESSION_TITLE]` and `[SESSION_LOCATION]`.

### Event Type 3: Technical Session
- **Usage:** Core workshop sessions containing multiple individual presentations.
- **Styling:** Primary color (`bg-primary/5`, `border-primary`, `text-primary`).
- **Fields:** Provide the `[SESSION_TITLE]`, then loop through the `divide-y` list of talks. For each talk, supply `[TALK_TIME]`, `[TALK_TITLE]` (hyperlinked if a presentation PDF exists), `[AUTHORS]` (with the presenter underlined), and a link to the `[LINK_TO_ABSTRACT_PDF]`.

## QA Protocol (@qa Check)
Before committing, @qa must verify:
- [ ] No custom Tailwind utility classes were added. Only the ones present in the template are allowed.
- [ ] All `<a>` tags for external PDFs use `target="_blank" rel="noopener noreferrer"`.
- [ ] Presenters' names are wrapped in `<span className="underline">...</span>`.
- [ ] The `[WORKSHOP_EDITION_NUMBER]` ordinal matches the mathematical sequence from 1999 (1st).

# Fix wheels vs. spoilers categorization

## Goal
- No wheel/tire products or tags should roll up under **Exterior**.
- Wheels/tires stay under **Suspension** (racing wheels sub-category).
- Spoiler-type tags reliably roll up under **Exterior**.

## Changes (single file: `src/hooks/use-catalog-facets.ts`)
1. Tighten the `Exterior` keyword pattern so it can never catch wheel/tire language, and make sure spoiler terms are explicit:
   `(exterior|aero|splitter|wing|spoiler|rear wing|ducktail|diffuser|body|hood|bumper|fender|rocker|canard|wrap|vinyl|mirror|glass)`
2. Keep/confirm wheel terms in `Suspension`: `wheel|tire|hub|axle`, including `racing wheel`.
3. Add an explicit guard in `mainCategoryOfTag`: if a tag matches `wheel|tire|rim`, return `Suspension` before any other match, so ordering changes can't reassign it later.
4. Add a `Wheels`-priority note in `MATCH_PRIORITY` ordering so Suspension is still evaluated before Exterior.

No changes needed to imagery mapping — wheel tags keep the wheel image, spoiler tags keep the aero image.

## Verification
Load the shop page, select **Exterior** and confirm no wheel/tire sub-categories appear and spoiler sub-categories do; select **Suspension** and confirm wheel sub-categories are listed.

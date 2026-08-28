# Statement Reconcile Bridge — visual thesis

## Direction: brutalist concrete and moss

This is a quiet workbench for the monthly moment when a bank export meets a
private ledger. It should feel like a durable paper ledger laid on a concrete
counter: squared edges, inked rules, proof marks, and small living moss-green
signals where the numbers agree. The visual language is deliberately practical
rather than finance-app glossy. It makes review feel finite and accountable.

## Tokens

- **Concrete:** `#e7e5dc` page ground, `#f6f3e9` raised paper, `#292c27` ink.
- **Moss:** `#355b37` action, `#18371f` deep action, `#d7e3c4` match field.
- **Rust:** `#a63c22` exceptions and destructive choices.
- **Pencil:** `#66675f` secondary copy and `#c7c5ba` rules.
- **Night treatment:** `#1c211d` ground, `#252b24` paper, `#f5f1e6` ink,
  `#c5c9bc` secondary copy, and dark `#18371f` banner fields. Pale moss remains
  an affirmative foreground signal, while action links use `#355b37` under white
  text. This avoids reversing pale semantic colors into low-contrast surfaces.

The system uses one-pixel dark rules, hard 2px offsets, square corners, and
compact status stamps. Spacing follows an 8px rhythm with extra 24px breathing
room around ledger tables.

## Type and interaction

System UI sans (`Inter`-like local system stack) carries instructions; a local
serif stack (`Georgia`) gives totals and the wordmark a ledger-character.
Numbers use tabular figures. Controls are broad, square, and visibly pressed
by changing their offset and shadow. The only signature motion is a short
150ms stamp settle after accepting a match. With reduced motion this is
instant; no looping or ornamental movement is used.

## Original art

The hero is an original generated still: a top-down concrete work surface with
a paper bank statement, a graph-paper ledger, a pencil, and moss growing in a
hairline crack. It is illustrative context, not information required to use
the app. Prompt sheet: muted concrete, ivory paper, moss green, overcast
editorial light, 50mm top-down lens, tactile grain; no text, logos, brands,
watermarks, people, or currency designs. It will ship as a compressed WebP
with a hand-authored social crop.

Generated 2026-08-28 with the factory image deployment (`factory-image`);
source is `src/assets/reconcile-workbench.png` and the exact generation prompt
is retained beside it in `reconcile-workbench.png.json`. It is original product
art, with no third-party asset license required.

## Why this fits

Reconciliation needs scrutiny, not celebration. Concrete gives the workspace
weight; moss marks the small places where two independent records agree. The
hard geometry supports scanning transactions without impersonating a banking
dashboard.

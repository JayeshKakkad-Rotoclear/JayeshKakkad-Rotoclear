# Profile maintenance

The profile presents a connected engineering practice, not selected projects.

- Update README.md and README.de.md together. English is the profile default; the language links open the corresponding repository README.
- Keep the catalogue links language-specific and use https://www.jayesh-kakkad.de. Email uses contact@jayesh-kakkad.com.
- Assets are self-contained SVGs in assets/practice-*.svg. Each banner/map has English/German and light/dark versions. Paired images use GitHub’s #gh-light-mode-only and #gh-dark-mode-only URL fragments. GitHub controls which image is visible according to its active theme, including when its theme differs from the operating system. Do not replace these with picture sources using prefers-color-scheme; those follow the system preference. Other Markdown viewers may show both variants.
- Images have a 600px intrinsic width and scale down under GitHub's responsive image styling. The vertical map avoids a tiny three-column diagram. Descriptions and a text equivalent remain native Markdown.
- Do not add selected projects, ranking, badge walls, third-party statistics or typing services.
- Future roles must remain future-facing until their start date. GBM is not included pending public-announcement timing.
- Account bio, location, avatar and pins are separate settings and are not changed by this repository update.
- Legacy banner.svg, github-metrics.svg, FEATURED_PROJECTS.md and METRICS_SETUP.md are retained for reference, not rendered by the profile. The existing metrics workflow remains unchanged; retiring it is a separate maintenance decision.

## Review checklist

Check both languages, light/dark image variants, 320px and desktop widths, keyboard-accessible disclosures, alt text, and language/catalogue/contact links. GitHub controls Markdown fonts, page layout and theme; do not embed CSS or JavaScript into the README. Confirm the actual GitHub rendering after publication.

Theme marker reference: https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/

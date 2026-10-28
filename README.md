# John Rhunor: Portfolio

Personal portfolio of John Rhunor Ighoshemu: full-stack engineer, mechanical engineer and oil &
chemical consultant. Live at [jrhunor.com](https://jrhunor.com).

Next.js 14 (pages router) · React 18 · Tailwind CSS 3 · Framer Motion. Deployed on Vercel from `main`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also regenerates the sitemap)
```

No environment variables are needed.

## Where things live

| What | Where |
| --- | --- |
| Projects and case-study content | `src/data/projects.js` (one entry per project; `/projects/[slug]` renders them) |
| Social links, email, WhatsApp | `src/data/social.js` |
| Experience timeline | `src/components/Experience.js` |
| Skills | `src/components/Skills.js` |
| 3D canvas scenes (molecule, gear, benzene, node graph) | `src/components/Scene3D.js` |
| Résumé pop-up | `src/components/ResumeModal.js` |
| Photo / 3D portrait flip | `src/components/FlipPortrait.js` |
| Shared UI pieces (buttons, tags, headings) | `src/components/ui.js` |
| Fonts (self-hosted) | `src/fonts/` |

### Adding a project

Add a screenshot to `public/images/projects/`, then add an entry to `src/data/projects.js`. The
projects grid, home page and case-study page pick it up automatically.

### Updating the résumé

The PDF at `public/engr-john-rhunor-resume.pdf` is printed from `resume/resume.html`. Edit the
HTML, then follow the regeneration steps in the comment at the top of that file.

## Credits

Originally started from the [NexTemp](https://github.com/lilxyzz/nextemp) template by Travis Lord
(MIT, see `LICENSE`), since redesigned.

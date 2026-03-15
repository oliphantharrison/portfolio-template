# Portfolio Landing Page Template

This template is designed so most people only need to edit one file:
- [src/App.tsx]

## Files You Should Care About
- [src/App.tsx]
  This contains the editable content at the top of the file and the page logic below it.
- [src/index.css]
  This contains the visual styles, theme colors, and animations. You usually do not need to edit this unless you want design changes.

## Main Content Block
At the top of [src/App.tsx], look for:

```ts
const SITE_CONTENT = {
  hero: {
    name: "hello",
    domain: "yourdomain",
    tld: ".com",
  },
  summary: "THOUGHTFUL, CONSIDERATE, GROUNDED, COMPASSIONATE, CURIOUS, GENUINE, WARM, INTENTIONAL",
  links: {
    email: "mailto:hello@yourdomain.com",
    instagram: "https://instagram.com/yourdomain",
    linkedin: "https://linkedin.com/in/yourdomain",
    website: "/",
  },
};
```

Those are the main values you should edit.

## What Each Field Controls
- `hero.name`
  The left side of the hero text. Example: `hello`
- `hero.domain`
  The center domain text. Example: `yourdomain`
- `hero.tld`
  The ending of the domain. Example: `.com`
- `summary`
  The line of text under the hero
- `links.email`
  The email link used when hovering or tapping `@`, and also used by the footer email icon
- `links.instagram`
  The Instagram link used when hovering or tapping the domain portion, and in the footer
- `links.linkedin`
  The LinkedIn link used in the footer
- `links.website`
  The website link used when hovering or tapping `.com`

## Example: Change It To John
If you want the hero to be:

`john@johnappleseed.com`

and your information is:

- name: `john`
- domain: `john@johnappleseed.com`
- email: `@johnappleseed.com`
- instagram: `https://www.instagram.com/johnappleseed`
- linkedin: `https://www.linkedin.com/in/johnappleseed`

change the content block to:

```ts
const SITE_CONTENT = {
  hero: {
    name: "john",
    domain: "johnappleseed",
    tld: ".com",
  },
  summary: "INSERT A BRIEF 8 WORD SUMMARY ABOUT YOURSELF",
  links: {
    email: "mailto:john@johnappleseed.com",
    instagram: "https://www.instagram.com/johnappleseed",
    linkedin: "https://www.linkedin.com/in/johnappleseed",
    website: "/",
  },
};
```

## Quick Editing Rules
- If your domain is `something.com`, put `something` in `hero.domain` and `.com` in `hero.tld`
- If your domain is `something.co`, use `.co`
- Always include `mailto:` in the email link
- Use full URLs for Instagram and LinkedIn

---
title: "WS Phone Shop: Multilingual Phone Consulting & Pricing Cards in 7 Languages"
slug: "ws-phone-shop-multilingual-consulting"
client: "WS Phone Shop"
industry: "Retail / Telecom Consulting"
excerpt: "How we built a multilingual phone consulting app that generates clear pricing cards and posters—helping foreigners compare plans and devices in 7 languages."
coverImage: "/images/case-studies/phoneshop.png"
featured: true
challenge: "Phone plan consulting in Korea is complicated—especially for foreigners. Customers struggle to compare device pricing, subsidies, contract conditions, and plan changes over time. WS Phone Shop needed a fast, accurate, multilingual tool that staff could use during consultations to explain offers clearly and consistently."
outcome: "We built a Next.js app that calculates real-world phone pricing scenarios (device price, carrier discounts/subsidies, optional discounts, deposits, and contract plan rules) and instantly generates shareable pricing cards and posters in 7 languages. The result is a smoother in-store experience, clearer decision-making for customers, and a repeatable workflow for the shop."
duration: "MVP launch"
services:
  - "Product Design"
  - "UX/UI Design"
  - "Frontend Development"
  - "Backend Development"
  - "Internationalization (i18n)"
  - "Pricing Logic & Rule Engine"
  - "Card/Poster Generation"
  - "Deployment & Hosting"
technologies:
  - "Next.js"
  - "Supabase"
  - "AWS Amplify"
tags:
  - "Retail Tech"
  - "Telecom"
  - "Internationalization"
  - "Pricing"
  - "Web App"
metrics:
  - label: "Languages Supported"
    value: "7"
  - label: "Outputs"
    value: "Pricing card + poster"
  - label: "Use Case"
    value: "In-store consulting"
  - label: "Logic Coverage"
    value: "Device + plan + contract rules"
testimonial:
  quote: ""
  author: ""
  role: ""
---

## The Challenge

WS Phone Shop supports a diverse customer base—including many foreigners—who often need help understanding Korean telecom pricing.

A single purchase decision can involve:
- Device retail price vs. carrier subsidy support
- Store discounts, card discounts, and deposits
- Contract requirements (e.g., high-tier plan for a few months, then switching plans)
- Different explanations depending on language

Without a dedicated tool, explanations become inconsistent, slow, and hard to trust—especially when customers want something they can **take with them** (a clear quote) and review later.

## Our Approach

We focused on building a consultation tool that is:
1. **Accurate** — pricing logic matches real carrier/store rules
2. **Fast** — staff can generate a quote in minutes during a conversation
3. **Clear** — output is easy to understand for non-native speakers
4. **Multilingual by design** — content and UI work across 7 languages
5. **Shareable** — users can download a card or generate a poster instantly

## The Solution

### Multilingual UI (7 Languages)
We implemented internationalization so the entire consultation flow—device info, pricing breakdown, and plan rules—can be presented in multiple languages with consistent formatting.

### Price Builder: Device + Discount + Deposit
We created a structured pricing builder that supports:
- Retail device price
- Carrier discount/subsidy fields
- Store discount and card discount inputs
- Cash deposit handling (paid upfront, deducted from total)

This gives staff flexibility while keeping the total calculation consistent and transparent.

### Plan Timeline Pricing (Real Contract Scenarios)
Many offers depend on time-based plan rules (e.g., higher plan for the first X months, then switching to a lower plan).
We built a plan pricing section that:
- Shows the first period plan and monthly cost
- Shows the remaining contract period plan and monthly cost
- Includes bundling logic and thresholds
- Clearly states the contract rule in plain language (so customers understand what they must do)

### Card + Poster Generation
During consultations, customers often ask for something they can save or share.
We added one-click actions to:
- **Download a pricing card**
- **Generate a poster**

This turns a complex quote into a clean artifact customers can trust.

### Simple, Scalable Stack
- **Next.js** for a fast, responsive UI that works well in-store on modern devices
- **Supabase** for auth/data workflows and rapid iteration
- **AWS Amplify** for streamlined hosting and deployment

## Results

- A live consultation tool that supports **7 languages** for foreigners and locals
- Faster, more consistent pricing explanations during in-store consulting
- Clear, shareable outputs (cards/posters) that improve customer confidence
- A pricing system that can grow to support more devices, carriers, and rule variations over time

## Beyond the Numbers

This app improves the human side of consulting:
- Customers feel understood in their preferred language
- Staff spend less time re-explaining complex rules
- Quotes become consistent, repeatable, and easy to review later

Most importantly, it helps WS Phone Shop serve foreign customers with the same clarity and confidence as a native-language experience.

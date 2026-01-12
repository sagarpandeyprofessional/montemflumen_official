---
title: "Making Code Reviews Actually Work"
slug: "effective-code-reviews"
date: "2024-12-10"
author: "Gevariya Sahil Nandlalbhai"
authorRole: "Senior Engineer"
category: "Engineering"
excerpt: "Code reviews should catch bugs and share knowledge. Too often they become a bottleneck that delays delivery without adding value. Here's how to fix that."
coverImage: "/images/blog/code-reviews.jpg"
tags:
  - "Code Review"
  - "Team Culture"
  - "Best Practices"
  - "Engineering"
---

I've participated in thousands of code reviews over my career—some valuable, many not. The difference usually isn't the code being reviewed, but how the review is conducted.

## The Goal of Code Review

Before discussing process, let's align on purpose. Code reviews should:

1. **Catch bugs and design issues** before they reach production
2. **Spread knowledge** across the team
3. **Maintain code quality** and consistency
4. **Mentor junior engineers** through feedback

What code reviews should NOT be:
- A gatekeeping ritual
- A place to debate style preferences
- A bottleneck that delays shipping

## Keep Reviews Small

The most impactful change we made was limiting PR size. Large reviews don't get the same scrutiny as small ones—reviewers get fatigued and start skimming.

Our guidelines:
- **< 200 lines changed** is ideal
- **200-400 lines** requires extra attention
- **> 400 lines** should be split

Yes, this means more frequent, smaller PRs. That's a feature, not a bug. Smaller changes are easier to review, easier to understand, and easier to roll back.

## Review Code, Not Authors

It's easy for code review to become personal. "You made this mistake" hits differently than "This approach has a potential issue."

We consciously use language that focuses on the code:
- "This method could be simplified by..."
- "Have you considered..."
- "I'm not sure I understand the intent here..."

## Automate the Obvious

Don't waste human attention on things machines can check:
- Formatting (Prettier, Black)
- Linting (ESLint, Pylint)
- Type checking (TypeScript, mypy)
- Test coverage thresholds

These run in CI before humans ever see the code. Reviews focus on logic, design, and clarity—things that require human judgment.

## Timely Reviews Matter

A review that arrives three days later is worth less than one that arrives in three hours. Context has been lost. The author has moved on mentally.

We set expectations:
- Reviews should start within 4 hours during business hours
- Blocking reviews get flagged in Slack
- If you're heads-down, say so—someone else will cover

## Know When to Stop

Not every comment needs to be addressed. Some suggestions are preferences, not requirements. We use a simple convention:

- **must**: This needs to change before merging
- **should**: Strongly recommended, but author's call
- **could/nit**: Optional improvement, take it or leave it

This clarity prevents endless back-and-forth on minor issues.

## Conclusion

Good code review is about creating feedback loops that improve both the code and the engineers writing it. Like any skill, it takes practice and intentionality.

The investment is worth it. Teams with healthy code review practices ship better software with more confidence.

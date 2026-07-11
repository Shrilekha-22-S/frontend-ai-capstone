# AI-Assisted Workflow Comparison

## Feature

I built a simple Settings Form with validation using two different AI prompting approaches.

### Round 1 – Vague Prompt

In the first attempt, I used a simple prompt asking the AI to create a settings form. The generated code was functional but lacked detailed validation, accessibility considerations, and structured organization. I accepted the initial output with minimal review.

### Round 2 – Structured Prompt

For the second attempt, I provided a detailed prompt specifying semantic HTML, form validation, accessibility, clean JavaScript, and verification requirements. The generated code was more organized and easier to understand. Labels were properly connected to form fields, validation was clearer, and the overall user experience improved.

## Comparison

The structured prompt produced better code quality. It included clearer validation logic, improved readability, and better accessibility practices. The vague prompt required more manual review because several assumptions were made by the AI. The structured version reduced review effort because expectations were clearly defined before code generation.

## AI Mistake I Caught

One issue I noticed was that the initial AI-generated version did not fully validate all possible invalid email formats and lacked clear error feedback. I reviewed the generated code and ensured validation behavior matched the intended requirements.

## What I Learned

This exercise showed that AI produces significantly better results when given precise instructions, constraints, and expected behaviors. Instead of accepting the first response, providing detailed prompts and reviewing the generated code leads to higher-quality, more maintainable software.
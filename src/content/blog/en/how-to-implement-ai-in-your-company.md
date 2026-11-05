---
lang: en
title: "How to implement AI across a company's workflow, not just in your chat"
excerpt: "You already use ChatGPT or Claude every day and it works. The trouble starts when you try to get your whole team working the same way. A real case, the steps, and the decisions to make first."
seoTitle: "How to implement AI in your company: steps and risks"
seoDescription: "From individual ChatGPT or Claude use to a shared workflow: what breaks when you scale, what to settle first, and the steps of a real case in an accounting firm."
date: 2026-11-05
tags: ["ai", "automation", "smb", "rag"]
author: eliezer-meza
translationKey: implement-ai-company
---

If you run a company and have been using ChatGPT or Claude for months, you have probably been here: you found a way of working with AI that saves you hours, you gladly pay for a subscription, and you wonder why the rest of the team does not get the same out of it. You try to share it, everyone tries it their own way, and within a few weeks you have five different versions of the same process.

This article is for that moment. We are not going to explain what a language model is. We are going to talk about what changes when AI stops being a personal tool and becomes part of the whole company's workflow, what that implies, and which steps get you there without breaking what already works.

## The ceiling of individual use

Individual AI use has a ceiling, and it is not technical. It is organizational.

When one person uses a chat, the context lives in their head: they know which document they uploaded, what they asked before, which answer they discarded and why. When five people use five chats, that context fragments. Nobody knows which version of the document the AI saw, under which instructions it answered, or which company process that answer belongs to.

We saw it up close with a client. The owner of an accounting firm used AI agents every day to summarize client documents, generate reports and build dashboards. He had reached a balance: he knew what to ask, how to ask it and what to check. The problem appeared when he wanted his team to work the same way.

Three things failed at once:

- **The quotas were not enough.** Free and individual plans were never meant to process large batches of documents, and work stalled halfway through the month.
- **Each employee attached documents at their own discretion**, in different agents, often without keeping the context of previous conversations.
- **There was no shared frame.** Nothing stated which process of the firm each query belonged to, so two people could get different answers about the same client and neither could say which one was right.

The result was inconsistent information. In an accounting firm, that is not an inconvenience. It is risk.

## What changes when you go from chat to system

The difference between using AI and having implemented AI comes down to one question: where does your company's truth live?

In individual use, the truth lives in the documents each person uploads to the chat. In a real implementation, the truth lives in a single controlled place, and the AI consults it from there. That is the underlying change, and it has a technical name: RAG, for *retrieval-augmented generation*. For a manager, the explanation fits in three lines:

1. Your documents are processed once and stored in a database that understands their meaning, not just their words.
2. When someone asks a question, the system retrieves only the relevant fragments and hands them to the model together with the question.
3. The model answers with those fragments as its source, instead of rereading the whole file every time.

For the accounting firm, that meant building a RAG module with a vector database and a shared chat interface. But the valuable work was not the chat. It was defining which information mattered. While studying their business model we identified the data nodes that held the operation together, especially the profile of each of the firm's clients and the status of their tax compliance obligations. That map is what turns a pile of PDFs into a single source of truth.

## The results, in numbers

Before, the firm paid for five individual subscriptions, around 100 dollars a month, and still ran out of quota. After, API usage of a compact model (Claude Haiku 4.5) stayed under 40 dollars a month: a 64% reduction in usage cost.

It is worth understanding where that saving comes from, because it is not the cheap model. It comes from no longer sending complete documents with every query. With the vector database, the model receives only what it needs to answer, and a compact model that is fed well performs better than a large one working blind.

The inconsistencies disappeared for the same reason: everyone consults the same source, under the same rules.

In time, the first module took six weeks to reach production. With that foundation in place, task management, summary boards and CRM modules were added at four weeks each, all consulting the same information.

## The implications you need to settle first

This is where most articles about AI in business stay on the surface. These are the decisions a manager has to make, with what we did in this case as a reference.

**Where the data lives and what travels to the provider.** An accounting firm handles third parties' tax and financial information. The documents stayed on the client's own infrastructure on AWS, in a region inside the country, because the applicable law required the information to be stored within the territory. Only the fragments relevant to each question travel to the model, plus the particular conditions and profile context of the client being consulted. Never the full file. Before implementing anything, find out what your country's law says about where the data you handle may be stored, and design from there.

**Cost per use instead of cost per seat.** Subscriptions charge per person and limit by quota. An API charges for what you process. For teams that work with many documents, the second model is almost always cheaper, but it demands an architecture that does not waste tokens. That is the work a subscription will never do for you.

**Team adoption.** The owner was convinced, but the team had to change habits. That is why the first production module was the RAG chat and not a dashboard or an automation: people moved from one tool to another with the same usage rules and a different approach underneath. The change was organic. With two remote sessions, the whole staff of the firm completed the transition. The lesson is simple: the first module has to look like what people already do.

**The order of construction.** A modular system is built on a source of truth. First the data and the way to consult it; then each module that uses it. If you start with the CRM or the dashboards without settling where the information lives, you will rebuild the five-versions problem with a better interface.

## The steps, in order

This is what we did with the firm. You can do the first three stages yourself, without hiring anyone.

1. **A one-hour conversation.** The owner told us about his business model, how he was using AI chats and what he wanted to achieve: for his personal experience to become replicable across the whole firm. If you are doing this alone, write that summary. What you do with AI today, what results you get and what happens when you try to share it.
2. **Research on the industry and the legal framework.** Using public information we studied how an accounting firm operates and which legal conditions applied in the client's country. This sets design constraints before they exist, not after.
3. **A second round of questions, in writing.** With the research and the notes from the first conversation we put together a list that went deeper into the points that had stayed on the surface. The client answered by email. Written answers force precision, and that is where the data nodes that later held the system together came from.
4. **A requirements document and a plan.** Before writing a line of code, a PRD and the presentation of the development plan. With that, the client confirmed the direction was right. This step looks bureaucratic and is the opposite: it is the last cheap chance to change course.
5. **The first module, the one closest to what the team already does.** In this case, the RAG chat. Six weeks.
6. **The following modules, on the same foundation.** Tasks, summary boards, CRM. Four weeks each, and each one was born consulting the same source of truth.

## What to do on Monday

Do not hire anyone yet. Do the diagnosis yourself.

Take an hour and write down how your company uses AI today: who uses it, with which tools, which documents they upload, under which rules, and what happens to the context when they close the window. Add up what you pay in scattered subscriptions. Note how many times in the last month two people got different answers about the same thing.

Then ask yourself the underlying question: how much value are you losing by working with generic tools in a business that is not generic. Your company's processes, the data that sustains them and the rules it operates under are yours. A tool built to fit them is not a technological luxury; it is the difference between using AI and having implemented it.

If the answer makes you uncomfortable when you finish the diagnosis, that is the right starting point.

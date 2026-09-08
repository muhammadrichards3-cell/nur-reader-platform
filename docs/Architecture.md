# Nūr Platform

## Application Blueprint v2.0

**Project:** Islamic Mobile Library / Nūr Reader Platform
**Status:** Architecture Locked
**Version:** 2.0
**Date:** September 2026

---

# 1. Vision

Nūr is a digital Islamic learning and reading platform combining:

* Islamic Mobile Library management
* Madrassah management
* Learner management
* Curriculum tracking
* Qur'an memorisation
* Duʿā memorisation
* Islamic Studies progress
* Micro-learning courses
* Assessments
* Parent communication
* Learner progress
* Reading history
* Reports and achievements

Nūr is not merely a website.

It is one platform delivered through multiple interfaces optimised for different users and tasks.

---

# 2. Core Principle

Nūr will use:

**One platform.**

**One authentication system.**

**One shared backend.**

**One learner record.**

**Multiple interfaces.**

The primary interfaces are:

1. Nūr Web — administration and detailed work
2. Nūr Teacher App — fast daily classroom actions
3. Nūr Parent App — quick progress and weekly updates
4. Nūr Learner App — learning, reading and progress

The website and application must never become independent systems with duplicated data.

---

# 3. User Roles

## Administrator

Primary interface: Web

Responsibilities:

* Organisation management
* Madrassah management
* User management
* Teacher management
* Curriculum management
* Course management
* Book management
* Reports
* Settings
* Permissions
* System oversight

---

## Teacher

Primary interfaces: Web + App

Web responsibilities:

* Manage classes
* Review learners
* Manage curriculum
* Detailed assessments
* Qur'an records
* Duʿā records
* Teacher comments
* Reports
* Curriculum planning

App responsibilities:

* Attendance
* Daily class work
* Quick assessments
* Qur'an memorisation updates
* Duʿā completion
* Quick teacher notes

---

## Parent

Primary interfaces: App + Web

App responsibilities:

* Weekly learner updates
* Attendance overview
* Learning progress
* Qur'an progress
* Duʿā progress
* Reading activity
* Teacher messages/notes
* Notifications

Web responsibilities:

* Detailed learner history
* Term reports
* Curriculum progress
* Assessment results
* Report downloads
* Detailed records

---

## Learner

Primary interface: App

Responsibilities:

* Courses
* Micro-lessons
* Quizzes
* Learning progress
* Qur'an progress
* Reading
* Achievements
* Personal profile

---

# 4. Platform Engines

Nūr consists of four interconnected engines.

## Library Engine

* Families
* Readers
* Books
* Loans
* Returns
* Reading history

## Learning Engine

* Courses
* Modules
* Lessons
* Micro-lessons
* Quizzes
* Questions
* Progress
* Achievements

## Madrassah Engine

* Organisations
* Madrassahs
* Classes
* Teachers
* Learners
* Curriculum
* Attendance
* Assessments
* Qur'an
* Duʿās
* Islamic Studies
* Reports

## Learner Core

The learner is the central connection between all engines.

A learner can have:

* Family
* Madrassah
* Class
* Teacher
* Curriculum
* Qur'an record
* Duʿā record
* Course enrolments
* Lesson progress
* Quiz results
* Library activity
* Reading history
* Achievements
* Reports

---

# 5. Website Architecture

The website is the heavy-work environment.

Primary sections:

* Dashboard
* Organisations
* Madrassahs
* Classes
* Families
* Readers
* Learners
* Teachers
* Books
* Loans
* Curriculum
* Courses
* Assessments
* Qur'an
* Duʿās
* Reports
* Settings

The web interface should prioritise:

* Tables
* Forms
* Search
* Filtering
* Bulk actions
* Detailed records
* Data entry
* Reporting
* Configuration

---

# 6. Application Architecture

The mobile application is the lightweight daily environment.

Primary sections:

* Home
* My Learning
* Attendance
* Today's Class
* My Reading
* Progress
* Achievements
* Profile

The app should prioritise:

* Large touch targets
* Minimal navigation
* Quick actions
* Short interactions
* Notifications
* Mobile-first layouts
* Offline-friendly workflows

---

# 7. Learning Architecture

Learning follows:

Course
→ Module
→ Lesson
→ Activity
→ Quiz
→ Completion
→ Progress
→ Achievement

The fundamental learning unit is the Nūr Micro-Lesson.

A micro-lesson should generally be short and focused.

Potential lesson components:

* Text
* Arabic text
* Images
* Video
* Audio
* PDF
* Questions
* Quiz
* Reflection
* External resource

Initial implementation should remain simple.

Start with:

* Text
* Images
* Questions
* Completion tracking

Additional media types can be added later.

---

# 8. Madrassah Curriculum Architecture

Curriculum must be configurable rather than hard-coded.

Possible curriculum areas include:

## Qur'an

* Memorisation
* Recitation
* Revision
* Tajwīd

## Duʿās & Adhkār

* Daily duʿās
* Ṣalāh-related adhkār
* Morning/evening adhkār

## Islamic Studies

* ʿAqīdah
* Fiqh
* Sīrah
* Hadith
* Islamic history
* Ādāb

## Arabic

* Reading
* Vocabulary
* Grammar
* Comprehension

Each madrassah should eventually be able to configure or select its own curriculum.

---

# 9. Qur'an Memorisation

The platform should support tracking individual Surahs.

Potential record:

* Surah
* Memorisation status
* Date completed
* Teacher assessment
* Revision status
* Revision date
* Teacher notes

Example statuses:

* Not started
* In progress
* Memorised
* Assessed
* Needs revision

The system should calculate curriculum progress automatically.

---

# 10. Duʿā Tracking

Duʿās should be trackable individually.

Potential record:

* Duʿā
* Category
* Status
* Date completed
* Teacher assessment
* Notes

The platform should calculate overall Duʿā programme completion.

---

# 11. Attendance

Teachers should be able to record attendance quickly from the mobile application.

Possible statuses:

* Present
* Absent
* Late
* Excused

Attendance should contribute to:

* Learner records
* Parent updates
* Reports
* Statistics

---

# 12. Assessments

Teachers should be able to record:

* Curriculum completion
* Marks
* Competency
* Qur'an assessment
* Duʿā assessment
* Teacher comments

Detailed assessment entry belongs primarily on the website.

Quick assessment updates belong on the application.

---

# 13. Parent Reporting

Nūr should support generated learner reports.

A report may contain:

* Learner information
* Class
* Term
* Attendance
* Qur'an progress
* Duʿā progress
* Islamic Studies
* Arabic
* Other curriculum areas
* Reading
* Teacher comments
* Overall progress

Reports should eventually be:

* Viewed online
* Published to parents
* Downloadable
* Printable
* Stored against the learner record

---

# 14. Weekly Parent Updates

The parent application should provide a simplified weekly summary.

Example:

Learner completed:

* 3 lessons
* 2 Qur'an targets
* 2 Duʿās

Attendance:

* 4/4 sessions

Reading:

* 1 book borrowed

Teacher note:

* Weekly teacher feedback

The objective is useful communication without overwhelming parents.

---

# 15. Library Integration

Library activity should connect directly to learner profiles.

Example:

Learner
→ Borrows Book
→ Book appears in Reading
→ Book returned
→ Reading history updated
→ Reading achievement potentially awarded

Learning and library activity should remain connected but independently manageable.

---

# 16. Achievement System

Nūr may eventually award achievements for:

* Books read
* Courses completed
* Lessons completed
* Qur'an milestones
* Duʿā milestones
* Consistent attendance
* Learning streaks
* Reading milestones

Achievements should encourage learning without becoming the central purpose of the platform.

---

# 17. Data Architecture

Current collections:

* families
* readers
* system/counters

Potential future collections:

* organisations
* branches
* users
* teachers
* classes
* learners
* books
* loans
* reading_logs
* courses
* modules
* lessons
* quizzes
* questions
* enrolments
* lesson_progress
* course_progress
* curriculum
* curriculum_items
* attendance
* assessments
* quran_records
* dua_records
* badges
* achievements
* reports
* notifications
* settings
* audit_logs

These collections must NOT all be implemented immediately.

They represent the target architecture.

Each new collection must be justified before implementation.

---

# 18. Technology

Initial platform technology:

* HTML
* CSS
* JavaScript
* Bootstrap
* Firebase
* Firestore
* Firebase Authentication
* Firebase Hosting
* Firebase Storage where required
* Progressive Web App technologies
* Git
* GitHub

No framework migration should occur without a clear architectural justification.

The existing working application should be preserved wherever practical.

---

# 19. Security

Security must be designed before exposing sensitive learner functionality.

The platform must eventually support:

* Authentication
* Role-based access
* Firestore Security Rules
* Organisation-level data isolation
* Teacher permissions
* Parent permissions
* Learner permissions
* Administrator permissions
* Audit logging

Users must only access information appropriate to their role and organisation.

---

# 20. PWA Strategy

The application should eventually be installable on mobile devices.

Target capabilities:

* App icon
* Standalone display
* Responsive interface
* Service worker
* Application shell
* Offline-friendly behaviour
* Online synchronisation
* Firebase integration

The PWA should provide the app-like experience without requiring immediate native iOS/Android development.

---

# 21. Development Rules

## Rule 1 — Architecture before implementation

Do not build features before deciding where they belong.

## Rule 2 — One objective per sprint

Each development session has one clearly defined objective.

## Rule 3 — Preserve working functionality

Do not rewrite working systems unnecessarily.

## Rule 4 — Complete files

When replacing a file, provide the complete replacement file.

## Rule 5 — Test immediately

Every implementation must be tested before continuing.

## Rule 6 — Git checkpoints

Completed features should be committed.

## Rule 7 — No architecture drift

New ideas are recorded as future features rather than immediately disrupting the current sprint.

## Rule 8 — Minimal dependencies

Only introduce dependencies that provide clear value.

## Rule 9 — Mobile and web share the same backend

Never duplicate the underlying data unnecessarily.

## Rule 10 — Security is foundational

Do not postpone permission architecture until after major features are built.

---

# 22. Development Workflow

Each feature follows:

PLAN
→ DESIGN
→ IMPLEMENT
→ TEST
→ REVIEW
→ COMMIT
→ NEXT FEATURE

Development should prioritise the fastest clean implementation rather than maximum complexity.

---

# 23. Four-Month MVP Direction

## Month 1 — Foundation

* Application architecture
* Authentication foundation
* User roles
* Application shell
* PWA foundation
* Security foundation

## Month 2 — Library

* Families
* Readers
* Books
* Loans
* Returns
* Reading history

## Month 3 — Madrassah + Learning

* Classes
* Learners
* Curriculum
* Attendance
* Qur'an tracking
* Duʿā tracking
* Courses
* Modules
* Micro-lessons
* Quizzes
* Progress

## Month 4 — Parent + Integration

* Parent accounts
* Weekly updates
* Reports
* Achievements
* Learner dashboard
* Library/learning integration
* Testing
* Production preparation

This roadmap is a target, not a guarantee. Quality and architectural stability take priority over rushing features.

---

# 24. Long-Term Vision

Nūr should eventually become a unified platform where:

A learner reads.

A learner learns.

A teacher teaches.

A madrassah manages.

A parent monitors.

And the platform records the learner's journey.

The long-term goal is not simply to digitise existing madrassah administration.

The goal is to create an integrated Islamic educational ecosystem.

---

# 25. Current Status

Existing working functionality:

* Firebase connection
* Firestore
* Family registration
* Reader registration
* ID generation
* Families page
* Basic application navigation

Current architecture should be audited before major expansion.

The next development phase begins with the application foundation.

---

# 26. Architecture Lock

This document represents the current strategic direction of Nūr.

Changes to the architecture should only occur when:

1. A genuine technical limitation is discovered;
2. A security requirement demands it;
3. A major product requirement cannot be supported;
4. The change substantially improves long-term maintainability.

New ideas that do not meet these conditions should be recorded as future features rather than changing the current architecture.

**Nūr Platform — Read. Learn. Grow.**

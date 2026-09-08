# INIT NETWORK

## Product Requirements Document

**Version:** 1.0
**Product:** INIT Network
**Type:** Builder / Student Technology Network
**Status:** Early-stage product

---

# 1. PRODUCT VISION

INIT is a network for students who **build, ship, learn, connect, and lead**.

The goal is to create a system where ambitious students can:

* find other builders
* discover projects
* collaborate
* participate in technical activities
* start or join campus chapters
* showcase what they build
* discover opportunities
* contribute to the wider INIT network

INIT should evolve beyond being a community website into a **builder ecosystem**.

> **The landing page attracts builders. The INIT platform helps them build.**

---

# 2. PROBLEM

Students interested in technology often have:

* ideas but no collaborators
* skills but no projects
* projects but no visibility
* ambition but no community
* communities but no structured opportunities
* interest in leadership but no platform to lead

Existing platforms are fragmented.

A student may use:

```text
Discord → community
GitHub → code
LinkedIn → identity
WhatsApp → communication
Event platforms → events
Notion → documentation
```

INIT aims to bring the **builder journey** into one ecosystem.

---

# 3. TARGET USERS

## Primary

### Student Builders

Developers, AI/ML students, designers, researchers, founders, hackers, and technical creators.

They want:

* collaborators
* projects
* visibility
* learning
* opportunities
* community

### Chapter Leads

Students responsible for building INIT communities on campuses.

They need:

* chapter management
* member discovery
* events
* projects
* recruitment
* analytics
* resources

### Core Team

People operating the INIT Network.

They need:

* network visibility
* chapter management
* user management
* content management
* event management
* analytics

---

# 4. CORE PRODUCT PRINCIPLE

INIT should answer four questions:

### WHO?

Who are the builders around me?

### WHAT?

What are they building?

### WHERE?

Where can I participate?

### WHAT'S NEXT?

What can I build, join, or lead?

---

# 5. PRODUCT ECOSYSTEM

The INIT ecosystem consists of:

```text
INIT LANDING PAGE
        ↓
DISCOVERY
        ↓
JOIN INIT
        ↓
BUILDER PROFILE
        ↓
NETWORK
        ↓
BUILDS
        ↓
EVENTS
        ↓
CHAPTERS
        ↓
OPPORTUNITIES
        ↓
COLLABORATION
```

---

# 6. LANDING PAGE

The landing page is already designed/built.

**Do not redesign it.**

It establishes the INIT brand and storytelling.

Current visual system:

* React
* Vite
* TypeScript
* Tailwind CSS
* GSAP
* GSAP ScrollTrigger
* Framer Motion
* hls.js
* React Router DOM
* tailwindcss-animate

Visual identity:

* dark
* cinematic
* technical
* editorial
* minimal
* premium

The product UI must inherit this identity.

---

# 7. DESIGN SYSTEM

## Typography

### Inter

Used for:

* body
* navigation
* buttons
* labels
* metadata
* functional UI

Weights:

```text
300
400
500
600
700
```

### Instrument Serif Italic

Used for:

* major headings
* editorial statements
* highlighted words
* large numbers
* visual emphasis

---

## Colors

```css
--bg: 0 0% 4%;
--surface: 0 0% 8%;
--text: 0 0% 96%;
--muted: 0 0% 53%;
--stroke: 0 0% 12%;
--accent: 0 0% 96%;
```

INIT gradient:

```css
linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)
```

Use the gradient selectively.

Do not introduce a second visual system.

---

# 8. MVP PRODUCT

The first usable INIT platform should focus on five core areas:

```text
1. Dashboard
2. Network
3. Builds
4. Events
5. Profile
```

These should establish the core product loop before adding advanced functionality.

---

# 9. DASHBOARD

The dashboard is the user's home after joining INIT.

It should answer:

> **What's happening for me right now?**

Display:

### Personal overview

```text
Active Builds
Upcoming Events
Network Connections
Contributions
```

### Current builds

Show projects the user is currently involved in.

### Upcoming events

Show relevant INIT events.

### Network activity

Show recent activity from builders, projects, and chapters.

### Opportunities

Show relevant opportunities.

The dashboard should be **action-oriented**, not an analytics dashboard.

---

# 10. NETWORK

The Network is one of the core features of INIT.

Users should be able to discover builders.

Filter by:

```text
Skills
Campus
Interests
Technology
Projects
Chapter
```

Possible skills:

```text
Development
AI / ML
Design
Cybersecurity
Robotics
Research
Startups
Open Source
```

Builder profile cards should show:

```text
Name
Photo
Campus
Skills
Current Build
Chapter
Social links
```

Primary action:

```text
Connect
```

Future:

```text
Collaborate
Invite to Project
Message
```

---

# 11. BUILDER PROFILE

The profile should represent **what someone builds**, not simply their academic resume.

Profile includes:

```text
Name
Photo
Bio
Campus
Chapter
Skills
Projects
Contributions
Achievements
Social links
Current Build
```

Primary identity:

```text
BUILDER
AI / FULLSTACK
INIT MEMBER
```

The profile should make it immediately obvious:

> **Who is this person and what do they build?**

---

# 12. BUILDS

Builds are the core proof of INIT.

A build can be:

* software
* AI project
* startup
* research project
* open-source project
* hardware project
* creative technology project

Each project contains:

```text
Name
Description
Cover
Builders
Technologies
Status
Links
Created date
```

Statuses:

```text
IDEA
BUILDING
BETA
SHIPPED
OPEN SOURCE
```

Users should be able to:

```text
Create Build
Join Build
Update Build
Share Build
```

---

# 13. COLLABORATION

Future build collaboration should allow users to find people for a project.

Example:

```text
PROJECT:
AI Campus Assistant

LOOKING FOR:
Frontend Developer
ML Engineer
Designer
```

Builders can express interest.

This turns INIT from a social network into a **builder network**.

---

# 14. EVENTS

INIT needs an event system.

Event types:

```text
Build Nights
Workshops
Hackathons
Demo Days
Open Source Sprints
Chapter Events
Talks
Labs
```

Event information:

```text
Title
Date
Time
Location
Host
Chapter
Description
Participants
Registration
Status
```

Statuses:

```text
UPCOMING
LIVE
COMPLETED
```

Users should be able to:

```text
View Event
Register
Attend
View Participants
```

---

# 15. CHAPTERS

Chapters allow INIT to expand across campuses.

Each chapter contains:

```text
Campus
Chapter Name
Chapter Lead
Core Team
Members
Projects
Events
Activity
```

Chapter dashboard should eventually provide:

```text
Member count
Active projects
Upcoming events
Recent activity
Growth
```

Chapter Leads should be able to:

* create events
* manage members
* feature projects
* publish updates
* recruit builders

---

# 16. OPPORTUNITIES

Create a centralized opportunity feed.

Categories:

```text
Hackathons
Internships
Open Source
Fellowships
Competitions
Ambassador Programs
Startup Opportunities
INIT Roles
```

Each opportunity:

```text
Title
Organization
Type
Deadline
Eligibility
Location
Description
Apply link
```

Users should be able to save opportunities.

---

# 17. ACTIVITY

INIT should feel alive.

Activity feed examples:

```text
A builder shipped a project.

A new chapter launched.

A builder joined a project.

INIT hosted a Build Night.

A project entered BETA.

A new opportunity was posted.
```

Activity can eventually become personalized.

---

# 18. NOTIFICATIONS

Users should receive notifications for meaningful events:

```text
Project invitation
Event reminder
Chapter announcement
Collaboration request
Build update
Opportunity deadline
```

Avoid notification spam.

---

# 19. SEARCH

Global search should eventually search:

```text
Builders
Projects
Events
Chapters
Opportunities
```

Search should be fast and keyboard-friendly.

---

# 20. CORE TEAM / ADMIN

INIT operators need an administrative layer.

Admin capabilities eventually include:

```text
Users
Builders
Projects
Events
Chapters
Opportunities
Applications
Content
Analytics
```

Permissions should be role-based.

Possible roles:

```text
ADMIN
CORE TEAM
CHAPTER LEAD
BUILDER
```

---

# 21. FUTURE PRODUCT FEATURES

After the MVP:

### Collaboration

```text
Project teams
Tasks
Roles
Invitations
Messaging
```

### Community

```text
Discussions
Channels
Announcements
Direct messaging
```

### Chapter management

```text
Applications
Recruitment
Chapter analytics
Event management
Member management
```

### Builder reputation

Potential signals:

```text
Projects shipped
Open-source contributions
Events attended
Projects contributed to
Leadership
```

Avoid turning INIT into a shallow points/badge system.

---

# 22. USER JOURNEY

A typical user journey:

```text
LANDING PAGE
↓
Discover INIT
↓
Join
↓
Create Profile
↓
Select Skills / Interests
↓
Discover Builders
↓
Discover Projects
↓
Join a Build
↓
Attend Event
↓
Build Something
↓
Ship
↓
Showcase
↓
Connect with More Builders
↓
Lead / Start Chapter
```

The system should reinforce this loop.

---

# 23. SUCCESS METRICS

Don't optimize only for registered users.

Track:

### Activation

* profile completion
* first connection
* first event registration
* first project interaction

### Building

* projects created
* projects joined
* projects shipped
* active builders

### Community

* active builders
* returning users
* collaborations
* events attended

### Network

* active chapters
* chapter growth
* cross-campus collaborations

### Long-term

**Most important metric:**

> **Builders who actually ship something through INIT.**

---

# 24. TECHNICAL PRINCIPLES

Frontend:

```text
React
Vite
TypeScript
Tailwind CSS
Framer Motion
GSAP
React Router
```

Use:

* typed models
* reusable components
* centralized data
* service/API abstraction
* responsive design
* accessible components

The frontend should be backend-ready.

Avoid coupling UI components directly to mock data.

---

# 25. COMPONENT PRINCIPLES

Reuse:

```text
Cards
Buttons
Pills
Typography
Borders
Modals
Navigation
Tabs
Inputs
Avatars
Status indicators
```

Use the existing INIT visual language.

New components should extend the system rather than create new styles.

---

# 26. NON-GOALS

INIT is not intended to become:

* a generic social media platform
* a college ERP
* a course platform
* a job board
* a Discord replacement
* a generic project-management tool
* a resume builder

INIT's center of gravity remains:

> **People + Projects + Opportunities + Chapters**

---

# 27. MVP PRIORITY

### P0 — Required

```text
Authentication
Profile
Dashboard
Network
Builds
Events
```

### P1 — Next

```text
Chapters
Opportunities
Notifications
Search
```

### P2 — Later

```text
Messaging
Collaboration tools
Advanced chapter management
Analytics
Reputation
```

---

# 28. PRODUCT NORTH STAR

INIT should become the place where a student goes when they think:

> **“I want to build something.”**

They should be able to immediately find:

```text
PEOPLE
who can build with me

PROJECTS
I can contribute to

EVENTS
where I can meet builders

OPPORTUNITIES
I can pursue

CHAPTERS
I can join or create
```

And eventually:

> **INIT becomes the network that turns ambitious students into active builders.**

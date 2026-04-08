# eTutor4Me — Developer Guide

> **Audience:** Developers onboarding to the eTutor4Me codebase.
> **Last updated:** March 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Environment Setup](#4-environment-setup)
5. [Authentication System](#5-authentication-system)
6. [User Roles & Permissions](#6-user-roles--permissions)
7. [Database Models](#7-database-models)
8. [API Routes Reference](#8-api-routes-reference)
9. [Page Routes](#9-page-routes)
10. [Real-time System (Socket.IO)](#10-real-time-system-socketio)
11. [Payment & Subscriptions](#11-payment--subscriptions)
12. [File Storage (AWS S3)](#12-file-storage-aws-s3)
13. [Video Conferencing](#13-video-conferencing)
14. [Email System](#14-email-system)
15. [Admin Panel](#15-admin-panel)
16. [Middleware & Route Protection](#16-middleware--route-protection)
17. [Third-Party Integrations](#17-third-party-integrations)
18. [Known Technical Debt & Security Notes](#18-known-technical-debt--security-notes)

---

## 1. Project Overview

**eTutor4Me** is a full-stack online tutoring marketplace. It connects **students** (and their **parents**) with **tutors (ETutors)** for 1-on-1 or group sessions.

### Core capabilities

- Multi-role user system: Student, Parent, Teacher, Admin
- Session booking with calendar availability
- Real-time messaging and notifications
- Stripe-based subscription plans and one-off payments
- Zoom and Google Meet integration for video sessions
- Teacher qualification approval workflow
- Admin analytics and platform management

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4, Emotion (CSS-in-JS) |
| UI Components | Radix UI, Shadcn/ui |
| Database | MongoDB (Atlas) via Mongoose ODM |
| Authentication | next-auth v4 (JWT strategy) |
| Real-time | Socket.IO 4.8 (separate Node server) |
| Payments | Stripe 17 |
| File Storage | AWS S3 |
| Email | Nodemailer + Azure SMTP |
| Video | Zoom SDK, Google Meet API |
| Validation | Zod |
| HTTP Client | Axios |
| Date Utilities | date-fns, moment.js |
| Charts | Recharts, Chart.js |
| Calendar UI | react-big-calendar |
| Analytics | Google Analytics 4 |
| Security | Fingerprint Pro (device fingerprinting) |

---

## 3. Repository Structure

```
/
├── src/
│   ├── app/
│   │   ├── api/                  # All API route handlers (Next.js Route Handlers)
│   │   │   ├── auth/             # NextAuth + signup/login endpoints
│   │   │   ├── admin/            # Admin-only APIs
│   │   │   ├── booking/          # Session booking APIs
│   │   │   ├── message/          # Chat messaging APIs
│   │   │   ├── notifications/    # Notification APIs
│   │   │   ├── contact-support/  # Support ticket APIs
│   │   │   ├── Teacher-Apis/     # Teacher profile APIs
│   │   │   ├── parentapis/       # Parent profile APIs
│   │   │   ├── parent-Student-Relationship/  # Parent-student linking
│   │   │   ├── parentdashboard/  # Parent booking from dashboard
│   │   │   ├── zoomapi/          # Zoom integration endpoints
│   │   │   ├── webhook/          # Stripe + Zoom webhooks
│   │   │   └── models/           # All Mongoose models (co-located with API)
│   │   ├── admin/                # Admin dashboard UI pages
│   │   ├── etutor/               # Teacher dashboard UI pages
│   │   ├── parent/               # Parent dashboard UI pages
│   │   ├── studentdashboard/     # Student dashboard UI pages
│   │   ├── signin/               # Sign-in page
│   │   ├── SignupAs/             # Role selection page
│   │   ├── StudentSignup/        # Student registration
│   │   ├── ETutorSignup/         # Teacher registration (multi-step)
│   │   ├── ParentSignup/         # Parent registration
│   │   ├── ETutorSearch/         # Tutor search/discovery
│   │   ├── booksession/          # Session booking flow
│   │   ├── for-etutor/           # Tutor marketing page
│   │   ├── forgot-password/      # Password recovery
│   │   ├── reset-password/       # Password reset
│   │   ├── verify/               # Email verification
│   │   ├── verifystudent/        # Student email verification
│   │   ├── Faqs/                 # FAQ page
│   │   ├── Packages/             # Pricing page
│   │   └── ComingSoon/           # Early access landing
│   ├── components/
│   │   ├── ui/                   # Shadcn/Radix base components
│   │   ├── auth/                 # Auth-related components
│   │   └── Navbar/               # Navigation components
│   ├── lib/                      # DB connection, utility libs
│   ├── utils/                    # Helper functions
│   ├── hooks/                    # Custom React hooks
│   ├── data/                     # Static data files
│   ├── types/                    # TypeScript type definitions
│   ├── styles.css                # Global CSS
│   └── middleware.ts             # Next.js middleware (route protection)
├── server/
│   ├── server.js                 # Socket.IO WebSocket server (port 5000)
│   ├── helpers.js                # DB helper functions for WebSocket server
│   └── package.json             # Server-specific dependencies
├── public/                       # Static assets (images, icons, etc.)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Root dependencies
```

### Important co-location note

All Mongoose **models** live in `src/app/api/models/`. They are imported directly by the API route handlers that need them.

---

## 4. Environment Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)
- Stripe account
- AWS S3 bucket
- Google OAuth credentials
- Zoom developer account

### Running locally

```bash
# Install dependencies
npm install

# Run the Next.js dev server
npm run dev        # http://localhost:3000

# Run the Socket.IO server (separate terminal)
cd server && npm install && node server.js   # http://localhost:5000
```

### Required environment variables

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | NextAuth session secret |
| `NEXTAUTH_URL` | App base URL (e.g. http://localhost:3000) |
| `JWT_SECRET` | JWT signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `AWS_REGION` | S3 bucket region |
| `AWS_S3_BUCKET_NAME` | S3 bucket name |
| `ZOOM_CLIENT_ID` | Zoom OAuth app client ID |
| `ZOOM_CLIENT_SECRET` | Zoom OAuth app client secret |
| `ZOOM_ACCOUNT_ID` | Zoom account ID |
| `ZOOM_WEBHOOK_SECRET_TOKEN` | Zoom webhook verification |
| `AZURE_TENANT_ID` | Azure AD tenant for email |
| `AZURE_CLIENT_ID` | Azure AD client ID |
| `AZURE_CLIENT_SECRET` | Azure AD client secret |
| `GA4_PROPERTY_ID` | Google Analytics property |

---

## 5. Authentication System

### Overview

Authentication is handled by **next-auth v4** using the JWT strategy. Sessions last up to 30 days.

**Config location:** `src/app/auth/auth.ts`
**NextAuth handler:** `src/app/api/auth/[...nextauth]/route.ts`

### Providers

#### 1. Google OAuth

- Triggers on first sign-in to auto-create a User record with `role: 'student'`
- Maps Google profile to internal user fields

#### 2. Credentials (email + password)

- Accepts: `email`, `password`, `role` (`student` | `teacher` | `parent` | `admin`)
- Admin authentication checks against the `Admin` collection first, then falls back to a hardcoded account (see [Section 18](#18-known-technical-debt--security-notes))
- Non-admin users must have a verified email; unverified users receive a re-verification email
- Passwords compared with `bcryptjs.compare()`

### JWT callbacks

```
signIn  → handles Google first-time signup, links Google profile to User record
jwt     → stores { role, id, accessToken } in the token
session → exposes { role, id } to client via useSession()
redirect → post-login redirect logic
```

### Access token

A short-lived JWT access token (1-hour expiry) is generated on login and stored in the session as `session.accessToken`. It is used to authenticate requests to protected API routes.

### Signup flows

#### Student signup (`POST /api/auth/signup`)
1. Validate email uniqueness
2. Hash password with bcryptjs
3. Create `User` record (`role: 'student'`)
4. Create `Student` record with profile data
5. Send verification email with JWT token
6. If `referralCode` provided → award 5 etokis to referrer

#### Parent signup (`POST /api/auth/signup/parent`)
1. Create `User` record (`role: 'parent'`)
2. Create `Parent` record with parent + child info
3. Send verification email

#### Teacher signup (`POST /api/auth/signup/teacher`)
1. Create `User` record (`role: 'teacher'`)
2. Create `Teacher` record with education + experience info
3. Send verification email
4. Teacher account requires admin qualification approval before full activation

### Email verification

- `GET /api/auth/verify?token=<jwt>` — validates token, sets `user.verified = true`
- `GET /api/auth/forgotpassword` — sends password reset email
- `POST /api/auth/resetpassword` — accepts new password + reset token

---

## 6. User Roles & Permissions

| Role | Dashboard Route | Description |
|------|----------------|-------------|
| `student` | `/studentdashboard` | Books sessions, views tutors, manages membership |
| `teacher` | `/etutor` | Manages availability, tracks earnings, accepts bookings |
| `parent` | `/parent` | Monitors child's sessions, books on behalf of student |
| `admin` | `/admin` | Full platform management |
| `assistant_admin` | `/admin` | Subset of admin features based on permission flags |

### Role enforcement

- **Server-side (middleware):** Only `/admin/*` routes are hard-enforced via JWT role check
- **Client-side:** Dashboard pages check `useSession().data.role` and redirect if mismatched
- Role-based API access is enforced ad-hoc per route (no shared middleware for non-admin roles)

### Parent–Student relationship

Parents link to student accounts via an invite/verification code flow:
- Parent sends link request → Student accepts → `ParentStudentRelation` record created
- Parents can switch between linked student accounts
- Relevant APIs: `POST /api/parent-Student-Relationship/parent-side-api/Link`

---

## 7. Database Models

All models are in `src/app/api/models/`.

### User

The central model. Every person on the platform has a User record.

| Field | Type | Notes |
|-------|------|-------|
| `email` | String | Unique, required |
| `password` | String | bcrypt hash |
| `role` | String | `student` \| `teacher` \| `parent` |
| `verified` | Boolean | Email verification status |
| `verification_token` | String | Email verification JWT |
| `referralCode` | String | Auto-generated unique code |
| `referredBy` | String | Referral code used at signup |
| `etokis` | Number | Platform virtual currency (default: 0) |
| `profilePicture` | String | S3 URL |
| `trialSessions` | Array | Teacher IDs used for trials |
| `TrialSessionLeft` | Number | Remaining free trials (default: 2) |
| `stripeSubscriptionId` | String | Active Stripe subscription |
| `planType` | Object | Subscription plan details |
| `tutorLevel` | String | Matched tutor level for plan |
| `subscriptionIsActive` | Boolean | Subscription active flag |
| `subscriptionDateStart/End` | String | Subscription period |
| `sessionsPerMonth` | Number | Sessions included in plan |
| `stripeMonthlyPrice` | Number | Monthly price in cents |

### Teacher

Extends User with tutor-specific data.

| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId → User | Required |
| `contactInformation` | Object | Name, country, phone, city, zip |
| `education` | Object | College, degree, major, graduation year |
| `experience` | Object | Subjects, languages, levels, availability hours |
| `bankDetails` | Object | IBAN, BIC, account holder |
| `VideoIntroduction` | String | S3/URL to intro video |
| `aboutyou` | String | Bio text |
| `timeZone` | String | Teacher's timezone |
| `isApproved` | Boolean | Admin qualification approval (default: true) |
| `level` | Number | Platform level 1–3 (default: 1) |
| `badge` | String | Badge image URL |
| `taxCountry` | String | Country for tax purposes |
| `EarnedThisMonth` | Number | Monthly earnings |
| `EarnedLastMonth` | Number | Previous month earnings |
| `TotalEarning` | Number | Lifetime earnings |
| `TotalRegularSession` | Number | All-time regular sessions |
| `TotalGroupSession` | Number | All-time group sessions |
| `acceptsTrialSession` | Boolean | Opt-in for free trials |

### Student

| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId → User | Required |
| `firstName`, `lastName` | String | |
| `levelOfStudy` | String | Education level |
| `grade` | String | Current grade |
| `subjects` | Array | Subjects needing help |
| `personalInformation` | Object | Country, city, institution, age |
| `phoneNumber` | String | |

### Parent

| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId → User | Required |
| `firstName`, `lastName` | String | |
| `childInformation` | Object | Child's name, age, school, location |
| `parentPersonalInformation` | Object | Parent's address |
| `subjectChildNeeds` | Array | Subjects for child |
| `levelOfStudy` | String | Child's education level |
| `phoneNumber` | String | |

### Booking

| Field | Type | Notes |
|-------|------|-------|
| `student` | ObjectId → User | Required |
| `teacher` | ObjectId → Teacher | Required |
| `subjects` | Array | Required |
| `level` | String | Required |
| `date` | Date | Session date |
| `time` | String | Session time |
| `timeZone` | String | |
| `status` | Enum | `pending` \| `accepted` \| `rejected` |
| `meetingCompleted` | Boolean | |
| `IsTrialSession` | Boolean | |
| `isGroupBooking` | Boolean | |
| `duration` | String | Default: `60 min` |
| `startLink` | String | Host meeting link |
| `joinLink` | String | Participant link |
| `StudentNote` | String | Notes from student |
| `zoomMeetingData` | Object | Full Zoom meeting object |

### Message / Conversation

**Conversation:** Links two User participants, tracks last message.
**Message:** Individual chat message within a conversation.

| Message Field | Type | Notes |
|--------------|------|-------|
| `senderId` | ObjectId → User | |
| `recipientId` | ObjectId → User | |
| `conversationId` | ObjectId → Conversation | |
| `content` | String | Text content |
| `fileUrl` | String | S3 URL for attachments |
| `fileType` | String | MIME type |
| `fileName` | String | |
| `status` | Enum | `sent` \| `delivered` \| `read` |
| `timestamp` | Date | |

### Notification

| Field | Type | Notes |
|-------|------|-------|
| `recipient` | ObjectId → User | |
| `sender` | ObjectId → User | |
| `type` | Enum | `NEW_MESSAGE` \| `SESSION_CANCELLED` \| `SESSION_CREATED` \| `GENERAL_ALERT` |
| `title` | String | |
| `message` | String | |
| `link` | String | Deep link URL |
| `isRead` | Boolean | Default: false |

### Ticket (Support)

| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | |
| `topic` | String | Ticket subject |
| `additionalComments` | String | |
| `status` | Enum | `active` \| `awaiting` \| `resolved` \| `closed` \| `escalated` |
| `assignedTo` | String | Admin assignee |
| `isResponded` | Boolean | |
| `adminNote` | String | Internal note |

### TrialSession

| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId → User | Student |
| `teacher` | ObjectId → Teacher | |
| `date` | Date | Default: now |

Records which students have used trial sessions with which teachers. Students start with 2 free trials (`TrialSessionLeft` on User).

### PriceManagement (Subscription Plans)

| Field | Type | Notes |
|-------|------|-------|
| `planType` | Enum | `standard` \| `premium` \| `payasyougo` \| `bundles` |
| `tutorLevel` | Enum | `Junior` \| `Senior` \| `Expert` |
| `priceId` | String | Stripe Price ID |
| `priceAmount` | Number | Amount in cents |
| `currency` | String | Default: `usd` |
| `discount` | Object | type, value, couponId |

### Other Models (summary)

| Model | Purpose |
|-------|---------|
| `Admin` | Admin user accounts |
| `AssistantAdmin` | Sub-admin accounts with permission flags |
| `ParentStudentRelation` | Parent↔Student link records |
| `Request` | Teacher→Student session requests |
| `Session` | Alternative session model (parent-initiated) |
| `GroupBooking` | Groups multiple booking IDs together |
| `PauseTutoring` | Records when a tutor has paused their account |
| `Resignation` | Teacher resignation requests |
| `TutorDocument` | Uploaded qualification documents |
| `ContactUs` | Contact form submissions |
| `Reaction` | Message emoji reactions |
| `MessageStatus` | Per-user message delivery tracking |
| `TotalIncome` | Platform-level income tracking |
| `TeacherEtokies` | Etokis transaction log for teachers |

---

## 8. API Routes Reference

All routes are under `src/app/api/`. Routes follow Next.js App Router conventions (`route.ts` files).

### Authentication

| Method | Route | Description |
|--------|-------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |
| POST | `/api/auth/signup` | Student registration |
| POST | `/api/auth/signup/parent` | Parent registration |
| POST | `/api/auth/signup/teacher` | Teacher registration |
| GET | `/api/auth/verify` | Email verification via token |
| POST | `/api/auth/forgotpassword` | Send password reset email |
| POST | `/api/auth/resetpassword` | Complete password reset |

### Bookings

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/booking` | Create new booking |
| GET | `/api/booking/all` | Fetch all bookings |
| GET | `/api/booking/get-by-id` | Fetch single booking by ID |
| GET | `/api/booking/AvailableCheck` | Check teacher availability |
| POST | `/api/booking/trial` | Create trial session |
| PUT | `/api/booking/update` | Update booking status |
| GET | `/api/booking/in-groups` | Fetch group bookings |
| POST | `/api/updatebooking` | Legacy booking update |
| POST | `/api/delete-bookings` | Delete bookings |
| POST | `/api/update-booking-status` | Update booking status (alt) |
| POST | `/api/update-trialsession-status` | Update trial status |
| POST | `/api/updateTrialsessions` | Bulk update trial sessions |

### Admin

| Method | Route | Description |
|--------|-------|-------------|
| GET/POST | `/api/admin` | Fetch/create admin |
| POST | `/api/admin/auth` | Admin login |
| GET | `/api/admin/fetch-user` | Fetch user by ID |
| GET | `/api/admin/fetch-students` | All students |
| GET | `/api/admin/fetch-etutor` | All teachers |
| GET | `/api/admin/fetch-parent` | All parents |
| GET | `/api/admin/fetch-bookings` | All bookings |
| GET | `/api/admin/fetch-tickets` | All support tickets |
| GET | `/api/admin/fetch-qualificationApprovals` | Pending approvals |
| GET | `/api/admin/get-packages` | Subscription packages |
| GET | `/api/admin/get-all-plans` | All pricing plans |
| PUT | `/api/admin/update-price` | Update plan pricing |
| POST | `/api/admin/approve` | Approve teacher qualification |
| POST | `/api/admin/pause-tutoring` | Pause tutor account |
| POST | `/api/admin/resign-tutoring` | Process resignation |
| GET | `/api/admin/Totalincome` | Platform total income |
| GET/POST | `/api/admin/assistant` | Assistant admin management |
| POST | `/api/admin/assistant/add` | Add assistant admin |
| PUT | `/api/admin/assistant/status` | Update status |
| PUT | `/api/admin/assistant/password` | Change password |
| PUT | `/api/admin/assistant/permissions` | Update permissions |

### Messages & Conversations

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/message` | Send message |
| GET | `/api/message/conversation` | Get conversation history |
| POST | `/api/message/uploadtos3` | Upload file attachment to S3 |
| GET | `/api/recipient/messages` | Fetch messages for recipient |

### Notifications

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/notifications/add` | Create notification |
| GET | `/api/notifications/by-recipient-id` | Get user's notifications |
| PUT | `/api/notifications/status` | Mark notification as read |

### Support Tickets

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/contact-support/create-ticket` | Create support ticket |
| GET | `/api/contact-support/fetch-ticket` | Fetch single ticket |
| GET | `/api/contact-support/fetch-all-tickets` | All tickets (admin) |
| POST | `/api/contact-support/messages` | Add message to ticket |
| GET | `/api/contact-support/messages/[ticketId]` | Get ticket messages |
| POST | `/api/contact-support/submit-form-to-admin` | Submit contact form |
| PUT | `/api/contact-support/close` | Close ticket |

### Teachers

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/fetchteachers` | Fetch all teachers (public) |
| GET | `/api/getTeacherId` | Get Teacher doc ID by User ID |
| GET | `/api/Teacher-Apis/teacher-data` | Current teacher profile |
| GET | `/api/Teacher-Apis/Fetch-Teacher-usingID` | Teacher by ID |
| PUT | `/api/Teacher-Apis/Update-Teacher-Data` | Update teacher profile |
| GET | `/api/EtutorEarning` | Teacher earnings |
| POST | `/api/UpdateEtokies` | Update etokis balance |
| GET | `/api/check-subject-approval` | Check teaching approval |

### Students

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/update-student-data` | Update student profile |
| POST | `/api/impersonate-student` | Admin impersonates student |

### Parents

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/parentapis/fetch-parent-data` | Fetch parent profile |
| PUT | `/api/parentapis/update-parent` | Update parent profile |
| POST | `/api/parentdashboard/bookasession` | Parent books a session |
| GET | `/api/parentdashboard/bookasession/search` | Search tutors |
| GET | `/api/parentdashboard/bookasession/sort` | Sort tutor results |

### Parent–Student Relationship

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/parent-Student-Relationship/parent-side-api/Fetch-Students` | Parent's linked students |
| POST | `/api/parent-Student-Relationship/parent-side-api/Send-Request-to-Student` | Send link request |
| GET | `/api/parent-Student-Relationship/parent-side-api/fetchAcceptedRequests` | Accepted links |
| GET | `/api/parent-Student-Relationship/parent-side-api/search-students` | Search students to link |
| POST | `/api/parent-Student-Relationship/parent-side-api/Link` | Link parent to student |
| POST | `/api/parent-Student-Relationship/parent-side-api/verify` | Verify link code |
| POST | `/api/parent-Student-Relationship/parent-side-api/switchAccount` | Switch active student |
| GET | `/api/parent-Student-Relationship/Student-Side-api/fetchRequestsFromParent` | Student's parent requests |
| PUT | `/api/parent-Student-Relationship/Student-Side-api/Update-request-status` | Accept/reject link |
| GET | `/api/parent-Student-Relationship/Student-Side-api/get-parent` | Get linked parent |

### User Management

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/Fetch-all-users` | All users (admin) |
| GET | `/api/CheckUserExistance` | Check if email exists |
| PUT | `/api/UpdateUser` | Update user fields |
| PUT | `/api/update-email` | Change email |
| PUT | `/api/update-password` | Change password |
| PUT | `/api/update-phone-number` | Change phone |
| GET | `/api/first-name` | Get first name by user ID |
| POST | `/api/profile-picture` | Upload profile picture |

### Requests (Teacher→Student)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/Request-from-teacher-to-user` | Teacher sends session request |
| POST | `/api/Teacher-Request` | Alternate teacher request |
| GET | `/api/fetch-send-requests` | Sent requests |
| GET | `/api/Fetch-sendingrequests-fromteacher` | Teacher's sent requests |
| GET | `/api/get-incoming-requests-from-student` | Incoming student requests |
| GET | `/api/Fetch-students&parent` | Fetch students and parents |

### Pause & Resignation

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/pause-tutoring` | Pause tutor account |
| GET | `/api/pause-tutoring/status` | Check pause status |
| DELETE | `/api/pause-tutoring/delete` | Remove pause |
| POST | `/api/resignation` | Submit resignation |
| DELETE | `/api/resignation/delete` | Cancel resignation |

### Subscriptions & Payments

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/create-checkout-session` | Create Stripe checkout |
| POST | `/api/redeem` | Redeem coupon/referral code |
| POST | `/api/refer` | Generate referral link |
| POST | `/api/webhook` | Stripe webhook receiver |

### Qualifications

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/qualification-approval` | Submit qualification for review |
| POST | `/api/qualificationDoc` | Upload qualification document |
| GET | `/api/tutor-document/[id]` | Fetch tutor document |

### Zoom

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/zoomapi` | Zoom API proxy |
| POST | `/api/zoomapi/zoomwebhook` | Zoom webhook handler |

### Analytics & Utilities

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/analytics` | Platform analytics data |
| GET | `/api/pageInsightSpeed` | Google PageSpeed data |
| GET | `/api/tax-country` | Tax country info |
| GET | `/api/connection` | DB connection test |
| GET | `/api/hello` | Health check |
| GET | `/api/sitemap` | Dynamic sitemap |

---

## 9. Page Routes

All pages are in `src/app/`. These are React Server Components (or use `"use client"` where needed).

### Public / Marketing

| Route | File | Description |
|-------|------|-------------|
| `/` | `page.tsx` | Homepage — hero, how it works, meet tutors, pricing, FAQ, contact |
| `/for-etutor` | `for-etutor/page.tsx` | Tutor recruitment marketing page |
| `/Faqs` | `Faqs/page.tsx` | Frequently asked questions |
| `/Packages` | `Packages/page.tsx` | Subscription plans and pricing |
| `/ComingSoon` | `ComingSoon/page.tsx` | Early access landing page |

### Authentication

| Route | File | Description |
|-------|------|-------------|
| `/signin` | `signin/page.tsx` | Login for all roles |
| `/SignupAs` | `SignupAs/page.tsx` | Role selection before signup |
| `/StudentSignup` | `StudentSignup/page.tsx` | Student registration form |
| `/ETutorSignup` | `ETutorSignup/page.tsx` | Multi-step teacher registration |
| `/ParentSignup` | `ParentSignup/page.tsx` | Parent registration form |
| `/forgot-password` | `forgot-password/page.tsx` | Password recovery |
| `/reset-password` | `reset-password/page.tsx` | Password reset with token |
| `/verify` | `verify/page.tsx` | Email verification |
| `/verifystudent` | `verifystudent/page.tsx` | Student-specific email verification |

### Student Dashboard (`/studentdashboard`)

| Component shown | Feature |
|----------------|---------|
| Calendar | View upcoming sessions on a calendar |
| Sessions | List of booked sessions |
| FindEtutor | Browse and search tutors |
| MyEtutor | Saved/favourite tutors |
| MyMembership | Current plan, upgrade options |
| ReferYourFriends | Referral code and etokis tracking |
| Activity | Session history and activity log |
| ContactSupport | Support ticket creation |
| Settings | Profile, password, email updates |
| UsefulLinks | Resource links |

### Teacher Dashboard (`/etutor`)

| Component shown | Feature |
|----------------|---------|
| Calendar | Availability and session calendar |
| Sessions | Upcoming and past sessions |
| Earnings | Monthly/total earnings, etokis balance |
| Activity | Session activity, level/badge progress |
| ContactSupport | Support ticket creation |
| Settings | Profile, bank details, qualification docs |

### Parent Dashboard (`/parent`)

> Note: parent dashboard is partially commented out in the codebase.

| Component shown | Feature |
|----------------|---------|
| Linked students | Switch between linked student accounts |
| Book a session | Book sessions on behalf of child |
| Session calendar | View child's sessions |

### Admin Panel (`/admin`)

| Route | Description |
|-------|-------------|
| `/admin` | Main dashboard — stats overview |
| `/admin/signin` | Admin-only login |
| Users section | View/manage students, teachers, parents |
| Bookings section | View all platform bookings |
| Qualification approvals | Review and approve teacher docs |
| Tickets section | Manage support tickets |
| Price management | Update Stripe pricing plans |
| Analytics | Platform income, session stats |
| Assistant admins | Manage sub-admin accounts |

### Tutor Discovery

| Route | Description |
|-------|-------------|
| `/ETutorSearch` | Search tutors with filters (subject, level, availability) |
| `/booksession` | Session booking flow |

---

## 10. Real-time System (Socket.IO)

The Socket.IO server runs as a **separate Node.js process** in `server/server.js` on **port 5000**.

The Next.js app connects to it from the client using `NEXT_PUBLIC_SOCKET_URL` or directly to `http://localhost:5000` in development.

### CORS configuration

```
origin: https://etutor4me.com
methods: ["GET", "POST"]
```

### Socket events

#### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join` | `userId` | Join user's private notification room, loads initial notifications |
| `leave` | `userId` | Leave user's room |
| `joinTicketRoom` | `ticketId` | Join support ticket room for real-time chat |
| `leaveTicketRoom` | `ticketId` | Leave ticket room |
| `ticketMessage` | `{ticketId, senderId, message, timestamp}` | Send message in a support ticket |
| `updateNotificationStatus` | `{notificationId, userId}` | Mark notification as read |
| `chatMessage` | `{recipientId, senderId, content, fileUrl, fileType, fileName, timestamp}` | Send direct chat message |

#### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `user_notifications` | `{notifications, count, unreadCount}` | Initial/updated notification list |
| `user_notifications_error` | Error object | Notification load failure |
| `notificationStatusUpdated` | Updated notifications | Confirmation of read status change |
| `notificationStatusUpdateError` | Error object | Read status update failure |
| `ticketMessage` | Message object | New message in a ticket room |
| `chatMessage` | Message object | New direct chat message |
| `notification` | Notification object | New notification alert |

### Architecture note

Notifications created by API routes (e.g. on booking creation) are saved to MongoDB via `POST /api/notifications/add`. The Socket.IO server then delivers them in real time to connected clients. The server reads from MongoDB directly via the helpers in `server/helpers.js`.

---

## 11. Payment & Subscriptions

### Stripe integration

- **Checkout:** `POST /api/create-checkout-session` creates a Stripe Checkout Session and returns the URL
- **Webhook:** `POST /api/webhook` receives Stripe events (payment success, subscription updates, cancellations) and updates `User.stripeSubscriptionId`, `planType`, `subscriptionIsActive`, etc.
- **Pricing:** Managed in MongoDB via `PriceManagement` model; each plan maps to a Stripe `priceId`

### Plan types

| Plan | Description |
|------|-------------|
| `standard` | Monthly standard plan |
| `premium` | Monthly premium plan |
| `payasyougo` | Pay per session |
| `bundles` | Session bundle packages |

Each plan also has a `tutorLevel` dimension: `Junior` | `Senior` | `Expert`.

### Etokis (virtual currency)

Etokis are the platform's internal virtual currency used for referral rewards.

- **Earning:** 5 etokis awarded to referrer when their code is used at signup
- **Storage:** `User.etokis` (balance), `TeacherEtokies` model (transaction log for teachers)
- **Redeeming:** `POST /api/redeem` — apply coupon or referral code for discount
- **Referral link:** `POST /api/refer` — generates shareable referral link

---

## 12. File Storage (AWS S3)

All file uploads are stored in AWS S3. Uploads are handled via **Multer** with the **multer-s3** storage engine.

### What is stored

| Type | Upload route | Notes |
|------|-------------|-------|
| Profile pictures | `POST /api/profile-picture` | User avatars |
| Chat file attachments | `POST /api/message/uploadtos3` | Images, docs shared in chat |
| Qualification documents | `POST /api/qualificationDoc` | Teacher cert uploads |
| Teacher intro videos | Via teacher profile update | `VideoIntroduction` field |

### Access

S3 URLs are stored directly in MongoDB fields and served publicly. No pre-signed URLs are used for read access.

---

## 13. Video Conferencing

### Zoom

- **Integration point:** `POST /api/zoomapi` proxies requests to Zoom's API using `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, `ZOOM_ACCOUNT_ID`
- **Webhook:** `POST /api/zoomapi/zoomwebhook` handles Zoom events (meeting started/ended, participant joined)
- **Booking data:** `Booking.zoomMeetingData` stores the full Zoom meeting object; `Booking.startLink` is the host link, `Booking.joinLink` is the participant link
- **Webhook verification:** Uses `ZOOM_WEBHOOK_SECRET_TOKEN`

### Google Meet

- **OAuth:** Uses Google APIs with a service account or OAuth flow
- **Meeting creation:** Triggered during booking flow via Google Calendar API
- Configured via `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

---

## 14. Email System

Emails are sent via **Nodemailer** configured with **Azure SMTP** credentials (`AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`).

### When emails are sent

| Trigger | Email content |
|---------|--------------|
| Student/Parent/Teacher signup | Email verification link |
| Forgot password request | Password reset link |
| Booking confirmation | Session details |
| Booking status change | Accepted/rejected notification |
| Admin qualification approval | Approval confirmation to teacher |

---

## 15. Admin Panel

### Access

- URL: `/admin`
- Protected by middleware: requires JWT with `role: 'admin'`
- Login page: `/admin/signin`

### Admin capabilities

| Feature | Description |
|---------|-------------|
| User management | View, search, and manage all students/teachers/parents |
| Booking oversight | View all platform bookings, update statuses |
| Qualification approvals | Review uploaded teacher documents and approve/reject |
| Ticket management | View and respond to support tickets, assign, close |
| Price management | Update Stripe pricing plans for each plan tier and tutor level |
| Analytics | Platform income totals, session counts |
| Impersonation | `POST /api/impersonate-student` — admin can log in as a student |
| Tutor pause/resignation | Trigger or process tutor account pauses and resignations |

### Assistant Admin

Assistant admins are sub-accounts under the main admin. They are stored in the `AssistantAdmin` model with permission flags that control which admin sections they can access. Managed via `/api/admin/assistant/*`.

---

## 16. Middleware & Route Protection

**File:** `src/middleware.ts`

### What is protected

| Route pattern | Protection |
|--------------|------------|
| `/admin/*` (except `/admin/signin` and `/api/*`) | Requires valid JWT with `role: 'admin'`. Redirects to `/admin/signin` if not authorized. |

### What is NOT enforced server-side

- `/etutor/*`, `/studentdashboard/*`, `/parent/*` — these rely on **client-side** session checks within each page component
- The middleware file contains commented-out strict role-based routing that was disabled

### Client-side protection pattern

```tsx
const { data: session, status } = useSession();

useEffect(() => {
  if (status === 'unauthenticated') router.push('/signin');
  if (session?.role !== 'teacher') router.push('/');
}, [session, status]);
```

---

## 17. Third-Party Integrations

| Service | Purpose | Key env vars |
|---------|---------|-------------|
| **Stripe** | Subscription billing, one-off payments, webhooks | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| **Google OAuth** | Social login | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| **Google Meet** | Video sessions via Google Calendar | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| **Zoom** | Video sessions, webhooks | `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, `ZOOM_ACCOUNT_ID` |
| **AWS S3** | File storage (images, docs, videos) | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME` |
| **Azure** | SMTP for transactional emails | `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` |
| **Google Analytics 4** | User analytics | `GA4_PROPERTY_ID` |
| **Fingerprint Pro** | Device fingerprinting for fraud prevention | Configured client-side |
| **Google PageSpeed Insights** | Performance monitoring | Accessed via `/api/pageInsightSpeed` |
| **MongoDB Atlas** | Cloud database | `MONGODB_URI` |

---

## 18. Known Technical Debt & Security Notes

> These are items to be aware of when working on the codebase.

### Security concerns

| Issue | Location | Risk |
|-------|---------|------|
| **Hardcoded admin credentials** | `src/app/auth/auth.ts` — `admin@gmail.com` / `12345678` | Critical — must be removed before any production deployment |
| **TypeScript errors ignored at build** | `next.config.mjs` — `typescript: { ignoreBuildErrors: true }` | Type errors won't fail CI; bugs may go undetected |
| **ESLint ignored at build** | `next.config.mjs` — `eslint: { ignoreDuringBuilds: true }` | Linting issues won't block deployments |
| **Role middleware disabled** | `src/middleware.ts` — teacher/student/parent route guards commented out | Role enforcement is client-side only for non-admin roles |
| **CORS locked to production domain** | `server/server.js` — `origin: 'https://etutor4me.com'` | Socket.IO won't work locally unless changed |

### Technical debt

| Item | Notes |
|------|-------|
| Duplicate endpoints | Both `/api/update-student-data` and `/api/updatestudentdata` exist; `/api/update-booking-status` and `/api/updatebooking` overlap |
| Mixed naming conventions | API folders use inconsistent casing (`Teacher-Apis`, `parentapis`, `zoomapi`) |
| `moment.js` + `date-fns` | Both date libraries are used; standardize on one |
| Mongoose models in `api/models/` | Models are not in a shared lib but are co-located with API routes — import paths can become brittle |
| No API input validation middleware | Zod is available but not consistently applied across all routes |
| Client-side only role protection | Non-admin dashboard routes rely entirely on React `useEffect` redirects |
| Parent dashboard commented out | `/parent/page.tsx` has UI commented out — feature is incomplete |

# DsaTrack

DsaTrack is a DSA problem tracker for recording problems, revising them on schedule, and keeping your progress organized in one place.

## What it does now

- Sign up once with a name and password, then log in later with the same password
- Remember the user name locally so the login screen autofills it next time
- Store problems in the browser using `localStorage`
- Add and edit problems with fields for:
  - problem name
  - platform
  - topic
  - pattern
  - difficulty
  - status
  - solved date
  - mistakes / notes
- Choose a revision interval when adding a problem:
  - 7 days
  - 14 days
  - 1 month
  - no reminder
- Automatically mark a problem for revision when a reminder is set
- Show a revision reminder panel for problems that are due today
- Mark revision as done, which clears the reminder
- Change problem status quickly from the problem card
- Filter by:
  - All
  - Solved
  - Pending
  - Revision
- Search problems by name
- Filter by topic and pattern
- View dashboard stats for total, solved, pending, and revision problems
- Toggle between light and dark mode

## How reminders work

When you select a revision interval, DsaTrack stores a reminder date for that problem. On the due date, the app shows a revision reminder panel at the top of the dashboard.

If you click `Revision Done`, the reminder is cleared and the problem is removed from the reminder list until you set a new revision schedule.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Lucide icons
- Browser `localStorage` for saving data

## Setup

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually `http://localhost:5173`.

## Project Structure

```text
src/
  components/
    AddProblem.jsx
    FilterBar.jsx
    LoginScreen.jsx
    Navbar.jsx
    ProblemCard.jsx
    ProblemList.jsx
    RevisionReminders.jsx
    Stats.jsx
  context/
    AuthContext.jsx
    ProblemContext.jsx
    ThemeContext.jsx
  utils/
    constants.js
    dateHelpers.js
  App.jsx
  main.jsx
  index.css
```

## Future Improvements

These are the next things we can add later:

- Better UI and UX improvements
- Backend API integration
- Real user authentication with database support
- User profiles and multi-user support
- Cloud sync across devices
- Push notifications and browser reminders
- Calendar-based revision planning
- Better analytics and revision history
- Export and import improvements
- Mobile-friendly refinements
- Performance improvements for larger problem lists

## Notes

- Data is currently stored locally in the browser, so clearing browser storage will remove saved problems and login data.
- The app is designed to work offline after it has been loaded once.

# Toy Robot Simulator

## Overview
The Toy Robot Simulator is a web application that simulates a robot moving on a 5×5 tabletop grid. The app follows predefined movement rules and stores the robot’s state in a SQLite database. This project demonstrates clean application architecture, maintainability, and test coverage.

---

## Game Rules
- The tabletop is a **5×5 grid**.
- Coordinates start at **(0,0)** in the **south-west (bottom-left)** corner.
- Valid positions range from **(0,0) to (4,4)**.
- The robot must stay **within table boundaries** at all times.

---

### Robot Placement & Commands
- Click any grid cell to **PLACE** the robot at that **X,Y** location.
- Robot initially faces **NORTH** by default.
- The **first command must be PLACE**.
- Commands are ignored **until a robot is placed**.
- Invalid moves that would cause the robot to fall are **ignored**.

### Available Commands

| Command       | Description |
|---------------|-------------|
| `PLACE X,Y`   | Places the robot at `X,Y`, facing NORTH |
| `MOVE`        | Moves the robot one unit forward |
| `LEFT`/`RIGHT`| Rotates robot 90° without moving |
| `REPORT`      | Logs robot’s `X,Y` position and direction |
| Arrow Buttons | Used in UI to control movement |
| Keyboard Arrows | Optional shortcut controls |

---

## Example
Input
```
PLACE 0,0,NORTH
MOVE
REPORT
```

Output
```
0,1,NORTH
```
---

### Constraints
- Robot cannot leave the grid.
- Clicking outside the grid is ignored.
- Placing a new robot **overwrites** the previous one.
- Data Persistence:
  - Current robot state (position + direction) is stored in **SQLite (via Prisma)**.
  - Robot state is **restored on page reload**.
  - **Movement history** is saved for the current robot.

---

## Assumptions & Design Decisions
- Only **current robot movement history is saved** => Placing a new robot **resets history**.
- Robot's design isn't 100% accurate - in this project was used icon from react library.
- "Left" button moves arrow counter-clockwise and "Right" button moves arrow clockwise.
- Improved user experience and accessibility by addition of "click" sound to all clickable components.
- Considered implementing Context API state management but opted out due to small size of the project and time restrictions.

---

## Future Enhancements (Post-MVP)
### Technical
- Better **state management** (use React Context API)
- Increase test coverage
- **Responsive UI**

### Functional
- Custom robot name & color
- Select robot icon from UI "robot store" displayed left or right from the tabletop 
- Replace default `LEFT/RIGHT/MOVE` buttons with **directional arrows** for better UX
- Display full movement history
- Add grid obstacles
- Support **multiple robots**

---

# Tech Stack

### Frontend
- React + Vite
- TypeScript
- TailwindCSS

### Backend
- Node.js
- NestJS (REST API)

### Database
- SQLite + Prisma ORM

--- 
## Running Locally

## Prerequisites
- Node.js v18+
- pnpm

## Setup

Clone repository:

```bash
git clone <repo-url>
cd nestjs-vite-robot-simulator
```

Enable setup.sh execution:
```
chmod +x setup.sh
```
Run script in the root:
```
./setup.sh
```
App available at: http://localhost:5173


View Database:

```
pnpm prisma studio
```
Opens Prisma Studio at http://localhost:5555

---
## Test Coverage
- Unit Tests Cover\
- Movement logic\
- Grid boundary validation\
- Rotations\
- REST API\
- State restoration\

## Testing Tools
Frontend:	Vitest + React Testing Library\
Backend:	Jest\

## Run Tests
### Frontend tests
```
pnpm run test:ui
```

### Backend tests
```
pnpm run test:api
```

### All tests
```
pnpm test
```

## Manual Testing Checklist

- Click a grid cell → robot appears

- Use Left/Right/Move buttons → robot stays inside grid

- Refresh → robot state persists

- Click another cell → robot repositioned/reset

- Prisma Studio → state/history saved correctly

- Click REPORT → correct output logged


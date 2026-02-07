# Architecture Diagram - Star Zone Salon

This diagram illustrates the high-level architecture of the Star Zone project, showing the flow between the user interface, the backend management, and the data layers.

```mermaid
graph TD
    subgraph "Frontend (Vercel)"
        UI["React + Vite UI"]
        Admin["Admin Management Suite"]
        Tailwind["Tailwind CSS + Framer Motion"]
    end

    subgraph "Backend (Render)"
        API["Node.js + Express API"]
        Auth["JWT Authentication"]
        Logic["Slot & Analytics Logic"]
    end

    subgraph "Data & External"
        DB[("MongoDB Atlas")]
        WA["WhatsApp API (Booking)"]
        Images["External Image Hosting"]
    end

    %% Flow
    UI -- "API Requests (Axios)" --> API
    Admin -- "Protected Routes" --> API
    API -- "Mongoose" --> DB
    UI -- "Structured URL" --> WA
    Logic -- "Aggregation/Tracking" --> DB
    UI -- "Direct Image Load" --> Images

    %% Styles
    style UI fill:#f9f,stroke:#333,stroke-width:2px
    style API fill:#00d2ff,stroke:#333,stroke-width:2px
    style DB fill:#00ed64,stroke:#333,stroke-width:2px
    style WA fill:#25D366,stroke:#fff,stroke-width:2px
```

## System Components

1.  **Frontend (Hosted on Vercel)**:
    *   **React + Vite**: Provides a fast, responsive user experience.
    *   **Context API**: Handles global state (Cart, User Data, Auth).
    *   **Framer Motion**: Powers the premium luxury animations.
2.  **Backend (Hosted on Render)**:
    *   **Express.js**: RESTful API handles all requests.
    *   **JWT**: Secures the Admin Panel routes.
3.  **Database (MongoDB Atlas)**:
    *   **Collections**: Stores Services, Content, Users, Analytics, and Time Slots.
4.  **Integration**:
    *   **WhatsApp**: Instead of a complex email server, we use structured WhatsApp links for high-conversion booking.

import { useEffect, useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const [savedUser, setSavedUser] = useState("");

  // XP & STREAK
  const [totalXP, setTotalXP] = useState(0);
  const [totalStreak, setTotalStreak] = useState(0);

  // AUTO LEVEL SYSTEM
  const level = Math.floor(totalXP / 100) + 1;

  // HABITS
  const [habits, setHabits] = useState([
    {
      title: "Create Design",
      streak: 0,
      icon: "🎨",
      xp: 0,
      category: "Creative",
      completed: false,
    },
    {
      title: "Make Reels",
      streak: 0,
      icon: "🎬",
      xp: 0,
      category: "Content",
      completed: false,
    },
    {
      title: "Post Story",
      streak: 0,
      icon: "📲",
      xp: 0,
      category: "Content",
      completed: false,
    },
    {
      title: "Workout",
      streak: 0,
      icon: "🏋️",
      xp: 0,
      category: "Health",
      completed: false,
    },
    {
      title: "Drink Water",
      streak: 0,
      icon: "💧",
      xp: 0,
      category: "Health",
      completed: false,
    },
    {
      title: "Sleep Before 12",
      streak: 0,
      icon: "😴",
      xp: 0,
      category: "Health",
      completed: false,
    },
  ]);

  // LOAD USER & SAVED DATA
  useEffect(() => {
    const storedUser = localStorage.getItem("habitsakra-user");
    const storedPin = localStorage.getItem("habitsakra-pin");

    if (storedUser && storedPin) {
      setSavedUser(storedUser);
    }

    // LOAD XP
    const savedXP = localStorage.getItem("habitsakra-xp");

    if (savedXP) {
      setTotalXP(Number(savedXP));
    }

    // LOAD STREAK
    const savedStreak = localStorage.getItem(
      "habitsakra-streak"
    );

    if (savedStreak) {
      setTotalStreak(Number(savedStreak));
    }

    // LOAD HABITS
    const savedHabits = localStorage.getItem(
      "habitsakra-habits"
    );

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // AUTO SAVE
  useEffect(() => {
    localStorage.setItem(
      "habitsakra-xp",
      totalXP
    );

    localStorage.setItem(
      "habitsakra-streak",
      totalStreak
    );

    localStorage.setItem(
      "habitsakra-habits",
      JSON.stringify(habits)
    );
  }, [totalXP, totalStreak, habits]);

  // LOGIN
  const handleLogin = () => {
    if (!username || !pin) return;

    const storedUser = localStorage.getItem("habitsakra-user");
    const storedPin = localStorage.getItem("habitsakra-pin");

    // FIRST LOGIN
    if (!storedUser && !storedPin) {
      localStorage.setItem("habitsakra-user", username);
      localStorage.setItem("habitsakra-pin", pin);

      setSavedUser(username);
      setLoggedIn(true);
    }

    // LOGIN EXISTING USER
    else {
      if (username === storedUser && pin === storedPin) {
        setLoggedIn(true);
      } else {
        alert("Wrong Username or PIN");
      }
    }
  };

  // COMPLETE HABIT
  const completeHabit = (index) => {
    const updatedHabits = [...habits];

    if (!updatedHabits[index].completed) {
      updatedHabits[index].completed = true;
      updatedHabits[index].xp += 25;
      updatedHabits[index].streak += 1;

      setTotalXP(totalXP + 25);
      setTotalStreak(totalStreak + 1);

      setHabits(updatedHabits);
    }
  };

  // REALTIME DATE & TIME
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            background: "#151515",
            border: "1px solid #222",
            borderRadius: "30px",
            padding: "35px",
            width: "100%",
            maxWidth: "380px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "42px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            HabitSakra ⚡
          </h1>

          <p
            style={{
              color: "#777",
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            Discipline system for creatives.
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "15px",
              borderRadius: "16px",
              border: "1px solid #222",
              background: "#0f0f0f",
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="4 Digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "20px",
              borderRadius: "16px",
              border: "1px solid #222",
              background: "#0f0f0f",
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "16px",
              border: "none",
              background: "#9FE870",
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ENTER ⚡
          </button>

          {savedUser && (
            <p
              style={{
                color: "#666",
                textAlign: "center",
                marginTop: "20px",
                fontSize: "14px",
              }}
            >
              Existing User: {savedUser}
            </p>
          )}
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "900",
            marginBottom: "10px",
          }}
        >
          Welcome back, {savedUser} ⚡
        </h1>

        <p
          style={{
            color: "#777",
            marginBottom: "20px",
          }}
        >
          Keep your streak alive.
        </p>

        {/* DATE & TIME */}
        <div
          style={{
            display: "inline-flex",
            gap: "15px",
            background: "#151515",
            border: "1px solid #222",
            padding: "14px 20px",
            borderRadius: "18px",
            color: "#9FE870",
            fontWeight: "bold",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>📅 {formattedDate}</span>
          <span>⏰ {formattedTime}</span>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#151515",
            border: "1px solid #222",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2>⚡ {totalXP}</h2>
          <p style={{ color: "#777" }}>Total XP</p>
        </div>

        <div
          style={{
            background: "#151515",
            border: "1px solid #222",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2>🔥 {totalStreak}</h2>
          <p style={{ color: "#777" }}>Total Streak</p>
        </div>

        <div
          style={{
            background: "#151515",
            border: "1px solid #222",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2>🏆 Level {level}</h2>
          <p style={{ color: "#777" }}>Creative Warrior</p>
        </div>
      </div>

      {/* HABITS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {habits.map((habit, index) => (
          <div
            key={index}
            style={{
              background: "#151515",
              border: habit.completed
                ? "1px solid #9FE870"
                : "1px solid #222",
              borderRadius: "24px",
              padding: "20px",
              boxShadow: habit.completed
                ? "0 0 20px rgba(159,232,112,0.3)"
                : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <div>
                <h2 style={{ marginBottom: "10px" }}>
                  {habit.icon} {habit.title}
                </h2>

                <div
                  style={{
                    background: "#222",
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    color: "#9FE870",
                    fontSize: "12px",
                  }}
                >
                  {habit.category}
                </div>
              </div>

              <button
                onClick={() => completeHabit(index)}
                style={{
                  background: habit.completed ? "#333" : "#9FE870",
                  color: habit.completed ? "#777" : "black",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px 16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {habit.completed ? "DONE ✓" : "+25 XP"}
              </button>
            </div>

            <p
              style={{
                color: "#888",
                marginBottom: "15px",
              }}
            >
              🔥 {habit.streak} Day Streak
            </p>

            <div
              style={{
                height: "10px",
                background: "#222",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${habit.xp}%`,
                  height: "100%",
                  background: "#9FE870",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
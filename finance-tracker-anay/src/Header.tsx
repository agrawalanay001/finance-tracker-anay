import React, { useEffect, useState } from "react";
import MonthlyOverview from "./MonthlyOverview";
import SpendingDonut from "./SpendingDonut";

type Transaction = {
  id: number;
  description: string;
  category: string;
  amount: number;
  type: string;
  date: string;
};

const Header = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("myTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("myTransactions", JSON.stringify(transactions));
  }, [transactions]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setForm({
      description: t.description,
      category: t.category,
      amount: t.amount.toString(),
      type: t.type,
    });
  };

  const [form, setForm] = useState({
    description: "",
    category: "FOOD",
    amount: "",
    type: "EXPENSE",
  });

  let totalIncome = 0;
  let totalExpense = 0;
  let food = 0;
  let bills = 0;
  let travel = 0;
  let entertainment = 0;
  let other = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "INCOME") {
      totalIncome += transactions[i].amount;
    } else {
      totalExpense += transactions[i].amount;
      if (transactions[i].category === "FOOD") {
        food += transactions[i].amount;
      } else if (transactions[i].category === "BILLS") {
        bills += transactions[i].amount;
      } else if (transactions[i].category === "TRAVEL") {
        travel += transactions[i].amount;
      } else if (transactions[i].category === "ENTERTAINMENT") {
        entertainment += transactions[i].amount;
      } else {
        other += transactions[i].amount;
      }
    }
  }
  const expenseData = [
    { label: "Food & dining", value: food, color: "#689f38" },
    { label: "Utilities & bills", value: bills, color: "#7986cb" },
    { label: "Travel", value: travel, color: "#f57c00" },
    { label: "Entertainment", value: entertainment, color: "#e64a19" },
    { label: "Other", value: other, color: "#616161" },
  ];
  const balance = totalIncome - totalExpense;

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;

    if (editingId) {
      // UPDATE: Find the ID and swap the data
      setTransactions(
        transactions.map((t) =>
          t.id === editingId
            ? { ...t, ...form, amount: parseFloat(form.amount) }
            : t,
        ),
      );
      setEditingId(null); // Stop editing mode
    } else {
      const newEntry = {
        id: Date.now(),
        description: form.description,
        category: form.category,
        amount: parseFloat(form.amount),
        type: form.type,
        date: new Date().toLocaleDateString(),
      };

      setTransactions([...transactions, newEntry]);
    }
    setForm({ description: "", category: "FOOD", amount: "", type: "EXPENSE" });
  };
  const deleteTrans = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        Finance Tracker
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "#333333",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            fontFamily: "sans-serif",
            height: "120px",
            color: "hsl(0, 0%, 70%)",
          }}
        >
          TOTAL INCOME
          <div
            style={{
              marginTop: "35px",
              fontSize: "40px",
              color: "hsl(120, 44%, 46%)",
            }}
          >
            {totalIncome}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#333333",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            fontFamily: "sans-serif",
            height: "120px",
            color: "hsl(0, 0%, 70%)",
          }}
        >
          TOTAL EXPENSES
          <div
            style={{
              marginTop: "35px",
              fontSize: "40px",
              color: "hsl(0, 54%, 46%)",
            }}
          >
            {totalExpense}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#333333",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            fontFamily: "sans-serif",
            height: "120px",
            color: "hsl(0, 0%, 70%)",
          }}
        >
          NET BALANCE
          <div
            style={{
              marginTop: "35px",
              fontSize: "40px",
              color: balance >= 0 ? "hsl(120, 44%, 46%)" : "hsl(0, 54%, 46%)",
            }}
          >
            {balance}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "#333333",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "sans-serif",
            height: "320px",
            color: "hsl(0, 0%, 70%)",
            paddingLeft: "20px",
          }}
        >
          EXPENSE OVERVIEW
          <MonthlyOverview data={expenseData} />
        </div>
        <div
          style={{
            backgroundColor: "#333333",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "sans-serif",
            height: "320px",
            color: "hsl(0, 0%, 70%)",
            paddingLeft: "20px",
          }}
        >
          EXPENSE BREAKDOWN
          <SpendingDonut data={expenseData} />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#333333",
          padding: "10px",
          borderRadius: "5px",
          fontFamily: "sans-serif",
          minHeight: "240px",
          color: "hsl(0, 0%, 70%)",
          margin: "10px",
          paddingLeft: "20px",
        }}
      >
        TRANSACTION HISTORY
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "5px solid #444444",
          }}
        >
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            DESCRIPTION
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            CATEGORY
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            AMOUNT
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            ACTIONS
          </div>
        </div>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 15px",
              borderBottom: "1px solid #444",
              fontFamily: "sans-serif",
            }}
          >
            {/* 1. Description - Simple and Bold */}
            <div
              style={{
                flex: 1,
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              {transaction.description}
            </div>

            {/* 2. Category Pill - Dynamic Colors based on type */}
            <div style={{ flex: 1 }}>
              <span
                style={{
                  backgroundColor:
                    transaction.type === "INCOME" ? "#e8f5e9" : "#f3e5f5", // Light green or light purple
                  color: transaction.type === "INCOME" ? "#2e7d32" : "#5e35b1", // Darker text for contrast
                  padding: "4px 12px",
                  borderRadius: "15px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {transaction.category}
              </span>
            </div>

            {/* 3. Amount & Actions */}
            <div
              style={{
                flex: 0.87,
              }}
            >
              <span
                style={{
                  color: transaction.type === "INCOME" ? "#81c784" : "#e57373", // Green for +, Red for -
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {transaction.type === "INCOME" ? "+ " : "- "}₹
                {transaction.amount.toLocaleString()}
              </span>
            </div>
            {/* Action Buttons styled like the UI */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => startEdit(transaction)}
                style={{
                  background: "none",
                  border: "1px solid #555",
                  borderRadius: "8px",
                  padding: "6px",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                ✏️
              </button>
              <button
                onClick={(e) => deleteTrans(transaction.id, e)}
                style={{
                  background: "none",
                  border: "1px solid #555",
                  borderRadius: "8px",
                  padding: "6px",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "#333333",
          padding: "20px",
          borderRadius: "5px",
          fontFamily: "sans-serif",
          height: "150px",
          color: "hsl(0, 0%, 70%)",
          paddingLeft: "20px",
          margin: "10px",
          marginTop: "20px",
        }}
      >
        NEW ENTRY
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            DESCRIPTION
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            CATEGORY
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            AMOUNT
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12.5px",
              color: "hsl(0, 0%, 85%)",
              textAlign: "center",
            }}
          >
            TYPE
          </div>
        </div>
        <form action="" onSubmit={addTransaction}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "10px",
              padding: "10px",
            }}
          >
            <input
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              value={form.description}
              type="text"
              placeholder="eg rent payment"
              style={{
                backgroundColor: "#333333",
                color: "white",
                border: "1px solid #555555",
                height: "150%",
                borderRadius: "5px",
              }}
            />
            <select
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form.category}
              name="CATEGORY"
              id=""
              style={{
                backgroundColor: "#333333",
                color: "white",
                border: "1px solid #555555",
                height: "150%",
                borderRadius: "5px",
              }}
            >
              <option value="FOOD">FOOD</option>
              <option value="BILLS">BILLS</option>
              <option value="TRAVEL">TRAVEL</option>
              <option value="ENTERTAINMENT">ENTERTAINMENT</option>
              <option value="OTHER">OTHER</option>
            </select>
            <input
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              value={form.amount}
              type="number"
              placeholder="0"
              style={{
                backgroundColor: "#333333",
                color: "white",
                border: "1px solid #555555",
                height: "150%",
                borderRadius: "5px",
              }}
            />
            <select
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              value={form.type}
              name="EXPENSE"
              id=""
              style={{
                backgroundColor: "#333333",
                color: "white",
                border: "1px solid #555555",
                height: "150%",
                borderRadius: "5px",
              }}
            >
              <option value="EXPENSE">EXPENSE</option>
              <option value="INCOME">INCOME</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              background: "#1a1a18",
              color: "#f5f5f3",
              border: "none",
              borderRadius: "8px",
              padding: "9px 18px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "opacity 0.15s",
              width: "100px",
              marginTop: "20px",
              textAlign: "center",
              marginLeft: "auto",
              display: "block",
              marginRight: "20px",
            }}
          >
            {editingId ? "Save Changes" : "Add Entry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

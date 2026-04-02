import React from "react";

interface ExpenseItem {
  label: string;
  value: number;
  color: string;
}

interface SpendingDonutProps {
  data: ExpenseItem[];
}

const SpendingDonut: React.FC<SpendingDonutProps> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  let cumulativePercentage = 0;
  const gradientSlices = data.map((item) => {
    const start = cumulativePercentage;
    const share = (item.value / (total || 1)) * 100;
    cumulativePercentage += share;
    return `${item.color} ${start}% ${cumulativePercentage}%`;
  });

  const gradientString = gradientSlices.join(", ");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        padding: "10px",
        fontFamily: "sans-serif",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",

          background: `conic-gradient(${gradientString})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "72%",
            height: "72%",
            backgroundColor: "#333333",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <span
            style={{
              color: "hsl(0, 0%, 70%)",
              fontSize: "10px",
              textTransform: "uppercase",
            }}
          >
            Spent
          </span>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            ₹{total >= 1000 ? (total / 1000).toFixed(1) + "k" : total}
          </span>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {data.map((item, i) => {
          const percentage =
            total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                  }}
                />
                <span style={{ color: "hsl(0, 0%, 85%)" }}>{item.label}</span>
              </div>
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "15px",
                }}
              >
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingDonut;

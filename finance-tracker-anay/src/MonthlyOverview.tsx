type ExpenseItem = {
  label: string;
  value: number;
  color: string;
};

const MonthlyOverview = ({ data }: { data: ExpenseItem[] }) => {
  const totalExpense = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <>
      {data.map((item, index) => {
        const percentage = (item.value / (totalExpense || 1)) * 100;

        return (
          <div key={index} style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#b0b0b0", fontSize: "14px" }}>
                {item.label}
              </span>
              <span style={{ fontWeight: "bold" }}>
                ₹{item.value.toLocaleString()}
              </span>
            </div>

            <div
              style={{
                height: "8px",
                backgroundColor: "#121212",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  backgroundColor: item.color,
                  borderRadius: "4px",
                  transition: "width 0.5s ease-out",
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MonthlyOverview;

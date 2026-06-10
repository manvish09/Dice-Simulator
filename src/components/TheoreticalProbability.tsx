// components/TheoreticalProbabilityTable.tsx

interface Props {
  rolls: number[];
}

function TheoreticalProbabilityTable({
  rolls,
}: Props) {
  const total = rolls.length;

  return (
    <table border={1} cellPadding={8}
  style={{
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse",
  }}
>
      <thead>
        <tr>
          <th>Outcome</th>
          <th>Frequency</th>
          <th>Experimental</th>
          <th>Theoretical</th>
        </tr>
      </thead>

      <tbody>
        {[1, 2, 3, 4, 5, 6].map((value) => {
          const frequency = rolls.filter(
            (r) => r === value
          ).length;

          const experimental =
            total > 0
              ? (
                  (frequency / total) *
                  100
                ).toFixed(2)
              : "0.00";

          return (
            <tr key={value}>
              <td>{value}</td>
              <td>{frequency}</td>
              <td>{experimental}%</td>
              <td>16.67%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TheoreticalProbabilityTable;
type Props = {
  rolls: number[];
};

export default function RollTable({ rolls }: Props) {
  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
    >
      <table border={1}
  style={{
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse",
  }}
>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Outcome</th>
          </tr>
        </thead>

        <tbody>
          {rolls.map((roll, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{roll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
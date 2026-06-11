type Props = {
  rolls: number[];
};

export default function FrequencyTable({ rolls }: Props) {
  const frequencies = [1, 2, 3, 4, 5, 6].map((face) => ({
    face,
    count: rolls.filter((roll) => roll === face).length,
  }));

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        border={1}
        style={{
  width: "min(80%, 700px)",
  margin: "0 auto",
  borderCollapse: "collapse",
  textAlign: "center"
}}
      >
        <thead>
          <tr>
            <th>Face</th>
            <th>Frequency</th>
          </tr>
        </thead>

        <tbody>
          {frequencies.map((item) => (
            <tr key={item.face}>
              <td>{item.face}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
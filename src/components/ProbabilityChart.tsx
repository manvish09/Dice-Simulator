type Props = {
  rolls: number[];
};

export default function ProbabilityTable({ rolls }: Props) {
  const totalRolls = rolls.length;

  const data = [1, 2, 3, 4, 5, 6].map((face) => {
    const frequency = rolls.filter(
      (roll) => roll === face
    ).length;

    const probability =
      totalRolls === 0
        ? 0
        : frequency / totalRolls;

    return {
      face,
      frequency,
      probability,
    };
  });

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Face</th>
          <th>Frequency</th>
          <th>Probability</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.face}>
            <td>{item.face}</td>
            <td>{item.frequency}</td>
            <td>
              {item.probability.toFixed(3)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
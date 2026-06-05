export function postsolve(
  solution,
  variableNames
) {

  const result = {};

  variableNames.forEach(
    (name, index) => {

      result[name] =
        Number(
          (
            solution[index] || 0
          ).toFixed(6)
        );
    }
  );

  return result;
}
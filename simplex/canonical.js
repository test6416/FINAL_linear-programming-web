export function toCanonicalForm(problem) {

  const cloned =
    JSON.parse(JSON.stringify(problem));

  if (cloned.type === "max") {

    cloned.type = "min";

    cloned.objective =
      cloned.objective.map(v => -v);
  }

  cloned.constraints =
    cloned.constraints.map(c => {

      const copy = { ...c };

      if (copy.sign === ">=") {

        copy.coefficients =
          copy.coefficients.map(v => -v);

        copy.rhs *= -1;

        copy.sign = "<=";
      }

      if (copy.sign === "=") {

        copy.sign = "<=";
      }

      return copy;
    });

  return cloned;
}
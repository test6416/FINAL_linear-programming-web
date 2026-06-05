export function parseProblem(
  rawProblem
) {

  if (!rawProblem) {

    throw new Error(
      "Không có dữ liệu bài toán."
    );
  }

  if (
    !Array.isArray(
      rawProblem.objective
    )
  ) {

    throw new Error(
      "Hàm mục tiêu không hợp lệ."
    );
  }

  if (
    !Array.isArray(
      rawProblem.constraints
    )
  ) {

    throw new Error(
      "Danh sách ràng buộc không hợp lệ."
    );
  }

  const objective =
    rawProblem.objective.map(
      value => {

        const number =
          Number(value);

        if (
          Number.isNaN(number)
        ) {

          throw new Error(
            "Hệ số hàm mục tiêu phải là số."
          );
        }

        return number;
      }
    );

  const numVars =
    objective.length;

  const constraints =
    rawProblem.constraints.map(
      (
        constraint,
        index
      ) => {

        if (
          !Array.isArray(
            constraint.coefficients
          )
        ) {

          throw new Error(
            `Ràng buộc ${
              index + 1
            } không hợp lệ.`
          );
        }

        if (
          constraint.coefficients
            .length !==
          numVars
        ) {

          throw new Error(
            `Ràng buộc ${
              index + 1
            } có số biến không khớp.`
          );
        }

        const coefficients =
          constraint.coefficients.map(
            value => {

              const number =
                Number(value);

              if (
                Number.isNaN(
                  number
                )
              ) {

                throw new Error(
                  `Hệ số trong ràng buộc ${
                    index + 1
                  } phải là số.`
                );
              }

              return number;
            }
          );

        const rhs =
          Number(
            constraint.rhs
          );

        if (
          Number.isNaN(rhs)
        ) {

          throw new Error(
            `Vế phải của ràng buộc ${
              index + 1
            } không hợp lệ.`
          );
        }

        const sign =
          constraint.sign;

        if (
          sign !== "<=" &&
          sign !== ">=" &&
          sign !== "="
        ) {

          throw new Error(
            `Dấu của ràng buộc ${
              index + 1
            } không hợp lệ.`
          );
        }

        return {

          coefficients,

          sign,

          rhs
        };
      }
    );

  const variableSigns =
    rawProblem.variableSigns ||
    objective.map(
      () => "nneg"
    );

  if (
    variableSigns.length !==
    numVars
  ) {

    throw new Error(
      "Số lượng điều kiện biến không khớp."
    );
  }

  variableSigns.forEach(
    (sign, index) => {

      if (
        sign !== "nneg" &&
        sign !== "npos" &&
        sign !== "free"
      ) {

        throw new Error(
          `Điều kiện của biến x${
            index + 1
          } không hợp lệ.`
        );
      }
    }
  );

  return {

    type:
      (
        rawProblem.type ||
        "max"
      ).toLowerCase(),

    objective,

    constraints,

    variableSigns
  };
}
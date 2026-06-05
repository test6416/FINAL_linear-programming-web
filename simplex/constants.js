export const EPSILON = 1e-9;

export const MAX_ITERATIONS = 1000;

export const BIG_M = 1000000;

export const STATUS = {

  OPTIMAL:
    "Tìm được nghiệm tối ưu.",

  UNBOUNDED:
    "Bài toán không bị chặn.",

  INFEASIBLE:
    "Bài toán vô nghiệm.",

  CYCLING:
    "Phát hiện hiện tượng xoay vòng.",

  DEGENERATE:
    "Phương án cơ sở suy biến."
};

export const METHODS = {

  PRIMAL:
    "primal",

  DUAL:
    "dual",

  TWO_PHASE:
    "twoPhase",

  BIG_M:
    "bigM",

  BLAND:
    "bland",

  REVISED:
    "revised"
};

export const VARIABLE_SIGNS = {

  NON_NEGATIVE:
    "nneg",

  NON_POSITIVE:
    "npos",

  FREE:
    "free"
};

export const CONSTRAINT_SIGNS = {

  LESS_EQUAL:
    "<=",

  GREATER_EQUAL:
    ">=",

  EQUAL:
    "="
};
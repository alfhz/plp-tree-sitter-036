// BASIC GRAMMAR
// export default grammar({
//   name: "filter",
//   extras: ($) => [/\s/],
//   rules: {
//     query: ($) => $.comparison,
//     comparison: ($) => seq($.identifier, "=", $.string),
//     identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
//     string: ($) => /"[^"]*"/,
//   },
// });

// 4A
// export default grammar({
//   name: "filter",
//   extras: ($) => [/\s/],
//   rules: {
//     query: ($) => $.comparison,
//     comparison: ($) =>
//       seq($.identifier, choice("=", "!=", ">", "<", ">=", "<="), $._value),
//     _value: ($) => choice($.string, $.number),
//     identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
//     string: ($) => /"[^"]*"/,
//     number: ($) => /\d+(\.\d+)?/,
//   },
// });

// 4B
// export default grammar({
//   name: "filter",
//   extras: ($) => [/\s/],
//   word: ($) => $.identifier,
//   rules: {
//     query: ($) => $._expr,
//     _expr: ($) => choice($.comparison, $.and_expression),
//     comparison: ($) =>
//       seq($.identifier, choice("=", "!=", ">", "<", ">=", "<="), $._value),
//     and_expression: ($) => prec.left(2, seq($._expr, "and", $._expr)),
//     _value: ($) => choice($.string, $.number),
//     identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
//     string: ($) => /"[^"]*"/,
//     number: ($) => /\d+(\.\d+)?/,
//   },
// });

// 4C
export default grammar({
  name: "filter",
  extras: ($) => [/\s/],
  word: ($) => $.identifier,
  rules: {
    query: ($) => $._expr,
    _expr: ($) => choice($.comparison, $.and_expression, $.or_expression),
    comparison: ($) =>
      seq($.identifier, choice("=", "!=", ">", "<", ">=", "<="), $._value),
    and_expression: ($) => prec.left(2, seq($._expr, "and", $._expr)),
    or_expression: ($) => prec.left(1, seq($._expr, "or", $._expr)),
    _value: ($) => choice($.string, $.number),
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
    string: ($) => /"[^"]*"/,
    number: ($) => /\d+(\.\d+)?/,
  },
});
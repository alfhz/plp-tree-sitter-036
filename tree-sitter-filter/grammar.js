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
// export default grammar({
//   name: "filter",
//   extras: ($) => [/\s/],
//   word: ($) => $.identifier,
//   rules: {
//     query: ($) => $._expr,
//     _expr: ($) => choice($.comparison, $.and_expression, $.or_expression),
//     comparison: ($) =>
//       seq($.identifier, choice("=", "!=", ">", "<", ">=", "<="), $._value),
//     and_expression: ($) => prec.left(2, seq($._expr, "and", $._expr)),
//     or_expression: ($) => prec.left(1, seq($._expr, "or", $._expr)),
//     _value: ($) => choice($.string, $.number),
//     identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
//     string: ($) => /"[^"]*"/,
//     number: ($) => /\d+(\.\d+)?/,
//   },
// });

// 4D
// export default grammar({
//   name: "filter",
//   extras: ($) => [/\s/],
//   word: ($) => $.identifier,
//   rules: {
//     query: ($) => $._expr,
//     _expr: ($) =>
//       choice($.comparison, $.and_expression, $.or_expression, $.parenthesized),
//     comparison: ($) =>
//       seq($.identifier, choice("=", "!=", ">", "<", ">=", "<="), $._value),
//     and_expression: ($) => prec.left(2, seq($._expr, "and", $._expr)),
//     or_expression: ($) => prec.left(1, seq($._expr, "or", $._expr)),
//     parenthesized: ($) => seq("(", $._expr, ")"),
//     _value: ($) => choice($.string, $.number),
//     identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
//     string: ($) => /"[^"]*"/,
//     number: ($) => /\d+(\.\d+)?/,
//   },
// });

// 4E
// export default grammar({
//   name: "filter",
//   extras: ($) => [/\s/],
//   word: ($) => $.identifier,
//   rules: {
//     query: ($) => $._expr,
//     _expr: ($) =>
//       choice(
//         $.comparison,
//         $.and_expression,
//         $.or_expression,
//         $.not_expression,
//         $.parenthesized,
//       ),
//     comparison: ($) =>
//       seq($.identifier, choice("=", "!=", ">", "<", ">=", "<="), $._value),
//     and_expression: ($) => prec.left(2, seq($._expr, "and", $._expr)),
//     or_expression: ($) => prec.left(1, seq($._expr, "or", $._expr)),
//     not_expression: ($) => prec(3, seq("not", $._expr)),
//     parenthesized: ($) => seq("(", $._expr, ")"),
//     _value: ($) => choice($.string, $.number, $.boolean),
//     identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_.]*/,
//     string: ($) => /"[^"]*"/,
//     number: ($) => /\d+(\.\d+)?/,
//     boolean: ($) => choice("true", "false"),
//   },
// });

// 4F
export default grammar({
  name: 'filter',
  extras: $ => [/\s/],
  word: $ => $.identifier,
  rules: {
    query: $ => $._expr,
    _expr: $ => choice(
      $.comparison, $.and_expression, $.or_expression,
      $.not_expression, $.parenthesized,
    ),
    comparison: $ => seq(
      field('field', $.identifier),
      field('operator', choice('=', '!=', '>', '<', '>=', '<=')),
      field('value', $._value),
    ),
    and_expression: $ => prec.left(2, seq(field('left', $._expr), 'and', field('right', $._expr))),
    or_expression: $ => prec.left(1, seq(field('left', $._expr), 'or', field('right', $._expr))),
    not_expression: $ => prec(3, seq('not', field('operand', $._expr))),
    parenthesized: $ => seq('(', $._expr, ')'),
    _value: $ => choice($.string, $.number, $.boolean),
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_.]*/,
    string: $ => /"[^"]*"/,
    number: $ => /\d+(\.\d+)?/,
    boolean: $ => choice('true', 'false'),
  }
});
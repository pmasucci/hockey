export function formatPercent(value) {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function sortFormattedNumber(a, b) {
  const aVal = parseFloat(a);
  const bVal = parseFloat(b);
  if (aVal === bVal) {
    return 0;
  }

  return aVal > bVal ? 1 : -1;
}

export const filter = {
  greaterThan: (filter, row) => {
    return parseFloat(row[filter.id]) >= parseFloat(filter.value);
  },
  contains: (filter, row) => {
    return row[filter.id].indexOf(filter.value) !== -1;
  }
};

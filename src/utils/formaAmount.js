export const formatAmount = (amount) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)} L`;
    } else {
      return amount?.toLocaleString('en-IN');
    }
  };
  
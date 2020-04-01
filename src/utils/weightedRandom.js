export const getWeightedRandomItem = function(arr, chance) {
  for (let item of arr) {
    if (Math.random() < chance) {
      return item;
    }
  }
  return arr[arr.length - 1];
};

export function updateProperty(state, { property, value }) {
  state[property] = value;
}

export function updateRates(state, { newRates }) {
  state.rates = Object.assign({}, state.rates, newRates);
}

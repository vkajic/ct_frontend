import Vue from 'vue';

function setProp(obj, props, value) {
  const prop = props.shift();
  if (!obj[prop]) {
    Vue.set(obj, prop, {});
  }
  if (!props.length) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      obj[prop] = { ...obj[prop], ...value };
    } else {
      obj[prop] = value;
    }
    return;
  }
  setProp(obj[prop], props, value);
}

export default setProp;

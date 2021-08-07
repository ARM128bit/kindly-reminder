export function IsEmptyReminder(reminder) {
  let _props = ["note", "date"];
  let isEmpty = false;
  for (let i = 0; i < _props.length; i++) {
    isEmpty = reminder[_props[i]] == "";
    if (isEmpty) {
      break;
    }
  }
  return isEmpty;
}

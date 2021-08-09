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

export function startTimer(context, payload) {
  const finishTime = new Date(payload.date);
  const dataNow = new Date();
  const diffTime = new Date(finishTime - dataNow).getTime();
  if (diffTime < 0) {
    return;
  }
  const finishSeconds = diffTime / 1000;
  const hours = parseInt(finishSeconds / 3600) % 24;
  const minutes = parseInt(finishSeconds / 60) % 60;
  const seconds = parseInt(finishSeconds) % 60;
  clearTimeout(payload.timerID);
  if (hours == 0 && minutes == 1 && seconds == 0) {
    context.$store.commit("PUSH_NOTIFICATION", payload.note);
    payload.timerID = setTimeout(() => {
      startTimer(context, payload);
    }, 1000);
  } else if (hours == 0 && minutes == 0 && seconds == 0) {
    context.$store.commit("PUSH_ERROR", payload.note);
  } else {
    payload.timerID = setTimeout(() => {
      startTimer(context, payload);
    }, 1000);
  }
}

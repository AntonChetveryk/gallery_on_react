export const getData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.status < 400) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => resolve(res))
      .catch((res) => {
        return res.json().then(() => reject("Error try again later"));
      });
  });
};

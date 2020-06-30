import fetch from 'node-fetch';

export const getRemoteData = async () => {
  try {
    return await (
      await fetch('https://jsonplaceholder.typicode.com/users')
    ).json();
  } catch (error) {
    throw new Error(error);
  }
};

export const testApi2 = {
  async test() {
    try {
      await getRemoteData().then((result) => {
        result.forEach((element) => {
          console.log(element.name, 'lives in', element.address.city);
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};

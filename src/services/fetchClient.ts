const BASE_URL = 'http://localhost:3000';

const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors' as RequestMode,
};

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users/`, fetchOptions);
  const users = await response.json();
  return users;
}

export const getUserById = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, fetchOptions);
  const user = await response.json();
  return user;
}

export const getAllTestsForUser = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/tests`, fetchOptions);
  const tests = await response.json();
  return tests;
}

export const startNewTest = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/tests`, { ...fetchOptions, method: 'POST' });
  const test = await response.json();
  return test;
}

export const finishTest = async (userId: number, testId: number, answer: string) => {
  if (!answer) {
    console.log(JSON.stringify({ answer }));
    console.log('answer is bad')
    return;
  }

  const response = await fetch(`${BASE_URL}/users/${userId}/tests/${testId}`, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer }),
  });

  const result = await response.json();
  if (result === 'Test passed!') {
    return { statusCode: 200 };
  } else {
    return { statusCode: 400 };
  }
};

export const continueTest = async (userId: number, testId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/tests/${testId}`, fetchOptions);
  const test = await response.json();
  return test;
}

export const createNewUser = async (name: string, user_name: string, password_hash: string) => {
  const response = await fetch(`${BASE_URL}/users/sign-up`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({ name, user_name, hash: password_hash }),
  });

  const user = await response.json();
  return user;
};

export const verifyUser = async (name: string, user_name: string, password_hash: string) => {
  const response = await fetch(`${BASE_URL}/users/sign-in`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({ name, user_name, hash: password_hash }),
  });

  const user = await response.json();

  if (!user) {
    console.log('NO SUCH USER');
    return false;
  }

  return user;
};

